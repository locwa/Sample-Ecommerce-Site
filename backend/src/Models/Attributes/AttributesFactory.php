<?php

namespace App\Models\Attributes;

use App\Database\Database;
use InvalidArgumentException;
use PDO;

class AttributesFactory
{
    public function getAttributes($id)
    {
        $redis = null;
        $cacheKey = 'product:attributes:' . $id;

        try {
            $redis = RedisClient::get();
            $cached = $redis->get($cacheKey);
            if ($cached) {
                return json_decode($cached, true);
            }
        } catch (\Throwable $e) {
            error_log('Redis error in getAttributes: ' . $e->getMessage());
        }


        $db = new Database();
        $stmt = $db->prepare("SELECT * FROM attributes WHERE product_id = ?");
        $stmt->execute([$id]);
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);

        $resultArray = [];

        foreach($res as $product){
            $arrayToPush = [
                'id' => $product->attribute_type,
                'name' => $product->name,
                'type' => $product->types,
                'attribute_id' => $product->id,
            ];
            $resultArray[] = $arrayToPush;
        }

        try {
            $redis->set($cacheKey, json_encode($resultArray));
        } catch (\Throwable $e) {
            error_log('Redis set error in getAttributes: ' . $e->getMessage());
        }

        return $resultArray;
    }
    public function getAttributeSubClass($type){
        return match ($type){
            'swatch' => new SwatchAttribute(),
            'text' => new TextAttribute(),
            default => throw new InvalidArgumentException("Unknown product attribute")
        };
    }

}