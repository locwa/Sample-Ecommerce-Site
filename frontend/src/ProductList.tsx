import "./App.css"
import Navbar from "./Navbar.tsx"
import { useParams } from "react-router";
import {gql, useQuery} from "@apollo/client";
import type {ProductsData} from "./Types/ProductTypes";

const GET_PRODUCTS = gql`
    query GetProducts($category: String) {
        products(category: $category){
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


function ProductCards({ category }: { category?: string }){

    const { data, error, loading } = useQuery<ProductsData>(GET_PRODUCTS, {
        variables: category ? { category } : {},
    });

    if (loading) return <p className="text-xl my-10">Loading...</p>;
    if (error) return <p>Oops. It seems there is an error loading all products</p>;

    return (
        <div className="flex flex-wrap gap-12">
            {data?.products.map(({ id, name, gallery, prices, inStock }) => (
                <a href={"/product/" + id} className="my-14" key={id}>
                    <div className="h-80 w-72 relative">
                        <img src={gallery[0]} alt="product image" className={inStock ? "h-80 w-72 object-cover" : "h-80 w-72 object-cover grayscale brightness-80"}/>
                        {!inStock && <p className="absolute top-40 text-center w-full h-full text-[#4f4f4f] text-lg">OUT OF STOCK</p>}
                    </div>
                    <h4 className="my-2 text-xl font-light">{name}</h4>
                    <p className='text-lg'>{ prices['currency']['symbol'] + prices['amount'] }</p>
                </a>
            ))}
        </div>
    );
}

export default function ProductList(){
    const { category } = useParams();
    let content = (
        <></>
    );

    switch (category) {
        case "clothes":
            content = (
                <>
                    <h1 className='text-5xl font-bold'>Clothes</h1>
                    <ProductCards category="clothes"/>
                </>
            )
            break;
        case "tech":
            content = (
                <>
                    <h1 className='text-5xl font-bold'>Tech</h1>
                    <ProductCards category="tech"/>
                </>
            )
            break;
        default:
            content = (
                <>
                    <h1 className='text-5xl font-bold'>All Products</h1>
                    <ProductCards/>
                </>
            )

    }

    return(
        <>
            <title>OmniShop</title>
            <Navbar />
            <main className='p-12'>
                {content}
            </main>
        </>
    )
}