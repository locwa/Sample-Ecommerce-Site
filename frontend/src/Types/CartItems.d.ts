import type Attribute from "./Attribute"

export type CartItems = {
    name: string;
    price: number;
    currency: string;
    productAttributes: Attribute[];
    selectedAttributes: object;
    quantity: number;
    photo: string;
}