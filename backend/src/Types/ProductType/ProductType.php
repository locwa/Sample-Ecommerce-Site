<?php

namespace App\Types\ProductType;

use App\Database\Database;
use App\Models\Attributes\AttributesFactory;
use App\Models\Products\AllProducts;
use App\Types\AttributeType\AttributeType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use PDO;

class ProductType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'ProductList',
            'fields' => [
                'id'=> Type::nonNull(Type::string()),
                'name'=> Type::string(),
                'inStock'=> Type::boolean(),
                'gallery' => Type::listOf(Type::string()),
                'description'=> Type::string(),
                'category'=> Type::string(),
                'attributes' => [
                    'type' => Type::listOf(new AttributeType()),
                    'resolve' => function ($attributes) {
                        $attributeValue = new AttributesFactory();
                        return $attributeValue->getAttributes($attributes['id']);
                    }
                ],
                'prices' => [
                    'type' => new PricesType(),
                    'resolve' => function($price) {
                        $products = new AllProducts();
                        return $products->getProductPrice($price['index'], $price['id']);
                    }
                ],
                'brand'=> Type::string(),
            ]
        ]);
    }
}