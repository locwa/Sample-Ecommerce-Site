import Navbar from "./Components/Navbar.tsx";
import CartItems from "./Components/CartItems.tsx";
import { useCart } from './CartContext';
import {cartTotal} from "./Utils/cart.ts";

function CartLayout() {
    return (
        <>
            <CartItems/>
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
        </>
    )
}

export default function Layout(
    {children}: { children: React.ReactNode },
) {
    const {isCartOpen, toggleCart, cartCount} = useCart();
    return (
        <>
            <title>OmniShop</title>
            <Navbar/>
            {isCartOpen && (
                <>
                    <div
                        className="fixed top-15 left-0 w-full h-full bg-[#00000055] z-20"
                        onClick={toggleCart}
                    />

                    <div className="fixed right-15 bg-white h-8/12 w-96 py-6 px-4 z-40">
                        <div className="flex my-6">
                            <h5 className="mr-2">My Bag,</h5>
                            <p>{` ${cartCount} items`}</p>
                        </div>
                        <div className="text-center">
                            {cartCount ? <CartLayout/> : "no items"}
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