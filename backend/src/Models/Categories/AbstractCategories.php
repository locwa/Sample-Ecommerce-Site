<?php

namespace App\Models\Categories;

abstract class AbstractCategories{
    abstract function getCategory($category);
    abstract function getAllCategories() : array;
}