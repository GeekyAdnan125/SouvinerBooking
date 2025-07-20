// src/context/UserContext.js
import { createContext, useContext, useEffect, useState } from "react";

// 1. Create Context
const UserContext = createContext();

// 2. Create Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);  
    useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");
    const name = localStorage.getItem("userName");
    if (token && role && email) { 
      setUser({ token, role, email, name });
    }
  }, []);
    const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <UserContext.Provider value={{ user, setUser , logout}}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Custom Hook
export const useAppContext = () => useContext(UserContext);

