<?php

namespace App\Models\Attributes;

use App\Database\Database;
use InvalidArgumentException;
use PDO;

class AttributesFactory
{
    public function getAttributes($id)
    {
        $db = new Database();
        $stmt = $db->prepare("SELECT * FROM attributes WHERE product_id = ?");
        $stmt->execute([$id]);
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);

        $resultArray = [];

        foreach($res as $product){
            $arrayToPush = [
                'id' => $product->attribute_type,
                'name' => $product->name,
                'type' => $product->types,
                'attribute_id' => $product->id,
            ];
            $resultArray[] = $arrayToPush;
        }

        return $resultArray;
    }
    public function getAttributeSubClass($type){
        return match ($type){
            'swatch' => new SwatchAttribute(),
            'text' => new TextAttribute(),
            default => throw new InvalidArgumentException("Unknown product attribute")
        };
    }

}