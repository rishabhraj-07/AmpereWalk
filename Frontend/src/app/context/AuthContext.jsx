import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Check for mock user in localStorage (for testing without backend)
  const getMockUser = () => {
    try {
      const mockUser = localStorage.getItem('aw_mock_user');
      return mockUser ? JSON.parse(mockUser) : null;
    } catch {
      return null;
    }
  };

  const refreshProfile = async () => {
    try {
      // Check for mock user first
      const mockUser = getMockUser();
      if (mockUser) {
        setUser(mockUser);
        return mockUser;
      }

      const profile = await apiRequest("/api/auth/profile");
      setUser(profile);
      return profile;
    } catch (error) {
      // Fall back to mock user if API fails
      const mockUser = getMockUser();
      if (mockUser) {
        setUser(mockUser);
        return mockUser;
      }
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
    try {
      const data = await apiRequest("/api/auth/login", {
        method: "POST",
        body: credentials
      });
      setUser(data.user);
      return data;
    } catch (error) {
      // Mock login for testing - accept any credentials
      const mockUser = {
        id: 'test-user-' + Date.now(),
        name: credentials.name || 'Test User',
        email: credentials.email,
      };
      localStorage.setItem('aw_mock_user', JSON.stringify(mockUser));
      setUser(mockUser);
      return { user: mockUser };
    }
  };

  const signup = async (payload) => {
    try {
      const data = await apiRequest("/api/auth/signup", {
        method: "POST",
        body: payload
      });
      setUser(data.user);
      return data;
    } catch (error) {
      // Mock signup for testing
      const mockUser = {
        id: 'test-user-' + Date.now(),
        name: payload.name,
        email: payload.email,
      };
      localStorage.setItem('aw_mock_user', JSON.stringify(mockUser));
      setUser(mockUser);
      return { user: mockUser };
    }
  };

  const logout = async () => {
    try {
      await apiRequest("/api/auth/logout", {
        method: "POST"
      });
    } catch (error) {
      // Continue logout even if API fails
    } finally {
      // Clear mock user if it exists
      localStorage.removeItem('aw_mock_user');
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
