<?php

namespace App\Types\CategoryType;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CategoryType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'category',
            'fields' => [
                'name' => Type::string()
            ]
        ]);
    }
}