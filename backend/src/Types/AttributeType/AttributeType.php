<?php

namespace App\Types\AttributeType;

use App\Models\Attributes\AttributesFactory;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeType extends ObjectType
{
    public function __construct(){
        parent::__construct([
            'name' => 'attributes',
            'fields' => [
                'id' => Type::string(),
                'items' => [
                    'type' => Type::listOf(new ItemType()),
                    'resolve' => function ($items) {
                        $attributes = (new AttributesFactory())->getAttributeSubClass($items['type']);
                        return $attributes->getAttributeItems($items['attribute_id']);
                    }
                ],
                'name' => Type::string(),
                'type' => Type::string(),
                'attribute_id' => Type::int(),
                ]
        ]);
    }
}