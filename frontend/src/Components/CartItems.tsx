import type {Items} from "../Types/Attribute";
import {getCart, cartTotal} from "../Utils/cart.ts";
import type {CartItems} from "../Types/CartItems";
import AttributeSelector from "./AttributeSelector.tsx";
import {PlusButton, MinusButton} from "../Logos.tsx"
// import {useState} from "react";

export default function CartItems() {
    const cartItems : CartItems[] = getCart();

    // const [selectedByAttr, setSelectedByAttr] = useState<Record<string, string | null>>({});

    return (
        <>
            <div className="text-left overflow-y-scroll max-h-[40vh] scrollbar-slim">
                {cartItems.reverse().map((cartItem, index) => (
                    <div key={index} className="mt-2 mb-7">
                        <div className="flex gap-4">
                            <div className="max-w-[8rem] min-w-[8rem]">
                                <p className="text-xl font-light">{cartItem.name}</p>
                                <p>{`${cartItem.currency}${cartItem.price}`}</p>
                                {cartItem.productAttributes.map((attr, index) => (
                                    <div key={index} className="my-4">
                                        <p className="font-light">{attr.id}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {attr.items.map((item: Items) => (
                                                <AttributeSelector
                                                    key={item.id}
                                                    id={item.id}
                                                    type={attr.type}
                                                    itemValue={item.value}
                                                    selectedId={null}
                                                    onSelect={() => console.log(item.value)}
                                                    mode="cart"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div key={index} className="flex flex-col justify-between mb-4">
                                <PlusButton />
                                <p className="text-center">{cartItem.quantity}</p>
                                <MinusButton />
                            </div>
                            <img src={cartItem.photo} alt="" className="max-w-[8rem] min-w-[8rem] h-auto object-scale-down"/>
                        </div>
                    </div>
                ))}
            </div>
            <div className="my-8">
                <div className="flex justify-between mb-4">
                    <h4 className="text-lg">Total</h4>
                    <h4 className="text-lg">{ cartTotal()}</h4>
                </div>
                <button
                    className="w-full py-3 mb-6 text-white bg-[#5ECE7B] hover:cursor-pointer"
                >
                    PLACE ORDER
                </button>
            </div>
        </>
    );
}