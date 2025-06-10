<?php

namespace App\Types\OrderType;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class InputOrderType extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'InputOrderList',
            'fields' => [
                'id' => Type::nonNull(Type::string()),
                'quantity' => Type::nonNull(Type::int()),
                'selectedAttributes' => Type::listOf(new InputSelectedAttributes()),
            ]
        ]);
    }
}