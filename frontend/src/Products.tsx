import "./App.css"
import Navbar from "./Navbar.tsx"
import { useParams } from "react-router";
import {gql, useQuery} from "@apollo/client";

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

type ProductsData = {
    products: Product[];
};

function ProductCards(){

    const GET_PRODUCTS = gql`
        query GetProducts {
            products{
               id
               name
               inStock
               gallery
               prices{
                amount
                currency{
                    symbol
                }
               }
            }
        }
    `;

    const { data, error, loading } = useQuery<ProductsData>(GET_PRODUCTS);

    if (loading) return <p className="text-xl my-10">Loading...</p>;
    if (error) return <p>Oops. It seems there is an error loading all products</p>;

    return (
        <div className="flex flex-wrap gap-12">
            {data?.products.map(({ id, name, gallery, prices, inStock }) => (
                <section className="my-14" key={id}>
                    <div className="h-80 w-72 relative">
                        <img src={gallery[0]} alt="product image" className={inStock ? "h-80 w-72 object-cover" : "h-80 w-72 object-cover grayscale brightness-80"}/>
                        {!inStock && <p className="absolute top-40 text-center w-full h-full text-[#4f4f4f] text-lg">OUT OF STOCK</p>}
                    </div>
                    <h4 className="my-2 text-xl font-light">{name}</h4>
                    <p className='text-lg'>{ prices['currency']['symbol'] + prices['amount'] }</p>
                </section>
            ))}
        </div>
    );
}

export default function Products(){
    const { category } = useParams();
    let content = (
        <></>
    );

    switch (category) {

        case "clothes":
            content = (
                <h1 className='text-5xl font-bold'>Clothes</h1>
            )
            break;
        case "tech":
            content = (
                <h1 className='text-5xl font-bold'>Tech</h1>
            )
            break;
        default:
            content = (
                <h1 className='text-5xl font-bold'>All products</h1>
            )

    }

    return(
        <>
            <title>OmniShop</title>
            <Navbar />
            <main className='p-12'>
                {content}
                    <ProductCards/>
            </main>
        </>
    )
}