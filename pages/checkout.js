import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useAuth } from "../authcontext/AuthContext";

const Checkout = () => {
  const router = useRouter();
  const { signIn, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

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
    setError("");
  };

  const handleLogin = async () => {
    setError("");
    if (!loginData.email || !loginData.password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signIn(loginData.email, loginData.password);
      if (result.success) {
        router.push("/checkout-form");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestCheckout = () => {
    router.push("/checkout-form");
  };

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
          py: 8,
          px: 3,
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          mb={4}
          sx={{
            fontSize: "2rem",
            fontWeight: 600,
            color: "white",
          }}
        >
          Login
        </Typography>

        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            padding: "32px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <Stack spacing={3}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleLoginInputChange}
              fullWidth
              variant="outlined"
              InputProps={{
                sx: {
                  color: "white",
                  "&::placeholder": {
                    color: "#999",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#999",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "4px",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
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
              variant="outlined"
              InputProps={{
                sx: {
                  color: "#fff",
                  "&::placeholder": {
                    color: "#999",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#999",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "4px",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                },
              }}
            />

            {error && (
              <Typography
                color="error"
                variant="body2"
                textAlign="center"
                sx={{
                  backgroundColor: "rgba(255,0,0,0.1)",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              onClick={handleLogin}
              disabled={isLoading}
              sx={{
                backgroundColor: "#9A0E20",
                color: "#fff",
                py: 1.5,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#7a0b19",
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>

            <Typography
              textAlign="center"
              sx={{
                color: "#999",
                position: "relative",
                "&::before, &::after": {
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  width: "80px",
                  height: "1px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
                "&::before": {
                  left: 0,
                },
                "&::after": {
                  right: 0,
                },
              }}
            >
              or
            </Typography>

            <Button
              variant="outlined"
              onClick={handleGuestCheckout}
              sx={{
                borderColor: "rgba(255, 255, 255, 0.2)",
                color: "#fff",
                py: 1.5,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              Continue as Guest
            </Button>

            <Typography textAlign="center" sx={{ color: "#999" }}>
              Don't have an account?{" "}
              <Button
                variant="text"
                onClick={handleSignIn}
                sx={{
                  color: "#9A0E20",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                Sign Up
              </Button>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Layout>
  );
};

export default Checkout;
