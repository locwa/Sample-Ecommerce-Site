import {Cart} from "./Logos.tsx";

export default function Navbar() {
    return (
        <nav className='flex justify-between px-10 py-4'>
            <div className='flex gap-10'>
                <p>ALL</p>
                <p>CLOTHES</p>
                <p>TECH</p>
            </div>
            <Cart/>
        </nav>
    )
}