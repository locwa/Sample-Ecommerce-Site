import ImageCarousel from "../Components/ImageCarousel.tsx";
import SanitizeHTML from "../Components/SanitizeHTML.tsx";
import {addToCart} from "../Utils/cart.ts";
import {useParams} from "react-router";
import type {ProductsData} from "../Types/ProductTypes";
import {gql, useQuery} from "@apollo/client";
import Attributes from "../Components/Attributes.tsx";
import {useState} from "react";
import Layout from "../Layout.tsx";
import type {Attribute} from "../Types/Attribute";

const GET_PRODUCT = gql`
    query GetProduct($productId: String ) {
        products(id: $productId){
            id
            name
            inStock
            gallery
            description
            attributes{
              id
              items{
                displayValue
                value
                id
              }
              name
              type
            }
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

    const [addToCartStatus, setAddToCartStatus] = useState(true);

    const cartButtonClick = (name : string, price : number, currency : string, attributes : Attribute[]) => {
        const success = addToCart(name, price, currency, attributes);
        setAddToCartStatus(success)
    }

    if (loading) return <p>Loading…</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Layout>
            {data?.products.map((p) => (
                <section key={p.id} className="flex gap-24 p-16">
                    <title>{`${p.brand}  ${p.name} | OmniShop`}</title>
                    <ImageCarousel gallery={p.gallery} />
                    <div className="w-[45vw]">
                        <h2 className="text-4xl">{`${p.brand}  ${p.name} `}</h2>
                        <Attributes items={p.attributes}/>
                        <h4 className="text-xl my-4">PRICE:</h4>
                        <h3 className="text-3xl mb-4">{p.prices.currency.symbol}{p.prices.amount}</h3>
                        {!addToCartStatus && <p className="text-red-700 mb-4">Please select one from all attributes</p>}
                        <button
                            className={"w-1/2 py-4 mb-8 text-white " + (p.inStock ? "bg-[#5ECE7B] hover:cursor-pointer" : "bg-[#909090] hover:cursor-not-allowed")}
                            disabled={!p.inStock}
                            onClick={() => cartButtonClick(p.name, p.prices.amount, p.prices.currency.symbol, p.attributes)}
                        >ADD TO CART
                        </button>
                        <SanitizeHTML html={p.description} />
                    </div>
                </section>
            ))}
        </Layout>
    );
}