import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getMe, loginUser, logoutUser } from "../api/authApi";
import toast from "react-hot-toast";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getMe();
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (formData) => {
    try {
      setLoading(true);
      const res = await loginUser(formData);

      setUser(res.data.user);
      toast.success("Login Successful!");
      return res.data.user;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      toast.success("Logout Successful!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout Unsuccessful!");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, setLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
