import {Link} from "react-router";
import {useState} from "react";
import type {Price} from "../Types/ProductTypes";

type ProductCard = {
    id: string;
    name: string;
    inStock: boolean;
    gallery: string[];
    prices: Price;
}

export default function ProductCard({id, name, gallery, prices, inStock} : ProductCard){
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Link to={"/product/" + id} className={"my-14 p-3 " + (isHovered && "shadow-[0_0_25px_3px_rgba(0,0,0,0.25)]")} key={id} onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
            <div className="h-80 w-80 relative">
                <img src={gallery[0]} alt="product image" className={inStock ? "h-80 w-72 object-cover" : "h-80 w-72 object-cover grayscale brightness-80"}/>
                {!inStock && <p className="relative bottom-40 text-center w-full h-full text-[#4f4f4f] text-lg">OUT OF STOCK</p>}
            </div>
            <div className="mt-8">
                <h4 className="my-2 text-xl font-light">{name}</h4>
                <p className='text-lg'>{prices['currency']['symbol'] + prices['amount']}</p>
            </div>
        </Link>
    );
}