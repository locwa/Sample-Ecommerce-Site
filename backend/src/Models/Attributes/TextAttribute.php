<?php

namespace App\Models\Attributes;

use App\Database\Database;
use App\Utils\RedisClient;
use PDO;

/**
 * Contains methods for products with the text attribute.
 */
class TextAttribute extends AbstractAttributes
{
    /**
     * Gets the Product attribute based on id and with the type "text"
     *
     * @param string|null $id
     * @return array
     */
    public function getProductAttribute(string $id = null) : array
    {
        $db = new Database();
        $query = "SELECT * FROM attributes WHERE id = ? AND types = 'text'";
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

    /**
     * Gets the items of an attribute based on the id of the row in the database
     *
     * @param int $attributeId The id of the row in the database
     * @return array The Attribute Items
     */
    public function getAttributeItems(int $attributeId) : array
    {
        $redis = null;
        // Cache Key of attributes in Upstash Redis
        $cacheKey = 'attribute:items:' . $attributeId;

        // Tries to get cached data from Upstash Redis
        try {
            $redis = RedisClient::get();
            $cached = $redis->get($cacheKey);
            if ($cached) {
                return json_decode($cached, true);
            }
        } catch (\Throwable $e) {
            error_log('Redis error in getAttributeItems: ' . $e->getMessage());
        }

        // Fetches data from the database if there is no cached data
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

        // Tries to cache data in Upstash Redis
        try {
            $redis->set($cacheKey, json_encode($resultArray));
        } catch (\Throwable $e) {
            error_log('Redis set error in getAttributeItems: ' . $e->getMessage());
        }

        return $resultArray;
    }
}