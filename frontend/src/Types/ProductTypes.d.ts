type Items = {
    displayValue: string;
    value: string;
    id: string;
}

type Attribute = {
    id: string;
    items: Items[];
    name: string;
    type: string;
}

type Currency = {
    label: string;
    symbol: string;
}

type Price = {
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