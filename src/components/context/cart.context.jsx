
import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // Verifica si el ítem ya existe en el carrito
   const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    // Si ya existe, incrementa la cantidad
// Si el producto ya existe en el carrito (se encontró un ítem con el mismo ID)...
if (existingCartItem) {
  // Recorremos todos los ítems del carrito para actualizar solo el que coincide
  return cartItems.map((cartItem) =>
    // ¿Este ítem es el que queremos actualizar?
    cartItem.id === productToAdd.id
      // Sí: devolvemos una copia del ítem con la cantidad incrementada en 1
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      // No: lo devolvemos sin cambios
      : cartItem
  );
}    // Si no existe, agrega el nuevo ítem con cantidad 1
    return [...cartItems, {...productToAdd, quantity:1}];
  };
// Estado inicial del contexto
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

// Proveedor del contexto
export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
      
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>; 
};
