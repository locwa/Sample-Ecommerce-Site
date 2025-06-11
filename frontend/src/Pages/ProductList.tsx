import "../App.css"
import {useParams} from "react-router";
import Layout from "../Layout.tsx";
import {gql, useQuery} from "@apollo/client";
import type {ProductsData} from "../Types/ProductTypes";
import ProductCard from "../Components/ProductCard.tsx";


const GET_PRODUCTS = gql`
    query GetProducts($category: String) {
        products(category: $category){
            id
            name
            inStock
            gallery
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


function ProductCards({ category }: { category?: string }){

    const { data, error, loading } = useQuery<ProductsData>(GET_PRODUCTS, {
        variables: category ? { category } : {},
        fetchPolicy: 'no-cache'
    });


    if (loading) return <p className="text-xl my-10">Loading...</p>;
    if (error) return <p>Oops. It seems there is an error loading all products</p>;

    return (
        <div className="flex flex-wrap gap-12">
            {data?.products.map(({ id, brand, name, gallery, prices, inStock, attributes }) => (
                    <ProductCard
                        key={id}
                        id={id}
                        name={name}
                        inStock={inStock}
                        gallery={gallery}
                        prices={prices}
                        attributes={attributes}
                        brand={brand}
                    />
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
                    <ProductCards category="all"/>
                </>
            )

    }

    return(
        <Layout>
            {content}
        </Layout>
    )
}