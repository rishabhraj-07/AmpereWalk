import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const refreshProfile = async () => {
    try {
      const profile = await apiRequest("/api/auth/profile");
      setUser(profile);
      return profile;
    } catch (error) {
      setUser(null);
      return null;
    } finally {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  const login = async (credentials) => {
    const data = await apiRequest("/api/auth/login", {
      method: "POST",
      body: credentials
    });
    setUser(data.user);
    return data;
  };

  const signup = async (payload) => {
    const data = await apiRequest("/api/auth/signup", {
      method: "POST",
      body: payload
    });
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    try {
      await apiRequest("/api/auth/logout", {
        method: "POST"
      });
    } finally {
      setUser(null);
    }
  };

  return <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isInitializing,
        login,
        logout,
        refreshProfile,
        signup
      }}
    >
      {children}
    </AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

export {
  AuthProvider,
  useAuth
};
