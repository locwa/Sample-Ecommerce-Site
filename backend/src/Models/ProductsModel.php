<?php

namespace App\Models;


use PDO;
use Dotenv\Dotenv;


/**
 * A class for connecting to the database
 *
 * The Database class contains the connect() method, which is the method to connect to the database
 */
class Database extends PDO {
    /**
     * A method to connect to the database
     *
     * This method connects to the database, and provides PDO methods that can be used to do SQL queries
     */
    public final function __construct(){
        $dotenv = Dotenv::createImmutable(__DIR__, '/../../.env');
        $dotenv->safeLoad();

        $user = $_ENV['DB_USER'];
        $pwd = $_ENV['DB_PASSWORD'];
        $host = $_ENV['DB_HOST'];
        $dbname = $_ENV['DB_NAME'];

        $dsn = "mysql:host=". $host .";dbname=". $dbname;

        // connection to database
        try{
            parent::__construct($dsn, $user, $pwd);
            $this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch (PDOException $e){
            echo "connection failed:". $e->getMessage();
        }
    }
}

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
