import { clear } from "@testing-library/user-event/dist/clear";
import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // Verifica si el ítem ya existe en el carrito
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // Si ya existe, incrementa la cantidad
  // Si el producto ya existe en el carrito (se encontró un ítem con el mismo ID)...
  if (existingCartItem) {
    // Recorremos todos los ítems del carrito para actualizar solo el que coincide
    return cartItems.map((cartItem) =>
      // ¿Este ítem es el que queremos actualizar?
      cartItem.id === productToAdd.id
        ? // Sí: devolvemos una copia del ítem con la cantidad incrementada en 1
          { ...cartItem, quantity: cartItem.quantity + 1 }
        : // No: lo devolvemos sin cambios
          cartItem
    );
  } // Si no existe, agrega el nuevo ítem con cantidad 1
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // Buscar el ítem en el carrito
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // Si no existe, devolver el carrito sin cambios
  if (!existingCartItem) {
    return cartItems;
  }

  // Si la cantidad es 1, eliminar el ítem
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // Si la cantidad es mayor a 1, decrementar en 1
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

// Estado inicial del contexto
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemsFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}



// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  
useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,  
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);





  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

    const clearItemsFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemsFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
