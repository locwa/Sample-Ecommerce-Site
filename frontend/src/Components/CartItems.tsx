import type {Items} from "../Types/Attribute";
import {getCart, cartTotal, getSelectedAttributeItem, editItemQty, cartItemsForMutation} from "../Utils/cartUtil.ts";
import type {CartItems} from "../Types/CartItems";
import AttributeSelector from "./AttributeSelector.tsx";
import {PlusButton, MinusButton, LoadingSpinner} from "../Logos.tsx"
import {useCart} from "../CartContext.tsx";
import React, {useEffect, useState} from "react";
import {gql, useMutation} from "@apollo/client";

const SUBMIT_ORDER = gql`
    mutation CreateOrder($order: [InputOrderList!]!) {
      createOrder(order: $order) {
        id
        quantity
        selectedAttributes {
          categoryName
          categoryValue
        }
      }
    }
`;

function CartFooter({isEnabled, setIsLoading} : {isEnabled : boolean, setIsLoading : React.Dispatch<React.SetStateAction<boolean>> }) {
    const [submitOrder] = useMutation(SUBMIT_ORDER);

    const { openCart, refreshCart } = useCart();

    const handleSubmit = async () => {
        setIsLoading(true)
        await submitOrder({
            variables: {
                order: cartItemsForMutation()
            }
        });
        localStorage.clear();
        setIsLoading(false)
        refreshCart();
        openCart();
    };

    return (
        <div className="my-8">
            <div className="flex justify-between mb-4">
                <h4 className="text-lg">Total</h4>
                <h4 className="text-lg" data-testid="cart-total">{cartTotal()}</h4>
            </div>
            <button
                className={"w-full py-3 mb-6 text-white " + (isEnabled ? "bg-[#5ECE7B] hover:cursor-pointer" : "bg-[#909090] hover:cursor-not-allowed")}
                onClick={() => cartTotal() && handleSubmit()}
            >
                PLACE ORDER
            </button>
        </div>
    )
}

export default function CartItems() {
    const [cartItems, setCartItems] = useState<CartItems[]>(getCart());
    const {refreshCart} = useCart();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setCartItems(getCart());
    }, [refreshCart]);

    const updateAndRefreshItemQty = (buttonType: string, index: number) => {
        editItemQty(buttonType, index)
        setCartItems(getCart());
        refreshCart();
    };

    if (isLoading){
        return(
            <div className="flex flex-col items-center justify-center my-10 gap-y-6">
                <LoadingSpinner />
                <p>Adding to Cart</p>
            </div>
        )
    }

    if (cartItems.slice().length == 0) {
        return (
            <>
                <p className="overflow-y-scroll min-h-[40vh] max-h-[40vh] scrollbar-slim">Cart is empty</p>
                <CartFooter isEnabled={!!cartItems.slice().length} setIsLoading={setIsLoading}/>
            </>
        )
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
                                        <div
                                            className="flex flex-wrap gap-2"
                                            data-testid={`cart-item-attribute-${attr.id}`}
                                        >
                                            {attr.items.map((item: Items, index3 : number) => (
                                                <AttributeSelector
                                                    key={index3}
                                                    id={item.id}
                                                    attrId={attr.id}
                                                    type={attr.type}
                                                    itemValue={item.value}
                                                    selectedId={getSelectedAttributeItem(attr.id, (cartItems.length - 1 - index1))}
                                                    onSelect={() => ""}
                                                    mode="cart"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div key={index1} className="flex flex-col justify-between mb-4">
                                <button
                                    onClick={() => updateAndRefreshItemQty("plus", (cartItems.length - 1 - index1))} className="hover:cursor-pointer"
                                    data-testid="cart-item-amount-increase"
                                >
                                    <PlusButton />
                                </button>
                                    <p className="text-center" data-testid="cart-item-amount">{cartItem.quantity}</p>
                                <button
                                    onClick={() => updateAndRefreshItemQty("minus", (cartItems.length - 1 - index1))} className="hover:cursor-pointer"
                                    data-testid="cart-item-amount-decrease"
                                >
                                    <MinusButton />
                                </button>
                            </div>
                            <img src={cartItem.photo} alt="" className="max-w-[8rem] min-w-[8rem] h-auto object-scale-down"/>
                        </div>
                    </div>
                ))}
            </div>
            <CartFooter isEnabled={!!cartItems.slice().length} setIsLoading={setIsLoading}/>
        </>
    );
}