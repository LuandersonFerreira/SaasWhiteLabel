import { useState, useEffect, useCallback } from "react";
import api from "./api";

export function logout() {
  if (typeof window !== "undefined") {
    // localStorage.removeItem("authToken");
    // localStorage.removeItem("authUser");
  }
}

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    let savedToken = "";
    let savedUser = "";
    if (typeof window !== "undefined") {
      // savedToken = localStorage.getItem("authToken");
      // savedUser = localStorage.getItem("authUser");
    }

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });
      const { token, user } = response.data;

      if (typeof window !== "undefined") {
        // localStorage.setItem("authToken", token);
        // localStorage.setItem("authUser", JSON.stringify(user));
      }

      setToken(token);
      setUser(user);

      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      // localStorage.removeItem("authToken");
      // localStorage.removeItem("authUser");
      setToken(null);
      setUser(null);
    }
    delete api.defaults.headers.common["Authorization"];
  }, []);

  const isAuthenticated = !!token;

  return { user, token, isAuthenticated, login, logout };
};
