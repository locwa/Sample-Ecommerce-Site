import type {Items} from "../Types/Attribute";
import {getCart, cartTotal, getSelectedAttributeItem} from "../Utils/cart.ts";
import type {CartItems} from "../Types/CartItems";
import AttributeSelector from "./AttributeSelector.tsx";
import {PlusButton, MinusButton} from "../Logos.tsx"
import {useCart} from "../CartContext.tsx";
import {useEffect, useState} from "react";

function CartFooter() {
    return (
        <div className="my-8">
            <div className="flex justify-between mb-4">
                <h4 className="text-lg">Total</h4>
                <h4 className="text-lg">{cartTotal()}</h4>
            </div>
            <button
                className="w-full py-3 mb-6 text-white bg-[#5ECE7B] hover:cursor-pointer"
            >
                PLACE ORDER
            </button>
        </div>
    )
}

export default function CartItems() {
    const [cartItems, setCartItems] = useState<CartItems[]>(getCart());
    const {refreshCart} = useCart();

    useEffect(() => {
        setCartItems(getCart());
    }, [refreshCart]);

    const updateAndRefreshCart = () => {
        setCartItems(getCart());
        refreshCart();
    };

    const editItemQty = (buttonType: string, index: number) => {
        localStorage.removeItem("loglevel")
        let key = localStorage.key(index);
        if (key != null) {
            const storage = localStorage.getItem(key);
            if (storage != null) {
                let item = JSON.parse(storage)
                let itemStringified = "";
                if (buttonType == "plus") {
                    item["quantity"] = item["quantity"] + 1;
                    itemStringified = JSON.stringify(item)
                    localStorage.setItem(key, itemStringified)
                }
                else if (buttonType == "minus") {
                    item["quantity"] = item["quantity"] - 1;
                    if (item["quantity"] != 0) {
                        itemStringified = JSON.stringify(item);
                        localStorage.setItem(key, itemStringified);
                    } else {
                        localStorage.removeItem(key);
                    }
                }
            }
            updateAndRefreshCart();
        }
    }

    return (
        <>
            <div className="text-left overflow-y-scroll min-h-[40vh] max-h-[40vh] scrollbar-slim">
                {cartItems.slice().reverse().map((cartItem, index1) => (
                    <div key={index1} className="mt-2 mb-7" id={index1.toString()}>
                        <div className="flex gap-4">
                            <div className="max-w-[8rem] min-w-[8rem]">
                                <p className="text-xl font-light">{cartItem.name}</p>
                                <p>{`${cartItem.currency}${cartItem.price}`}</p>
                                {cartItem.productAttributes.map((attr, index2) => (
                                    <div key={index2} className="my-4">
                                        <p className="font-light">{attr.id}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {attr.items.map((item: Items, index3 : number) => (
                                                <AttributeSelector
                                                    key={index3}
                                                    id={item.id}
                                                    type={attr.type}
                                                    itemValue={item.value}
                                                    selectedId={getSelectedAttributeItem(attr.id, (cartItems.length - 1 - index1))}
                                                    onSelect={() => console.log(cartItems.length - 1 - index1)}
                                                    mode="cart"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div key={index1} className="flex flex-col justify-between mb-4">
                                <button onClick={() => editItemQty("plus", (cartItems.length - 1 - index1))} className="hover:cursor-pointer">
                                    <PlusButton />
                                </button>
                                    <p className="text-center">{cartItem.quantity}</p>
                                <button onClick={() => editItemQty("minus", (cartItems.length - 1 - index1))} className="hover:cursor-pointer">
                                    <MinusButton />
                                </button>
                            </div>
                            <img src={cartItem.photo} alt="" className="max-w-[8rem] min-w-[8rem] h-auto object-scale-down"/>
                        </div>
                    </div>
                ))}
            </div>
            {cartItems.slice().length && <CartFooter/>}
        </>
    );
}