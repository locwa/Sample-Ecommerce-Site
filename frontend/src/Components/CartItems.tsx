import type {Items} from "../Types/Attribute";
import {getCart, getSelectedAttributeItem} from "../Utils/cart.ts";
import type {CartItems} from "../Types/CartItems";
import AttributeSelector from "./AttributeSelector.tsx";
import {PlusButton, MinusButton} from "../Logos.tsx"
import {useState} from "react";

export default function CartItems() {
    const cartItems : CartItems[] = getCart();

    const [itemQty, setItemQty] = useState(1);

    const editItemQty = (buttonType : string, index : number)=>  {
        const newIndex : number = index + 1;
        let quantity = 0;
        const storage = localStorage.getItem(newIndex.toString());
        if (storage != null){
            let item = JSON.parse(storage)
            let itemStringified = "";
            if (buttonType == "plus") {
                item["quantity"] = item["quantity"] + 1;
                itemStringified = JSON.stringify(item)
                localStorage.setItem(newIndex.toString(), itemStringified)
                quantity = item["quantity"];
            }
            else if (buttonType == "minus") {
                item["quantity"] = item["quantity"] - 1;
                if (item["quantity"] !== 0) {
                    itemStringified = JSON.stringify(item);
                    localStorage.setItem(newIndex.toString(), itemStringified);
                    quantity = item["quantity"];
                } else {
                    localStorage.removeItem(newIndex.toString());
                }
            }
        }
        setItemQty(quantity);
    }

    return (
        <>
            <div className="text-left overflow-y-scroll h-[40vh] scrollbar-slim">
                {cartItems.reverse().map((cartItem, index1) => (
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
                                                    onSelect={() => console.log(getSelectedAttributeItem(attr.id, (cartItems.length - 1 - index1)))}
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
                                    <p className="text-center">{itemQty}</p>
                                <button onClick={() => editItemQty("minus", (cartItems.length - 1 - index1))} className="hover:cursor-pointer">
                                    <MinusButton />
                                </button>
                            </div>
                            <img src={cartItem.photo} alt="" className="max-w-[8rem] min-w-[8rem] h-auto object-scale-down"/>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}