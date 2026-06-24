import axios from "axios";
import React, { useEffect, useContext, useState, createContext } from "react";
import { AuthDataContext } from "./AuthContext";  // ✅ import AuthContext

export const AdminDataContext = createContext();

function AdminContext({ children }) {
  let [adminData, setAdminData] = useState(null);
  let { serverUrl } = useContext(AuthDataContext); // ✅ fix

  const getAdmin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setAdminData(null);
        return;
      }

      let result = await axios.get(`${serverUrl}/api/admin/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAdminData(result.data.admin);
      console.log("Admin Verified:", result.data);
    } catch (error) {
      setAdminData(null);
      console.log("Auth Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  let value = { adminData, getAdmin, setAdminData };

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
}

export default AdminContext;
