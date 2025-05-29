<?php

namespace App\Models\Attributes;

use App\Database\Database;
use PDO;

class TextAttribute extends AbstractAttributes
{
    public function getProductAttribute(string $id = null) : array{
        //
        $db = new Database();
        $query = "SELECT * FROM attributes WHERE id = ? AND types = 'text'";
        $stmt = $db->prepare($query);
        $stmt->execute([$id]);
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);

        $resultArray = [];

        foreach($res as $attribute){
            $arrayToPush = [
                'id' => $attribute->attribute_type,
                'name' => $attribute->name,
                'type' => $attribute->types,
                'attribute_id' => $attribute->id,
            ];
            $resultArray[] = $arrayToPush;
        }
        return $resultArray;
    }

    public function getAttributeItems(int $attributeId) : array {
        $db = new Database();
        $query = "SELECT * FROM attribute_values WHERE attribute_id = ?";
        $stmt = $db->prepare($query);
        $stmt->execute([$attributeId]);
        $res = $stmt->fetchAll(PDO::FETCH_OBJ);

        $resultArray = [];

        foreach($res as $attribute){
            $arrayToPush = [
                'displayValue' => $attribute->display_value,
                'value' => $attribute->value,
                'id' => $attribute->attribute_value_id,
            ];
            $resultArray[] = $arrayToPush;
        }
        return $resultArray;
    }
}