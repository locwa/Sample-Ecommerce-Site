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
     * Gets all products in the database
     *
     * @return mixed
     */
    public function getProducts(){
        //
        $db = new Database();
        $stmt = $db->prepare("SELECT * FROM products");
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);

        $resultArray = [];

        foreach($res as $product){
            $arrayToPush = [
                'id' => $product->id,
                'name' => $product->name,
                'inStock' => $product->inStock,
                'description' => $product->description,
                'category' => $product->category,
                'brand' => $product->brand,
            ];
            $resultArray[] = $arrayToPush;
        }
        return $resultArray;
    }
}
