<?php

namespace App\Models\Categories;

use App\Database\Database;
use PDO;

/**
 * Category class that contains classes to get a single category or all categories
 */
class Categories extends AbstractCategories
{
    /**
     * Gets category based on what is in the param
     *
     * @param string $category The category name
     * @return array The category name in array
     */
    public function getCategory(string $category)
    {
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

    /**
     * Returns all categories
     *
     * @return array
     */
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