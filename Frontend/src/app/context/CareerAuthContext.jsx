import { createContext, useContext, useEffect, useState } from "react";

const CareerAuthContext = createContext(null);

function CareerAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const getStoredCareerUser = () => {
    try {
      const stored = localStorage.getItem("aw_career_user");
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Error reading career auth user:", error);
      return null;
    }
  };

  const refreshProfile = () => {
    try {
      const profile = getStoredCareerUser();
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
    const mockUser = {
      id: "career-user-" + Date.now(),
      name: credentials.name || "Applicant User",
      email: credentials.email
    };
    localStorage.setItem("aw_career_user", JSON.stringify(mockUser));
    setUser(mockUser);
    return { user: mockUser };
  };

  const signup = async (payload) => {
    const mockUser = {
      id: "career-user-" + Date.now(),
      name: payload.name,
      email: payload.email
    };
    localStorage.setItem("aw_career_user", JSON.stringify(mockUser));
    setUser(mockUser);
    return { user: mockUser };
  };

  const logout = async () => {
    localStorage.removeItem("aw_career_user");
    setUser(null);
  };

  return <CareerAuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isInitializing,
        login,
        signup,
        logout,
        refreshProfile
      }}
    >
      {children}
    </CareerAuthContext.Provider>;
}

function useCareerAuth() {
  const context = useContext(CareerAuthContext);

  if (!context) {
    throw new Error("useCareerAuth must be used within CareerAuthProvider");
  }

  return context;
}

export {
  CareerAuthProvider,
  useCareerAuth
};
