import Navbar from "../Components/Navbar.tsx"
import ImageCarousel from "../Components/ImageCarousel.tsx";
import SanitizeHTML from "../Components/SanitizeHTML.tsx";
import {useParams} from "react-router";
import type {ProductsData} from "../Types/ProductTypes";
import {gql, useQuery} from "@apollo/client";

const GET_PRODUCT = gql`
    query GetProduct($productId: String ) {
        products(id: $productId){
            id
            name
            inStock
            gallery
            description
            prices{
                amount
                currency{
                    symbol
                }
            }
            brand
        }
    }
`;

export default function ProductDetails() {
    const { product } = useParams<{ product: string }>();

    const { data, error, loading } = useQuery<ProductsData>(GET_PRODUCT, {
        variables: product ? { productId: product } : {},
    });

    if (loading) return <p>Loading…</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <Navbar />
            <main className="p-12">
                {data?.products.map((p) => (
                    <section key={p.id} className="flex gap-24 p-16">
                        <title>{`${p.brand}  ${p.name} | OmniShop`}</title>
                        <ImageCarousel gallery={p.gallery} />
                        <div className="w-[45vw]">
                            <h2 className="text-4xl">{`${p.brand}  ${p.name} `}</h2>
                            {/* TODO: Add Attributes */}
                            <h4 className="text-xl my-4">PRICE:</h4>
                            <h3 className="text-3xl mb-4">{p.prices.currency.symbol}{p.prices.amount}</h3>
                            <button type="submit" className="w-1/2 py-4 mb-8 text-white bg-[#5ECE7B]">ADD TO CART</button>
                            <SanitizeHTML html={p.description} />
                        </div>
                    </section>
                ))}
            </main>
        </>
    );
}