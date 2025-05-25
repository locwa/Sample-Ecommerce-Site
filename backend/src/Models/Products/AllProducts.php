<?php

namespace App\Models\Products;

use App\Database\Database;
use PDO;

class AllProducts extends AbstractProducts
{
    /**
     * Gets all products and their details in the database.
     *
     * This method gets all products and the values of the columns id, name, inStock, description, category, and brand.
     *
     * @return array
     */
    public function getProductDetails() : array{
        //
        $db = new Database();
        $stmt = $db->prepare("SELECT * FROM products");
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);

        $resultArray = [];

        foreach($res as $index=>$product){
            $arrayToPush = [
                'id' => $product->id,
                'name' => $product->name,
                'inStock' => $product->inStock,
                'gallery' => self::getProductGallery($product->id),
                'description' => $product->description,
                'category' => $product->category,
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
    public function getProductPrice(int $index) : array{
        $db = new Database();
        $stmt = $db->prepare("SELECT price, currency_id FROM products");
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);

        return [
            'amount' => $res[$index]->price,
            'currency_id' => $res[$index]->currency_id,
        ];
    }

    /**
     * Gets the product currency type
     *
     * This method gets the currency type of the product
     *
     * @return array
     */

    public function getProductCurrency(int $id) : array{
        $db = new Database();
        $stmt = $db->prepare("SELECT * FROM currency WHERE id = ?");
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
        $db = new Database();
        $stmt = $db->prepare("SELECT link FROM gallery WHERE product_id = ?");
        $stmt->execute([$id]);
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);

        $resultArray = [];

        foreach($res as $gallery){
            array_push($resultArray, $gallery->link);
        }
        return $resultArray;
    }
}