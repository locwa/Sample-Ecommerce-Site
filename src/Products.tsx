import "./App.css"
import Navbar from "./Navbar.tsx"
import { useParams } from "react-router";
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
            </main>
        </>
    )
}