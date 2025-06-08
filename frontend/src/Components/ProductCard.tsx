import {Link} from "react-router";
import {useState} from "react";
import type {Price} from "../Types/ProductTypes";
import {Cart} from "../Logos.tsx";
import type {Attribute} from "../Types/Attribute";
import {quickShop} from "../Utils/cartUtil.ts";
import {useCart} from "../CartContext.tsx";


type ProductCardParams = {
    id: string;
    name: string;
    inStock: boolean;
    gallery: string[];
    attributes: Attribute[];
    prices: Price;
    brand: string;
}

export default function ProductCard({id, name, gallery, prices, inStock, attributes, brand} : ProductCardParams){
    const [isHovered, setIsHovered] = useState(false)
    const { openCart, refreshCart } = useCart();

    const addToCart = (
        name: string,
        price: number,
        currency: string,
        attributes: Attribute[],
        photo: string,
        id: string,
        brand: string
    ) => {
        const success = quickShop(name, price, currency, attributes, photo, id, brand);
        if (success) {
            refreshCart();
            openCart();
        }
    }

    return (
        <div
            className={"my-14 p-3 relative " + (isHovered && "shadow-[0_0_25px_3px_rgba(0,0,0,0.25)]")}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
        >
            {(isHovered && inStock) && (
                <button
                    className="bg-[#5ECE7B] h-13 w-13 rounded-[30px] absolute right-6 top-77 flex items-center justify-center hover:cursor-pointer z-2"
                    onClick={() => addToCart(name, prices["amount"], prices["currency"]["symbol"], attributes , gallery[0], id, brand)}
                >
                    <Cart fill={"#ffffff"} />
                </button>
            )}
            <Link
                to={"/product/" + id}
            >
                <div className="h-80 w-80 relative">
                    <img
                        src={gallery[0]}
                        alt="product image"
                        className={inStock ? "h-80 w-80 object-cover" : "h-80 w-80 object-cover grayscale brightness-80"}
                    />
                    {!inStock &&
                        <p className="relative bottom-40 text-center w-full h-full text-[#4f4f4f] text-lg">
                            OUT OF STOCK
                        </p>}
                </div>
                <div className="mt-8">
                    <h4 className="my-2 text-xl font-light">{name}</h4>
                    <p className='text-lg'>{prices['currency']['symbol'] + prices['amount']}</p>
                </div>
            </Link>
        </div>

    );
}