<?php

namespace App\Models\Attributes;

abstract class AbstractAttributes
{
    abstract public function getProductAttribute(string $id = null) : array;
    abstract public function getAttributeItems(int $attributeId) : array ;
}