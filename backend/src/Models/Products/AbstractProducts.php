<?php

namespace App\Models\Products;


abstract class AbstractProducts{
    abstract function getProductDetails() : array;
    abstract function getProductPrice(int $index) : array;
    abstract function getProductCurrency(int $id) : array;
}