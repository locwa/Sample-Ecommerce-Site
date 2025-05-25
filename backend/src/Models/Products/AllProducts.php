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
        $stmt = $db->prepare("SELECT price FROM products");
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);

        return ['amount' => $res[$index]->price];
    }
}