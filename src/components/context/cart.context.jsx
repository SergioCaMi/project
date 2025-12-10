
import { createContext, useState } from "react";
import PRODUCTS from '../../shop-data.json';


// Estado inicial del contexto
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {}
});

// Proveedor del contexto
export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = {isCartOpen, setIsCartOpen};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>; 
};
