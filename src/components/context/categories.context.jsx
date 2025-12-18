// =====================================================
// CONTEXTO DE TIENDA
// =====================================================
// Mantiene la tienda actual accesible para toda la app.

import { createContext, useState, useEffect } from "react";
import {getCategoriesAndDocuments, addCollectionAndDocuments} from "../../utils/firebase/firebase.utils.js";
import SHOP_DATA from '../../shop-data.js';

// Estado inicial del contexto
export const CategoryContext = createContext({
  categoriesMap: {},
});

// Proveedor del contexto
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };  
    getCategoriesMap();
  }, []);
  // Si es la primera vez que se corre la app, descomentar para cargar los datos iniciales de SHOP_DATA a Firestore
  useEffect(() => {
    addCollectionAndDocuments('categories', SHOP_DATA);
  }, []);

  const value = { categoriesMap };
  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>; //Creamos el proveedor del contexto con los productos cargados y todos sus hijos podrán acceder a ellos
};
