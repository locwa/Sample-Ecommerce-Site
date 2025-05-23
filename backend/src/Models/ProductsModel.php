<?php

namespace App\Models;


use PDO;
use Dotenv\Dotenv;


/**
 * A class for connecting to the database
 *
 * The Database class contains the connect() method, which is the method to connect to the database
 */
class Database{
    /**
     * A method to connect to the database
     *
     * This method connects to the database, and provides PDO methods that can be used to do SQL queries
     */
    protected function connect(){
        $dotenv = Dotenv::createImmutable(__DIR__);
        $dotenv->load();

        $user = $_ENV['DB_USER'];
        $pwd = $_ENV['DB_PASSWORD'];
        $host = $_ENV['DB_HOST'];
        $dbname = $_ENV['DB_NAME'];

        $dsn = "mysql:host=". $host .";dbname=". $dbname;


        // connection to database
        try{
            $conn = new PDO($dsn, $user, $pwd);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch (PDOException $e){
            echo "connection failed:". $e->getMessage();
       }
    }
}

/**
 * An abstract class for fetching items in the database
 *
 * This class has methods for getting all items, or items in a specific category
 */
abstract class ProductsModel extends Database{

    /**
     * Gets all products in the database
     *
     * @return mixed
     */
    public function getAllProducts(){
        $stmt = $this->connect()->prepare("SELECT * FROM products");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    /**
     * Gets specific products based on their category
     *
     * @return mixed
     */
    abstract public function getProducts();
}