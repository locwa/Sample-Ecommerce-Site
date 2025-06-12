<?php

namespace App\Models\Products;

use App\Database\Database;
use App\Utils\RedisClient;
use PDO;

class TechProducts extends AbstractProducts
{
    /**
     * Gets all products and their details in the database.
     *
     * This method gets all products and the values of the columns id, name, inStock, description, category, and brand.
     *
     * @return array
     */
    public function getProductDetails(string $id = null) : array{
        $redis = null;
        $cacheKey = 'product:all:' . ($id ?? 'all') . ("tech" ? ":tech" : '');
        try {
            $redis = RedisClient::get();
            $cached = $redis->get($cacheKey);
            if ($cached) {
                return json_decode($cached, true);
            }
        } catch (\Throwable $e) {
            error_log('Redis error: ' . $e->getMessage());
        }

        $db = new Database();
        $query = "SELECT id, name, inStock, description, brand FROM products WHERE category = 'tech'";
        if ($id !== null){
            $query .= " AND id = ?";
        }

        $stmt = $db->prepare($query);

        if ($id !== null){
            $stmt->execute([$id]);
        } else {
            $stmt->execute();
        }
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);

        $productIds = array_map(fn($p) => $p->id, $res);
        $galleries = $this->getProductGallery($productIds);


        $resultArray = [];

        foreach($res as $index=>$product){
            $arrayToPush = [
                'id' => $product->id,
                'name' => $product->name,
                'inStock' => $product->inStock,
                'gallery' => $galleries[$product->id] ?? [],
                'description' => $product->description,
                'brand' => $product->brand,
                'index' => $index,
            ];
            $resultArray[] = $arrayToPush;
        }

        try {
            $redis->set($cacheKey, json_encode($resultArray));
        } catch (\Throwable $e) {
            error_log('Redis set error: ' . $e->getMessage());
        }

        return $resultArray;
    }

    /**
     * Gets the product price
     *
     * This method gets the price of the product
     *
     * @return array
     */
    public function getProductPrice(string $id = null) : array{
        $redis = null;
        $cacheKey = 'product:all:' . ($id ?? 'all') . ("tech" ? ":tech" : '');
        try {
            $redis = RedisClient::get();
            $cached = $redis->get($cacheKey);
            if ($cached) {
                return json_decode($cached, true);
            }
        } catch (\Throwable $e) {
            error_log('Redis error: ' . $e->getMessage());
        }

        $db = new Database();
        $stmt = $db->prepare("SELECT price FROM products WHERE category = 'tech' AND id = ?");
        $stmt->execute([$id]);
        $res = $stmt->fetch(PDO::FETCH_OBJ);

        $resultArray = [
            'amount' => $res->price,
            'currency_id' => $res->currency_id,
        ];

        try {
            $redis->set($cacheKey, json_encode($resultArray));
        } catch (\Throwable $e) {
            error_log('Redis set error: ' . $e->getMessage());
        };

        return $resultArray;;
    }

    /**
     * Gets the product currency type
     *
     * This method gets the currency type of the product
     *
     * @return array
     */

    public function getProductCurrency(int $id) : array
    {
        $redis = null;
        $cacheKey = 'product:all:' . ($id ?? 'all') . ("tech" ? ":tech" : '');
        try {
            $redis = RedisClient::get();
            $cached = $redis->get($cacheKey);
            if ($cached) {
                return json_decode($cached, true);
            }
        } catch (\Throwable $e) {
            error_log('Redis error: ' . $e->getMessage());
        }

        $db = new Database();
        $stmt = $db->prepare("SELECT label, symbol FROM currency WHERE id = ? AND category = 'tech'");
        $stmt->execute([$id]);
        $res = $stmt->fetch(PDO::FETCH_OBJ);

        $resultArray = [
            'label' => $res->label,
            'symbol' => $res->symbol
        ];

        try {
            $redis->set($cacheKey, json_encode($resultArray));
        } catch (\Throwable $e) {
            error_log('Redis set error: ' . $e->getMessage());
        };

        return $resultArray;
    }

    /**
     * Gets the gallery of the product
     *
     * This method gets the gallery of photos and their respective link
     *
     * @return array
     */

    public static function getProductGallery(array $productIds) : array{
        if (empty($productIds)) {
            return [];
        }

        $redis = null;
        sort($productIds);
        $cacheKey = 'product:gallery:' . implode(',', $productIds) . ("tech" ? ":tech" : '');
        try {
            $redis = RedisClient::get();
            $cached = $redis->get($cacheKey);
            if ($cached) {
                return json_decode($cached, true);
            }
        } catch (\Throwable $e) {
            error_log('Redis error: ' . $e->getMessage());
        }

        $db = new Database();
        $inQuery = implode(',', array_fill(0, count($productIds), '?'));

        $stmt = $db->prepare("SELECT product_id, link FROM gallery WHERE product_id IN ($inQuery)");
        $stmt->execute($productIds);

        $galleryData = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $grouped = [];
        foreach ($galleryData as $row) {
            $grouped[$row['product_id']][] = $row['link'];
        }

        try {
            $redis->set($cacheKey, json_encode($grouped));
        } catch (\Throwable $e) {
            error_log("Redis set error in getProductGallery: " . $e->getMessage());
        }

        return $grouped;
    }
}