import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography, Stack } from "@mui/material";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import instance from "../pages/api/api_instance"; // Add this import at the top

const Checkout = () => {
  const router = useRouter();

  const [isGuest, setIsGuest] = useState(false); // Track if the user is a guest
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setError(""); // Clear previous error
    if (!loginData.email || !loginData.password) {
      setError("Email and password are required.");
      return;
    }
    try {
      const response = await instance.post(
        "https://msb.etherstaging.xyz/api/login",
        {
          email: loginData.email,
          password: loginData.password,
        }
      );
      // Store user info in localStorage if needed
      localStorage.setItem("user", JSON.stringify(response.data.data));
      router.push("/checkout-form"); // Redirect to the checkout form
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  const handleGuestCheckout = () => {
    setIsGuest(true); // Set guest mode
    router.push("/checkout-form"); // Redirect to the checkout form
  };

  const handleSignIn = () => {
    router.push("/sign-in"); // Redirect to the sign-in page
  };

  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "600px", margin: "0 auto", py: 6 }}>
        <Typography variant="h4" textAlign="center" mb={4}>
          Proceed to Checkout
        </Typography>

        {!isGuest ? (
          <Box>
            <Typography variant="h6" mb={2}>
              Login to Continue
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={loginData.email}
                onChange={handleLoginInputChange}
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#787878", // Default border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#787878", // Hover border color
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#787878", // Focused border color
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "#f0f8ff", // Input text color
                  },
                  "& .MuiInputLabel-root": {
                    color: "#f0f8ff", // Label text color
                  },
                  "& .Mui-focused": {
                    color: "#f0f8ff", // Focused label text color
                  },
                }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleLoginInputChange}
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#787878", // Default border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#787878", // Hover border color
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#787878", // Focused border color
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "#f0f8ff", // Input text color
                  },
                  "& .MuiInputLabel-root": {
                    color: "#f0f8ff", // Label text color
                  },
                  "& .Mui-focused": {
                    color: "#f0f8ff", // Focused label text color
                  },
                }}
              />
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
              <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
              </Button>
            </Stack>

            <Typography textAlign="center" mt={4}>
              OR
            </Typography>

            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={handleGuestCheckout}
              sx={{ mt: 2 }}
            >
              Continue as Guest
            </Button>

            <Typography textAlign="center" mt={4}>
              Don't have an account?{" "}
              <Button
                variant="text"
                color="primary"
                onClick={handleSignIn}
                sx={{ textTransform: "none" }}
              >
                Sign In
              </Button>
            </Typography>
          </Box>
        ) : (
          <Typography textAlign="center">
            Redirecting to checkout form...
          </Typography>
        )}
      </Box>
    </Layout>
  );
};

export default Checkout;
