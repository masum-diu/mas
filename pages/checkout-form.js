import React, { useEffect, useState } from "react";
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
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    town: "",
    thana: "",
    postCode: "",
    area: "",
    streetAddress: "",
    apartmentAddress: "",
    phone: "",
    email: "",
    orderNotes: "",
  });

  const [error, setError] = useState("");

  const countryData = {
    Bangladesh: {
      towns: ["Dhaka", "Chittagong", "Sylhet"],
      thanas: {
        Dhaka: ["Gulshan", "Banani", "Dhanmondi"],
        Chittagong: ["Pahartali", "Kotwali", "Halishahar"],
        Sylhet: ["Zindabazar", "Ambarkhana", "Shibganj"],
      },
      postCodes: {
        Dhaka: ["1212", "1213", "1209"],
        Chittagong: ["4202", "4000", "4216"],
        Sylhet: ["3100", "3101", "3102"],
      },
    },
    USA: {
      towns: ["New York", "Los Angeles", "Chicago"],
      thanas: {
        "New York": ["Manhattan", "Brooklyn"],
        "Los Angeles": ["Hollywood", "Downtown"],
        Chicago: ["North Side", "South Side"],
      },
      postCodes: {
        "New York": ["10001", "10002"],
        "Los Angeles": ["90001", "90002"],
        Chicago: ["60601", "60602"],
      },
    },
    Canada: {
      towns: ["Toronto", "Vancouver", "Montreal"],
      thanas: {
        Toronto: ["North York", "Scarborough"],
        Vancouver: ["Downtown", "Richmond"],
        Montreal: ["Old Montreal", "Plateau"],
      },
      postCodes: {
        Toronto: ["M1B", "M1C"],
        Vancouver: ["V5K", "V5L"],
        Montreal: ["H1A", "H1B"],
      },
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      country: selectedCountry,
      town: "",
      thana: "",
      postCode: "",
    }));
  };

  const handleTownChange = (e) => {
    const selectedTown = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      town: selectedTown,
      thana: "",
      postCode: "",
    }));
  };

  const handlePlaceOrder = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.country ||
      !formData.town ||
      !formData.thana ||
      !formData.postCode ||
      !formData.area ||
      !formData.streetAddress ||
      !formData.phone ||
      !formData.email
    ) {
      setError("All required fields must be filled.");
      return;
    }

    console.log("Order placed:", { formData, cart });
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
              Billing Details
            </Typography>
            <Stack spacing={2}>
              {/* First Name */}
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                fullWidth
                required
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#ffffff", // Input text color
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff", // Label text color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ffffff", // Label color when focused
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9e9e9e", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#9e9e9e", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9e9e9e", // Border color when focused
                    },
                  },
                }}
              />

              {/* Last Name */}
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                fullWidth
                required
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#ffffff", // Input text color
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff", // Label text color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ffffff", // Label color when focused
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9e9e9e", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#9e9e9e", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9e9e9e", // Border color when focused
                    },
                  },
                }}
              />

              {/* Country Dropdown */}
              <FormControl
                fullWidth
                required
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#ffffff", // Input text color
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff", // Label text color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ffffff", // Label color when focused
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9e9e9e", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#9e9e9e", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9e9e9e", // Border color when focused
                    },
                  },
                }}
              >
                <InputLabel>Country</InputLabel>
                <Select
                  name="country"
                  value={formData.country}
                  onChange={handleCountryChange}
                >
                  {Object.keys(countryData).map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Town Dropdown */}
              <FormControl
                fullWidth
                required
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#ffffff", // Input text color
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff", // Label text color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ffffff", // Label color when focused
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9e9e9e", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#9e9e9e", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9e9e9e", // Border color when focused
                    },
                  },
                }}
              >
                <InputLabel>Town/City</InputLabel>
                <Select
                  name="town"
                  value={formData.town}
                  onChange={handleTownChange}
                  disabled={!formData.country}
                >
                  {formData.country &&
                    countryData[formData.country]?.towns.map((town) => (
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
                  "& .MuiInputBase-input": {
                    color: "#ffffff", // Input text color
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff", // Label text color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ffffff", // Label color when focused
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9e9e9e", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#9e9e9e", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9e9e9e", // Border color when focused
                    },
                  },
                }}
              >
                <InputLabel>Thana</InputLabel>
                <Select
                  name="thana"
                  value={formData.thana}
                  onChange={handleInputChange}
                  disabled={!formData.town}
                >
                  {formData.town &&
                    countryData[formData.country]?.thanas[formData.town]?.map(
                      (thana) => (
                        <MenuItem key={thana} value={thana}>
                          {thana}
                        </MenuItem>
                      )
                    )}
                </Select>
              </FormControl>

              {/* Post Code Dropdown */}
              <FormControl
                fullWidth
                required
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#ffffff", // Input text color
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff", // Label text color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ffffff", // Label color when focused
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9e9e9e", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#9e9e9e", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9e9e9e", // Border color when focused
                    },
                  },
                }}
              >
                <InputLabel>Post Code</InputLabel>
                <Select
                  name="postCode"
                  value={formData.postCode}
                  onChange={handleInputChange}
                  disabled={!formData.town}
                >
                  {formData.town &&
                    countryData[formData.country]?.postCodes[
                      formData.town
                    ]?.map((postCode) => (
                      <MenuItem key={postCode} value={postCode}>
                        {postCode}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              {/* Area */}
              <TextField
                label="Area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                fullWidth
                required
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#ffffff", // Input text color
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff", // Label text color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ffffff", // Label color when focused
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9e9e9e", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#9e9e9e", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9e9e9e", // Border color when focused
                    },
                  },
                }}
              />

              {/* Street Address */}
              <TextField
                label="Street Address"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                fullWidth
                required
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#ffffff", // Input text color
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff", // Label text color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ffffff", // Label color when focused
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9e9e9e", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#9e9e9e", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9e9e9e", // Border color when focused
                    },
                  },
                }}
              />

              {/* Apartment Address */}
              <TextField
                label="Apartment Address (Optional)"
                name="apartmentAddress"
                value={formData.apartmentAddress}
                onChange={handleInputChange}
                fullWidth
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#ffffff", // Input text color
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff", // Label text color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ffffff", // Label color when focused
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9e9e9e", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#9e9e9e", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9e9e9e", // Border color when focused
                    },
                  },
                }}
              />

              {/* Phone */}
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                fullWidth
                required
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#ffffff", // Input text color
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff", // Label text color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ffffff", // Label color when focused
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9e9e9e", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#9e9e9e", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9e9e9e", // Border color when focused
                    },
                  },
                }}
              />

              {/* Email Address */}
              <TextField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                required
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#ffffff", // Input text color
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff", // Label text color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ffffff", // Label color when focused
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9e9e9e", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#9e9e9e", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9e9e9e", // Border color when focused
                    },
                  },
                }}
              />

              {/* Order Notes */}
              <TextField
                label="Order Notes (Optional)"
                name="orderNotes"
                value={formData.orderNotes}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#ffffff", // Input text color
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff", // Label text color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ffffff", // Label color when focused
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9e9e9e", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#9e9e9e", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9e9e9e", // Border color when focused
                    },
                  },
                }}
              />

              {error && (
                <Typography color="error" variant="body2" textAlign="center">
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
                  <Typography>{item.name}</Typography>
                  <Typography>Price: BDT {item.price}</Typography>
                  <Typography>Quantity: {item.quantity || 1}</Typography>
                </Box>
              ))}
              <Typography variant="h5">Total Items: {cart.length}</Typography>
              <Typography variant="h5">
                Total Price (with 10% VAT): BDT{" "}
                {cart
                  .reduce(
                    (sum, item) =>
                      sum + item.price * 1.1 * (item.quantity || 1),
                    0
                  )
                  .toFixed(2)}
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
