import Navbar from "./Components/Navbar.tsx";

export default function Layout({children} : { children : React.ReactNode }) {
    return(
        <>
            <title>OmniShop</title>
            <Navbar />
            <main className='p-12'>
                {children}
            </main>
        </>
    )
}