import ImageCarousel from "../Components/ImageCarousel.tsx";
import SanitizeHTML from "../Components/SanitizeHTML.tsx";
import {addToCart} from "../Utils/cartUtil.ts";
import {useParams} from "react-router";
import type {ProductsData} from "../Types/ProductTypes";
import {gql, useQuery} from "@apollo/client";
import Attributes from "../Components/Attributes.tsx";
import {useState} from "react";
import Layout from "../Layout.tsx";
import type {Attribute} from "../Types/Attribute";
import {useCart} from "../CartContext.tsx";

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

    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});

    const [addToCartStatus, setAddToCartStatus] = useState(true);

    const { openCart, refreshCart } = useCart();

    const cartButtonClick = (name : string, price : number, currency : string, attributes : Attribute[], photo : string) => {
        if ((Object.keys(attributes).length) === (Object.keys(selectedAttributes).length)){
            const success = addToCart(name, price, currency, attributes, photo, selectedAttributes);
            setAddToCartStatus(success)
            if (success) {
                refreshCart();
                openCart();
            }
        }
    }

    console.log(selectedAttributes);

    if (loading) return <Layout><p className="text-xl my-10">Loading...</p></Layout>;
    if (error) return <Layout><p>Oops. It seems there is an error loading the product</p></Layout>;

    return (
        <Layout>
            {data?.products.map((p) => (
                <section key={p.id} className="flex gap-24 p-16">
                    <title>{`${p.brand}  ${p.name} | OmniShop`}</title>
                    <ImageCarousel gallery={p.gallery} />
                    <div className="w-[45vw]">
                        <h2 className="text-4xl">{`${p.brand}  ${p.name} `}</h2>
                        <Attributes
                            items={p.attributes}
                            onSelect={(selections) => setSelectedAttributes(selections)}
                        />
                        <h4 className="text-xl my-4">PRICE:</h4>
                        <h3 className="text-3xl mb-4">{p.prices.currency.symbol}{p.prices.amount}</h3>
                        {!addToCartStatus && <p className="text-red-700 mb-4">Please select one from all attributes</p>}
                        <button
                            className={"w-1/2 py-4 mb-8 text-white " + (p.inStock ? "bg-[#5ECE7B] hover:cursor-pointer" : "bg-[#909090] hover:cursor-not-allowed")}
                            disabled={!p.inStock}
                            onClick={() => p.inStock &&  cartButtonClick(p.name, p.prices.amount, p.prices.currency.symbol, p.attributes, p.gallery[0])}
                        >
                            ADD TO CART
                        </button>
                        <SanitizeHTML html={p.description} />
                    </div>
                </section>
            ))}
        </Layout>
    );
}