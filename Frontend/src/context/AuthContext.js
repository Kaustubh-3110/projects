import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [access, setAccess] = useState(localStorage.getItem("access"));
  const [refresh, setRefresh] = useState(localStorage.getItem("refresh"));

  const login = (accessToken, refreshToken) => {
    localStorage.setItem("access", accessToken);
    localStorage.setItem("refresh", refreshToken);
    setAccess(accessToken);
    setRefresh(refreshToken);
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAccess(null);
    setRefresh(null);
  };

  return (
    <AuthContext.Provider value={{ access, refresh, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};