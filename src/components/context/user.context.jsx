// =====================================================
// CONTEXTO DE USUARIO
// =====================================================
// Mantiene el usuario actual accesible para toda la app.

import { createContext, useState, useEffect } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../../utils/firebase/firebase.utils";

// Estado inicial del contexto
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    // Listener de Firebase: detecta login, logout y cambios de sesión
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        // Si el usuario es nuevo, se crea en Firestore
        createUserDocumentFromAuth(user);
      }

      setCurrentUser(user);
    });

    return unsubscribe; // Limpieza
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
