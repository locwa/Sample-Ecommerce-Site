<?php

namespace App\Types\AttributeType;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ItemType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'items',
            'fields' => [
                'displayValue' => Type::string(),
                'value' => Type::string(),
                'id' => Type::string(),
            ]
        ]);
    }
}