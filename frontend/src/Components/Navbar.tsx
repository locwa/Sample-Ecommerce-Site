import {Cart} from "../Logos.tsx";
import {NavLink, useParams} from "react-router";
import {getCart} from "../Utils/cart.ts";

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

export default function Navbar({ toggleCart }: { toggleCart: () => void }) {
    const {category} = useParams();

    return (
        <nav className='sticky top-0 z-50 bg-white w-full flex justify-between items-center px-10 py-2 bg-white z-2'>
            <div className='flex gap-10'>
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
            <img src="/public/a-logo.png" className='pr-30' alt="a-logo"/>
            <button onClick={toggleCart}>
                <Cart/>
            </button>
            <button onClick={() => getCart()}>getcar</button>
        </nav>
    )
}