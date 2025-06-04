import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import instance from "../pages/api/api_instance";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        // Set authorization header for all future requests
        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storedToken}`;
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (userData) => {
    try {
      const userId = user?.id;
      if (!userId) {
        throw new Error("User ID not found");
      }

      // Make a POST request to update profile
      const response = await instance.post("user", userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUser = response.data.data;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { success: true, data: updatedUser };
    } catch (error) {
      console.error("Error updating profile:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update profile",
      };
    }
  };

  const signIn = async (email, password) => {
    try {
      console.log("Attempting login with:", { email });
      const response = await instance.post("/login", { email, password });
      console.log("Login response:", response.data);

      // Check if we have a response
      if (!response.data) {
        throw new Error("No response data received");
      }

      // Handle different response formats
      let userData = null;
      let tokenData = null;

      if (response.data.data) {
        // Format: { data: { token, user } }
        userData = response.data.data.user || response.data.data;
        tokenData = response.data.data.token || response.data.token;
      } else if (response.data.user) {
        // Format: { user, token }
        userData = response.data.user;
        tokenData = response.data.token;
      } else if (response.data.success) {
        // Format: { success: true, data: { user, token } }
        userData = response.data.data.user;
        tokenData = response.data.data.token;
      }

      if (!userData || !tokenData) {
        console.error("Invalid response structure:", response.data);
        return {
          success: false,
          error: "Could not process login response. Please try again.",
        };
      }

      // Store the user data and token
      setToken(tokenData);
      setUser(userData);
      localStorage.setItem("token", tokenData);
      localStorage.setItem("user", JSON.stringify(userData));

      // Set authorization header for all future requests
      instance.defaults.headers.common["Authorization"] = `Bearer ${tokenData}`;

      return { success: true, data: userData };
    } catch (error) {
      console.error("Login error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      // Handle specific error cases
      if (error.response?.status === 401) {
        return {
          success: false,
          error: "Invalid email or password",
        };
      } else if (error.response?.status === 422) {
        return {
          success: false,
          error: "Please check your email and password format",
        };
      } else if (error.response?.data?.message) {
        return {
          success: false,
          error: error.response.data.message,
        };
      }

      return {
        success: false,
        error: "Unable to connect to the server. Please try again.",
      };
    }
  };

  const signOut = async () => {
    try {
      if (token) {
        await instance.post("/logout");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete instance.defaults.headers.common["Authorization"];
      router.push("/");
    }
  };

  const value = {
    token,
    user,
    loading,
    signIn,
    signOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
