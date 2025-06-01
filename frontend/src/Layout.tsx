import Navbar from "./Components/Navbar.tsx";
import React, {useState} from "react";
import {getCart} from "./Utils/cart.ts";
import CartItems from "./Components/CartItems.tsx";

export default function Layout(
    {children} : { children : React.ReactNode },

) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    return(
        <>
            <title>OmniShop</title>
            <Navbar toggleCart={() => setIsCartOpen(prev => !prev)} />
            {isCartOpen && (
                <>
                    <div
                        className="fixed top-15 left-0 w-full h-full bg-[#00000055] z-20"
                        onClick={() => setIsCartOpen(prev => !prev)}
                    />

                    <div className="fixed right-15 bg-white h-[58vh] w-88 py-6 px-4 z-40">
                        <div className="flex my-6">
                            <h5 className="mr-2">My Bag,</h5>
                            <p>{` ${Object.keys(getCart()).length} items`}</p>
                        </div>
                        <div className="text-center">
                            {Object.keys(getCart()).length ? <CartItems/> : "no items"}
                        </div>
                    </div>
                </>

            )
            }
            <main className='p-12'>
                {children}
            </main>
        </>
    )
}