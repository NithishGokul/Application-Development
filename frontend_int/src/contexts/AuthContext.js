import React, { createContext, useState, useContext } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Handle login and set the user data
  const login = (userData) => {
    const { email, role, username } = userData;
    setUser({ email, role, username });
  };

  // Handle logout and clear the user data
  const logout = () => {
    setUser(null);
  };

  // Update user data
  const updateUser = (updatedUser) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUser,
    }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export default AuthContext;