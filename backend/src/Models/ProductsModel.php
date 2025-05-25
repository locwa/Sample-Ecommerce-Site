<?php

namespace App\Models;


use PDO;
use App\Database\Database;
/**
 * A class for fetching products in the database
 *
 * This class has methods for getting all products
 */
class ProductsModel{

    /**
     * Gets all products and their details in the database.
     *
     * This method gets all products and the values of the columns id, name, inStock, description, category, and brand.
     *
     * @return array
     */
    public function getProductDetails(){
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
    public function getProductPrice(int $index){
        $db = new Database();
        $stmt = $db->prepare("SELECT price FROM products");
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);

        return ['amount' => $res[$index]->price];
    }
}
