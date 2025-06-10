<?php

namespace App\Types\OrderType;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'orderList',
            'fields' => [
                'id' => Type::string(),
                'quantity' => Type::int(),
                'selectedAttributes' => [
                    'type' => Type::listOf(new SelectedAttributes()),
                    'resolve' => function ($attributes) {
                        return $attributes['selectedAttributes'];
                    }
                ],
            ]
        ]);
    }
}