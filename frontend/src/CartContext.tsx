import { createContext, useContext, useState, type ReactNode } from 'react';
import {getCart} from "./Utils/cart.ts";

type CartContextType = {
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    cartCount: number;
    refreshCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartCount, setCartCount] = useState(Object.keys(getCart()).length);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen(prev => !prev);
    const refreshCart = () => setCartCount(Object.keys(getCart()).length);

    return (
        <CartContext.Provider
            value={{ isCartOpen, openCart, closeCart, toggleCart, cartCount, refreshCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Hook for easy access
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};