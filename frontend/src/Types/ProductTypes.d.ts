import type Attribute from "./Attribute"

type Currency = {
    label: string;
    symbol: string;
}

export type Price = {
    amount: number;
    currency: Currency;
}

type Product = {
    id: string;
    name: string;
    inStock: boolean;
    gallery: string[];
    description: string;
    category: string;
    attributes: Attribute[];
    prices: Price;
    brand: string;
};

export type ProductsData = {
    products: Product[];
};