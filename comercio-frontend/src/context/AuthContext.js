import React, { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || null
  );

  useEffect(() => {
    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      setUser(decodedToken);
    }
  }, [authToken]);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:4321/login", {
        username,
        password,
      });
      const token = response.data.token;
      setAuthToken(token);
      localStorage.setItem("authToken", token);
      setUser(jwtDecode(token));
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
