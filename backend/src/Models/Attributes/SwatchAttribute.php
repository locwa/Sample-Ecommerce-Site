<?php

namespace App\Models\Attributes;

use App\Database\Database;
use App\Models\Attributes\AbstractAttributes;
use App\Utils\RedisClient;
use PDO;

/**
 * Contains methods for products with the swatch attribute.
 */
class SwatchAttribute extends AbstractAttributes
{
    public function getProductAttribute(string $id = null) : array{
        //
        $db = new Database();
        $query = "SELECT * FROM attributes WHERE id = ? AND types = 'swatch'";
        $stmt = $db->prepare($query);
        $stmt->execute([$id]);
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);

        $resultArray = [];

        foreach($res as $attribute){
            $arrayToPush = [
                'id' => $attribute->attribute_type,
                'name' => $attribute->name,
                'type' => $attribute->types,
                'attribute_id' => $attribute->id,
            ];
            $resultArray[] = $arrayToPush;
        }
        return $resultArray;
    }

    public function getAttributeItems(int $attributeId) : array {
        $redis = null;
        $cacheKey = 'attribute:items:' . $attributeId;

        try {
            $redis = RedisClient::get();
            $cached = $redis->get($cacheKey);
            if ($cached) {
                return json_decode($cached, true);
            }
        } catch (\Throwable $e) {
            error_log('Redis error in getAttributeItems: ' . $e->getMessage());
        }

        $db = new Database();
        $query = "SELECT * FROM attribute_values WHERE attribute_id = ?";
        $stmt = $db->prepare($query);
        $stmt->execute([$attributeId]);
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);

        $resultArray = [];

        foreach($res as $attribute){
            $arrayToPush = [
                'displayValue' => $attribute->display_value,
                'value' => $attribute->value,
                'id' => $attribute->attribute_value_id,
            ];
            $resultArray[] = $arrayToPush;
        }

        try {
            $redis->set($cacheKey, json_encode($resultArray));
        } catch (\Throwable $e) {
            error_log('Redis set error in getAttributeItems: ' . $e->getMessage());
        }

        return $resultArray;
    }
}