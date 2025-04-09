import React, { useState } from "react";
import { useCart } from "../src/context/CartContext";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

const CheckoutForm = () => {
  const { cart, clearCart } = useCart(); // Access cart and clearCart from CartContext
  const router = useRouter();
  // Calculate total price
  // Calculate total price including 10% VAT
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * 1.1 * (item.quantity || 1),
    0
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    town: "",
    thana: "",
    postCode: "",
  });

  const [error, setError] = useState("");

  // Example data for towns, thanas, and post codes
  const townData = {
    Dhaka: {
      thanas: ["Gulshan", "Banani", "Dhanmondi"],
      postCodes: ["1212", "1213", "1209"],
    },
    Chittagong: {
      thanas: ["Pahartali", "Kotwali", "Halishahar"],
      postCodes: ["4202", "4000", "4216"],
    },
    Sylhet: {
      thanas: ["Zindabazar", "Ambarkhana", "Shibganj"],
      postCodes: ["3100", "3101", "3102"],
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTownChange = (e) => {
    const selectedTown = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      town: selectedTown,
      thana: "", // Reset thana when town changes
      postCode: "", // Reset post code when town changes
    }));
  };

  const handlePlaceOrder = () => {
    // Validate form data
    if (
      !formData.name ||
      !formData.email ||
      !formData.town ||
      !formData.thana ||
      !formData.postCode
    ) {
      setError("All fields are required.");
      return;
    }

    // Simulate order submission
    console.log("Order placed:", { formData, cart });

    // Clear the cart and redirect to a success page
    clearCart();
    router.push("/order-success");
  };

  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto", py: 6 }}>
        <Typography variant="h4" textAlign="center" mb={4}>
          Checkout
        </Typography>

        <Grid container spacing={4}>
          {/* User Details Form */}
          <Grid item lg={6} sm={12}>
            <Typography variant="h6" mb={2}>
              Guest Details
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#787878",
                    },
                    "&:hover fieldset": {
                      borderColor: "#787878",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#787878",
                    },
                    color: "#f0f8ff",
                  },
                  "& .MuiInputBase-input": {
                    color: "#f0f8ff",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#f0f8ff",
                  },
                  "& .Mui-focused": {
                    color: "#f0f8ff",
                  },
                }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#787878",
                    },
                    "&:hover fieldset": {
                      borderColor: "#787878",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#787878",
                    },
                    color: "#f0f8ff",
                  },
                  "& .MuiInputBase-input": {
                    color: "#f0f8ff",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#f0f8ff",
                  },
                  "& .Mui-focused": {
                    color: "#f0f8ff",
                  },
                }}
              />

              {/* Town Dropdown */}
              <FormControl
                fullWidth
                required
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#f0f8ff", // Label text color
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#787878", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#787878", // Hover border color
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#787878", // Focused border color
                    },
                  },
                  "& .MuiSelect-select": {
                    color: "#f0f8ff", // Dropdown text color
                  },
                }}
              >
                <InputLabel shrink>Town</InputLabel>
                <Select
                  name="town"
                  value={formData.town}
                  onChange={handleTownChange}
                >
                  {Object.keys(townData).map((town) => (
                    <MenuItem key={town} value={town}>
                      {town}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Thana Dropdown */}
              <FormControl
                fullWidth
                required
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#f0f8ff", // Label text color
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#787878", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#787878", // Hover border color
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#787878", // Focused border color
                    },
                  },
                  "& .MuiSelect-select": {
                    color: "#f0f8ff", // Dropdown text color
                  },
                }}
              >
                <InputLabel shrink>Thana</InputLabel>
                <Select
                  name="thana"
                  value={formData.thana}
                  onChange={handleInputChange}
                  disabled={!formData.town} // Disable if no town is selected
                >
                  {formData.town ? (
                    townData[formData.town]?.thanas.map((thana) => (
                      <MenuItem key={thana} value={thana}>
                        {thana}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">Select a town first</MenuItem>
                  )}
                </Select>
              </FormControl>

              {/* Post Code Dropdown */}
              <FormControl
                fullWidth
                required
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#f0f8ff", // Label text color
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#787878", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#787878", // Hover border color
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#787878", // Focused border color
                    },
                  },
                  "& .MuiSelect-select": {
                    color: "#f0f8ff", // Dropdown text color
                  },
                }}
              >
                <InputLabel shrink>Post Code</InputLabel>
                <Select
                  name="postCode"
                  value={formData.postCode}
                  onChange={handleInputChange}
                  disabled={!formData.town} // Disable if no town is selected
                >
                  {formData.town ? (
                    townData[formData.town]?.postCodes.map((postCode) => (
                      <MenuItem key={postCode} value={postCode}>
                        {postCode}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">Select a town first</MenuItem>
                  )}
                </Select>
              </FormControl>

              {error && (
                <Typography
                  color="error"
                  variant="body2"
                  textAlign="center"
                  mt={2}
                >
                  {error}
                </Typography>
              )}
            </Stack>
          </Grid>

          {/* Cart Summary */}
          <Grid item lg={6} sm={12}>
            <Typography variant="h6" mb={2}>
              Order Summary
            </Typography>
            <Stack spacing={2}>
              {cart.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: 2,
                  }}
                >
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography>Price: BDT {item.price}</Typography>
                  <Typography>Quantity: {item.quantity || 1}</Typography>
                </Box>
              ))}
              <Typography variant="h6">Total Items: {cart.length}</Typography>
              <Typography variant="h6">
                Total Price (with 10% VAT): BDT {totalPrice.toFixed(2)}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        {/* Place Order Button */}
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default CheckoutForm;
