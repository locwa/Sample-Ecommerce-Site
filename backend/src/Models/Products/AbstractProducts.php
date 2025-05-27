<?php

namespace App\Models\Products;


abstract class AbstractProducts{
    abstract function getProductDetails(string $id = null) : array;
    abstract function getProductPrice(int $index) : array;
    abstract function getProductCurrency(int $id) : array;
    abstract static function getProductGallery(string $id) : array;
}