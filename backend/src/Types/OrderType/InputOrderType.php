<?php

namespace App\Types\OrderType;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class InputOrderType extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'orderList',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'price' => Type::float(),
                'currency' => Type::string(),
                'quantity' => Type::int(),
                'selectedAttributes' => [
                    'type' => Type::listOf(new InputSelectedAttributes()),
                    'resolve' => function ($attributes) {

                    }
                ],
            ]
        ]);
    }
}