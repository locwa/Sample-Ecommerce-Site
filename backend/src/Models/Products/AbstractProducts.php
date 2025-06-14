<?php

namespace App\Models\Products;

/**
 * Abstract classes for Products
 */
abstract class AbstractProducts{
    /**
     * Gets all products and their details in the database.
     *
     * This method gets all products and the values of the columns id, name, inStock, description, category, and brand.
     *
     * @return array
     */
    abstract function getProductDetails(string $id = null) : array;
    /**
     * Gets the product price
     *
     * This method gets the price of the product
     *
     * @param int $index
     * @return array
     */
    abstract function getProductPrice(string $id) : array;
    /**
     * Gets the product currency type
     *
     * This method gets the currency type of the product
     *
     * @param int $id
     * @return array
     */
    abstract function getProductCurrency(int $id) : array;
    /**
     * Gets the gallery of the product
     *
     * This method gets the gallery of photos and their respective link
     *
     * @param string $id
     * @return array
     */
    abstract static function getProductGallery(array $productIds) : array;
}