import type Attribute from "./Attribute"

export type CartItems = {
    name: string;
    price: number;
    currency: string;
    attributes: Attribute[];
    selectedAttributes: object;
    quantity: number;
}