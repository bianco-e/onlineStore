import React, { useState } from "react";

const AdminContext = React.createContext({});

export const AdminContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(false);

  const login = () => setAdmin(true);
  const logout = () => setAdmin(false);

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
