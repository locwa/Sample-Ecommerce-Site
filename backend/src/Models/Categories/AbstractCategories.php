<?php

namespace App\Models\Categories;

/**
 * Abstract class to be used in classes in the Categories model
 */
abstract class AbstractCategories{
    abstract function getCategory(string $category);
    abstract function getAllCategories() : array;
}