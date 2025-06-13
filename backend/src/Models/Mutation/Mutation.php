<?php

namespace App\Models\Mutation;

use App\Database\Database;
use PDO;

class Mutation
{
    public function getItems(array $order){
        $db = new Database();
        $db->beginTransaction();
        try{
            $orderListStmt = $db->prepare("INSERT INTO order_list (date) VALUES (CURRENT_TIMESTAMP)");
            $orderListStmt->execute();
            $orderId = $db->lastInsertId();
            $result = [];

            $query = "INSERT INTO order_list_items (order_list_id, product_id, quantity, selected_category_name, selected_category_value, cart_item_id) 
                          VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $db->prepare($query);

            foreach ($order as $itemIndex => $item) {
                $productId = $item['id'];
                $quantity = $item['quantity'];
                $selectedAttributes = $item['selectedAttributes'];

                if (count($selectedAttributes) > 0) {
                    foreach ($selectedAttributes as $attr) {
                        $stmt->execute([$orderId, $productId, $quantity, $attr['categoryName'], $attr['categoryValue'], $itemIndex]);
                    }
                } else {
                    $stmt->execute([$orderId, $productId, $quantity, " ", " ", $itemIndex]);
                }

                $result[] = [
                    'id' => $productId,
                    'quantity' => $quantity,
                    'selectedAttributes' => $selectedAttributes,
                ];
            }

            $db->commit();

            return $result;
        } catch(\Throwable $e){
            $db->rollBack();
            error_log('Order mutation error: ' . $e->getMessage());
            throw $e;
        }

    }
}