import React, { useState } from "react";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import instance from "../pages/api/api_instance"; // Add this import at the top

const SignIn = () => {
  const router = useRouter();

  const [signInData, setSignInData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = async () => {
    if (signInData.name && signInData.email && signInData.password) {
      try {
        const response = await instance.post(
          "https://tst.etherstaging.xyz/api/register",
          {
            name: signInData.name,
            email: signInData.email,
            password: signInData.password,
            password_confirmation: signInData.password, // <-- Add this line
            role: "user",
          }
        );
        localStorage.setItem("user", JSON.stringify(response.data.data));
        router.push("/checkout");
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Registration failed. Please try again."
        );
      }
    } else {
      setError("All fields are required.");
    }
  };

  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "600px", margin: "0 auto", py: 6 }}>
        <Typography variant="h4" textAlign="center" mb={4}>
          Create an Account
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={signInData.name}
            onChange={handleInputChange}
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
            label="Email"
            name="email"
            type="email"
            value={signInData.email}
            onChange={handleInputChange}
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
            value={signInData.password}
            onChange={handleInputChange}
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
          <Button variant="contained" color="primary" onClick={handleSignIn}>
            Sign In
          </Button>
        </Stack>

        <Typography textAlign="center" mt={4}>
          Already have an account?{" "}
          <Button
            variant="text"
            color="primary"
            onClick={() => router.push("/checkout")}
            sx={{ textTransform: "none" }}
          >
            Login
          </Button>
        </Typography>
      </Box>
    </Layout>
  );
};

export default SignIn;
