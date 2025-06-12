<?php

namespace App\Models\Products;

use App\Database\Database;
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
        //
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
        return $resultArray;
    }

    /**
     * Gets the product price
     *
     * This method gets the price of the product
     *
     * @return array
     */
    public function getProductPrice(int $index, string $id) : array{
        $db = new Database();
        $stmt = $db->prepare("SELECT price FROM products WHERE category = 'tech' AND id = ?");
        $stmt->execute([$id]);
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);

        return ['amount' => $res[$index]->price];
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
        $db = new Database();
        $stmt = $db->prepare("SELECT label, symbol FROM currency WHERE id = ? AND category = 'tech'");
        $stmt->execute([$id]);
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);

        return [
            'label' => $res[0]->label,
            'symbol' => $res[0]->symbol
        ];
    }

    /**
     * Gets the gallery of the product
     *
     * This method gets the gallery of photos and their respective link
     *
     * @return array
     */

    public static function getProductGallery(string $id) : array{
        if (empty($productIds)) {
            return [];
        }

        $db = new Database();
        $inQuery = implode(',', array_fill(0, count($productIds), '?'));

        $stmt = $db->prepare("SELECT product_id, image_url FROM product_gallery WHERE product_id IN ($inQuery)");
        $stmt->execute($productIds);

        $galleryData = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $grouped = [];
        foreach ($galleryData as $row) {
            $grouped[$row['product_id']][] = $row['image_url'];
        }

        return $grouped;
    }
}