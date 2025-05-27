type Currency = {
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
    prices: Price;
};

export type ProductsData = {
    products: Product[];
};