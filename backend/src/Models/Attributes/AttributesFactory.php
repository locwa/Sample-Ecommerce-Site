<?php

namespace App\Models\Attributes;

use App\Database\Database;
use App\Utils\RedisClient;
use InvalidArgumentException;
use PDO;

/**
 * A class that contains methods responsible for fetching product attributes
 *
 * The AttributesFactory class is responsible for fetching the attribute id, name, and type. It's also responsible for
 * fetching the correct class for each attribute.
 */
class AttributesFactory
{
    /**
     * Gets the attribute id, name, and the type of product.
     *
     * @param string $id The id of the product.
     * @return array|mixed returns an array containing the attribute id, name, type, and the id of the row in the database.
     */
    public function getAttributes(string $id)
    {
        $redis = null;
        // Cache Key of attributes in Upstash Redis
        $cacheKey = 'product:attributes:' . $id;

        // Tries to get cached data from Upstash Redis
        try {
            $redis = RedisClient::get();
            $cached = $redis->get($cacheKey);
            if ($cached) {
                return json_decode($cached, true);
            }
        } catch (\Throwable $e) {
            error_log('Redis error in getAttributes: ' . $e->getMessage());
        }

        // Fetches data from the database if there is no cached data
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

        // Tries to cache data in Upstash Redis
        try {
            $redis->set($cacheKey, json_encode($resultArray));
        } catch (\Throwable $e) {
            error_log('Redis set error in getAttributes: ' . $e->getMessage());
        }

        return $resultArray;
    }

    /**
     * Returns the proper class based on the type proviced (e.g., "text" type returns the TextAttribute)
     *
     * @param string $type The type of attribute (e.g., swatch)
     * @return SwatchAttribute|TextAttribute The class returned based on the type param
     */
    public function getAttributeSubClass(string $type)
    {
        return match ($type){
            'swatch' => new SwatchAttribute(),
            'text' => new TextAttribute(),
            default => throw new InvalidArgumentException("Unknown product attribute")
        };
    }

}