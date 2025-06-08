<?php

namespace App\Types\OrderType;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class InputSelectedAttributes extends InputObjectType
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