import "./App.css"
import Navbar from "./Navbar.tsx"
import ProductCards from "./Components/ProductCards.tsx";
import {useParams} from "react-router";


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