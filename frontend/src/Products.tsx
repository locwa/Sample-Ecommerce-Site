import "./App.css"
import Navbar from "./Navbar.tsx"
import { useParams } from "react-router";

function ProductCard(){
    return(
        <section className='my-14'>
            <div className='h-80 w-72 bg-black'></div>
            <h4 className='my-2 text-xl font-light'>Product 1</h4>
            <p className='text-lg'>$54.99</p>
        </section>
    )
}

export default function Products(){
    let { category } = useParams();
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
                <div className='flex flex-wrap gap-4'>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                </div>
            </main>
        </>
    )
}