<?php

namespace App\Models;


use PDO;
use Dotenv\Dotenv;

class Database{
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

class ProductsModel extends Database{
    public function getItems(){
        $stmt = $this->connect()->prepare("SELECT * FROM products");
        $stmt->execute();
        return $stmt->fetchAll();
    }

}