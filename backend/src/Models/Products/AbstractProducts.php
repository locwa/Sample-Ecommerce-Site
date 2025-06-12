<?php

namespace App\Models\Products;


abstract class AbstractProducts{
    abstract function getProductDetails(string $id = null) : array;
    abstract function getProductPrice(int $index, string $id) : array;
    abstract function getProductCurrency(int $id) : array;
    abstract static function getProductGallery(array $productIds) : array;
}