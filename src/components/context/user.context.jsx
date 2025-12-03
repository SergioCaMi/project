import { createContext, useState } from "react";

// Es el valor actual al que queremos acceder
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// componente funcional UserProvider que envuelve a los hijos con el contexto
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Placeholder para currentUser
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
