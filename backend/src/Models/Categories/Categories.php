<?php

namespace App\Models\Categories;

use App\Database\Database;
use PDO;

class Categories extends AbstractCategories
{
    public function getCategory($category){
        //
        $db = new Database();
        $stmt = $db->prepare("SELECT * FROM categories WHERE name = ?");
        $stmt->execute([$category]);
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);

        $resultArray = [];

        foreach ($res as $category) {
            $arrayToPush = [
                'name' => $category->name,
            ];
            $resultArray[] = $arrayToPush;
        }
        return $resultArray;
    }
    public function getAllCategories(): array
    {
        //
        $db = new Database();
        $stmt = $db->prepare("SELECT * FROM categories");
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);

        $resultArray = [];

        foreach ($res as $category) {
            $arrayToPush = [
                'name' => $category->name,
            ];
            $resultArray[] = $arrayToPush;
        }
        return $resultArray;
    }
}