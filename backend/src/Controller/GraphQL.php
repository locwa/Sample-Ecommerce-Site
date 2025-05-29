<?php

namespace App\Controller;

use App\Models\Products\AllProducts;
use App\Models\Products\ClothesProducts;
use App\Models\Products\TechProducts;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use RuntimeException;
use Throwable;

class GraphQL {
    static public function handle() {
        try {

            $currencyType = new ObjectType([
                'name' => 'Currency',
                'fields' => [
                    'label' => Type::string(),
                    'symbol' => Type::string()
                ]
            ]);

            $pricesType = new ObjectType([
                'name' => 'prices',
                'fields' => [
                    'amount' => Type::float(),
                    'currency' => [
                        'type' => $currencyType,
                        'resolve' => function($currency) {
                            $products = new AllProducts();
                            return $products->getProductCurrency($currency['currency_id']);
                        }
                    ],
                ]
            ]);

            $productType = new ObjectType([
                'name' => 'ProductList',
                'fields' => [
                    'id'=> Type::nonNull(Type::string()),
                    'name'=> Type::string(),
                    'inStock'=> Type::boolean(),
                    'gallery' => Type::listOf(Type::string()),
                    'description'=> Type::string(),
                    'category'=> Type::string(),
                    'prices' => [
                        'type' => $pricesType,
                        'resolve' => function($price) {
                            $products = new AllProducts();
                            return $products->getProductPrice($price['index']);
                        }
                    ],
                    'brand'=> Type::string(),
                ]

            ]);

            $queryType = new ObjectType([
                'name' => 'Query',
                'fields' => [
                    'products' => [
                        'type' => Type::listOf($productType),
                        'args' => [
                            'category'=> Type::string(),
                            'id' => Type::string()
                        ],
                        'resolve' => function ($root, $args){
                            $products = match ($args['category']) {
                                'clothes' => (new ClothesProducts())->getProductDetails($args['id']),
                                'tech' => (new TechProducts())->getProductDetails($args['id']),
                                default => (new AllProducts())->getProductDetails($args['id'])
                            };
                            return $products;
                        },
                    ],
                ],
            ]);

            $mutationType = new ObjectType([
                'name' => 'Mutation',
                'fields' => [
                    'sum' => [
                        'type' => Type::int(),
                        'args' => [
                            'x' => ['type' => Type::int()],
                            'y' => ['type' => Type::int()],
                        ],
                        'resolve' => static fn ($calc, array $args): int => $args['x'] + $args['y'],
                    ],
                ],
            ]);
        
            // See docs on schema options:
            // https://webonyx.github.io/graphql-php/schema-definition/#configuration-options
            $schema = new Schema(
                (new SchemaConfig())
                ->setQuery($queryType)
                ->setTypes([$productType])
                ->setMutation($mutationType)
            );
        
            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }
        
            $input = json_decode($rawInput, true);
            $query = $input['query'];
            $variableValues = $input['variables'] ?? null;
        
            $rootValue = ['prefix' => 'You said: '];
            $result = GraphQLBase::executeQuery($schema, $query, $rootValue, null, $variableValues);
            $output = $result->toArray();
        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }
}
