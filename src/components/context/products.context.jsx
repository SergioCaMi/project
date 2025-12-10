// =====================================================
// CONTEXTO DE TIENDA
// =====================================================
// Mantiene la tienda actual accesible para toda la app.

import { createContext, useState, useEffect } from "react";
import PRODUCTS from '../../shop-data.json';


// Estado inicial del contexto
export const ProductsContext = createContext({
  products: [],
});

// Proveedor del contexto
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>; //Creamos el proveedor del contexto con los productos cargados y todos sus hijos podrán acceder a ellos
};
