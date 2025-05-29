<?php

namespace App\Types\ProductType;

use App\Models\Products\AllProducts;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

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
                'prices' => [
                    'type' => new PricesType(),
                    'resolve' => function($price) {
                        $products = new AllProducts();
                        return $products->getProductPrice($price['index']);
                    }
                ],
                'brand'=> Type::string(),
            ]
        ]);
    }
}