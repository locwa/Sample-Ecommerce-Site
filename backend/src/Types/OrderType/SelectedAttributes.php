<?php

namespace App\Types\OrderType;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class SelectedAttributes extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'selectedAttributes',
            'fields' => [
                'categoryName' => Type::string(),
                'categoryValue' => Type::string(),
            ]
        ]);
    }
}