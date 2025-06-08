<?php

namespace App\Controller;

use App\Models\Categories\Categories;
use App\Models\Products\AllProducts;
use App\Models\Products\ClothesProducts;
use App\Models\Products\TechProducts;
use App\Types\CategoryType\CategoryType;
use App\Types\OrderType\InputOrderType;
use App\Types\OrderType\OrderType;
use App\Types\ProductType\ProductType;
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

            $productType = new ProductType();
            $categoryType = new CategoryType();
            $orderType = new OrderType();

            $queryType = new ObjectType([
                'name' => 'Query',
                'fields' => [
                    'categories' => [
                        'type' => Type::listOf($categoryType),
                        'args' => [
                            'category' => Type::string()
                        ],
                        'resolve' => function($root, $args) {
                            $categoryModel = new Categories();
                            if (isset($args['name'])) {
                                return $categoryModel->getCategory($args['name']);
                            } else {
                                return $categoryModel->getAllCategories();
                            }
                        }
                    ],
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
                    'createOrder' => [
                        'type' => Type::listOf($orderType),
                        'args' => [
                            'order' => Type::nonNull(Type::listOf(new InputOrderType()))
                        ],
                        'resolve' => function ($root, $args) {

                            return $args['order'];
                        }
                    ]
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
