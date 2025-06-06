import {Cart} from "../Logos.tsx";
import {Link, NavLink, useParams} from "react-router";
import {getCart} from "../Utils/cartUtil.ts";
import {useCart} from "../CartContext.tsx";

type NavlinkProps = {
    isActive: boolean,
    name?: string,
    path: string,
}


function NavlinkComponent(
    {isActive, name, path}: NavlinkProps,
) {
    if (isActive) {
        return (
            <div className='border-b border-[#5ECE7B] h-12 px-2 flex items-center '>
                <NavLink to={ path } className='font-bold text-[#5ECE7B]'>{name}</NavLink>
            </div>
        )
    } else {
        return (
            <NavLink to={ path } className='h-12 px-2 flex items-center'>{name}</NavLink>
        )
    }
}

export default function Navbar() {
    const {category} = useParams();
    const {isCartOpen, closeCart, toggleCart} = useCart();
    return (
        <nav className='sticky top-0 z-50 bg-white w-full flex justify-between items-center px-10 py-2 bg-white z-2' onClick={ () => isCartOpen && closeCart()}>
            <div className='flex gap-10' >
                <NavlinkComponent
                    path='/'
                    isActive={(category == undefined) && (category !== 'clothes' || category !== 'tech')}
                    name='ALL'
                />
                <NavlinkComponent
                    path='/clothes'
                    isActive={category == "clothes"}
                    name='CLOTHES'
                />
                <NavlinkComponent
                    path='/tech'
                    isActive={category == "tech"}
                    name='TECH'
                />
            </div>
            <Link to="/">
                <img src="/public/a-logo.png" className='pr-30' alt="a-logo"/>
            </Link>
            <button onClick={toggleCart} className="hover:cursor-pointer w-10 h-10 flex items-center justify-center">
                <div className="relative bottom-3 left-8 bg-black w-4 h-4 m-auto rounded-xl">
                    <p className="text-white text-xs">{Object.keys(getCart()).length}</p>
                </div>
                <Cart/>
            </button>
        </nav>
    )
}