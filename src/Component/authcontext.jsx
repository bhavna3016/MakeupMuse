
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("makeupMuseUser")) || null;
    } catch {
      return null;
    }
  });

  const signup = (name, email, password) => {
    try {
      const users = JSON.parse(
        localStorage.getItem("makeupMuseUsers") || "[]"
      );

      const normalizedEmail = email.trim().toLowerCase();

      const alreadyExists = users.some(
        (item) => item.email === normalizedEmail
      );

      if (alreadyExists) {
        return {
          success: false,
          message: "This email is already registered.",
        };
      }

      const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: normalizedEmail,
        password,
      };

      users.push(newUser);

      localStorage.setItem("makeupMuseUsers", JSON.stringify(users));

      return {
        success: true,
        message: "Account created successfully!",
      };
    } catch {
      return {
        success: false,
        message: "Unable to save your account. Please try again.",
      };
    }
  };

  const login = (email, password) => {
    try {
      const users = JSON.parse(
        localStorage.getItem("makeupMuseUsers") || "[]"
      );

      const matchedUser = users.find(
        (item) =>
          item.email === email.trim().toLowerCase() &&
          item.password === password
      );

      if (!matchedUser) {
        return {
          success: false,
          message: "Invalid email or password.",
        };
      }

      const loggedInUser = {
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
      };

      localStorage.setItem(
        "makeupMuseUser",
        JSON.stringify(loggedInUser)
      );

      setUser(loggedInUser);

      return { success: true };
    } catch {
      return {
        success: false,
        message: "Unable to log in. Please try again.",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("makeupMuseUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
