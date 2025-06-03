// import AttributeSelector from "./AttributeSelector.tsx";
// import type {Items} from "../Types/Attribute";
import {getCart} from "../Utils/cart.ts";
import type {CartItems} from "../Types/CartItems";

export default function CartItems() {
    const cartItems : CartItems[] = getCart();
    return (
        <div className="text-left overflow-y-scroll max-h-[40vh] scrollbar-slim">
            {cartItems.map((cartItem, index) => (
                <div key={index} className="mt-2 mb-7">
                    <div className="flex gap-4">
                        <div className="max-w-[10rem] min-w-[10rem]">
                            <p className="text-xl font-light">{cartItem.name}</p>
                            <p>{`${cartItem.currency}${cartItem.price}`}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}