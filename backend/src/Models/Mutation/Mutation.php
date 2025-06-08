<?php

namespace App\Models\Mutation;

use App\Database\Database;
use PDO;

class Mutation
{
    public function __construct(array $order){
        $db = new Database();
        $orderListStmt = $db->prepare("INSERT INTO order_list (date) VALUES (CURRENT_TIMESTAMP)");
        $orderListStmt->execute();
        $orderId = $db->lastInsertId();

        foreach ($order as $item) {
            $productId = $item['id'];
            $quantity = $item['quantity'];
            $selectedAttributes = $item['selectedAttributes']; // This is an associative array like ['Size' => '40']

            // Loop over each selected attribute
            foreach ($selectedAttributes as $categoryName => $categoryValue) {
                $query = "INSERT INTO order_list_items (order_list_id, product_id, quantity, selected_category_name, selected_category_value) 
                          VALUES (?, ?, ?, ?, ?)";
                $stmt = $db->prepare($query);
                $stmt->execute([$orderId, $productId, $quantity, $categoryName, $categoryValue]);
            }
        }

    }
}