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
    prices: Price;
    brand: string;
};

export type ProductsData = {
    products: Product[];
};