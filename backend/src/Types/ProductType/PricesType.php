<?php

namespace App\Types\ProductType;

use App\Models\Products\AllProducts;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class PricesType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
                'name' => 'prices',
                'fields' => [
                    'amount' => Type::float(),
                    'currency' => [
                        'type' => new CurrencyType(),
                        'resolve' => function($currency) {
                            $products = new AllProducts();
                            return $products->getProductCurrency($currency['currency_id']);
                        }
                    ],
                ]
        ]);
    }
}