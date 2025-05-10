import "./App.css"
import Navbar from "./Navbar.tsx"
import {useParams} from "react-router";
export default function Products(){
    let { category } = useParams();
    let content = (
        <></>
    );

    switch (category) {

        case "clothes":
            content = (
                <h1>This is the clothes page</h1>
            )
            break;
        case "tech":
            content = (
                <h1>This is the tech page</h1>
            )
            break;
        default:
            content = (
                <h1>All products here</h1>
            )

    }

    return(
        <>
            <title>OmniShop</title>
            <Navbar />
            {content}
        </>
    )
}