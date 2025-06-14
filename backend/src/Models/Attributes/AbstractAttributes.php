<?php

namespace App\Models\Attributes;

/**
 * Abstract class for every class related to the product's attributes
 */

abstract class AbstractAttributes
{
    /**
     * Gets the Product attribute based on id and with the specified type
     *
     * @param string|null $id
     * @return array
     */
    abstract public function getProductAttribute(string $id = null) : array;
    /**
     * Gets the items of an attribute based on the id of the row in the database
     *
     * @param int $attributeId The id of the row in the database
     * @return array The Attribute Items
     */
    abstract public function getAttributeItems(int $attributeId) : array ;
}