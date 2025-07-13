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
import instance from "./api/api_instance";

const CheckoutForm = () => {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Check for guest_id on component mount
  useEffect(() => {
    const guestId = localStorage.getItem("guest_id");
    if (!guestId) {
      // Generate a new guest ID if none exists
      const newGuestId = Math.floor(Math.random() * 1000000) + 1;
      localStorage.setItem("guest_id", newGuestId.toString());
    }
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    country: "",
    town: "",
    thana: "",
    postCode: "",
    area: "",
    streetAddress: "",
    apartmentAddress: "",
    phone: "",
    phoneNumber: "",
    email: "",
    orderNotes: "",
    paymentMethod: "",
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
    setFormData((prevData) => {
      const newData = {
        ...prevData,
        [name]: value,
      };

      if (name === "firstName" || name === "lastName") {
        newData.fullName = `${
          name === "firstName" ? value : prevData.firstName
        } ${name === "lastName" ? value : prevData.lastName}`.trim();
      }

      if (name === "phone") {
        if (value.length <= 15) {
          newData.phoneNumber = value;
          setError("");
        } else {
          setError("Phone number must not exceed 15 characters");
          newData.phoneNumber = value.slice(0, 15);
        }
        newData.phone = newData.phoneNumber;
      }

      return newData;
    });
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

  const handlePlaceOrder = async () => {
    const guestId = localStorage.getItem("guest_id");

    if (!guestId) {
      setError("Session expired. Please try again.");
      router.push("/");
      return;
    }

    // Check all required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.fullName ||
      !formData.country ||
      !formData.town ||
      !formData.thana ||
      !formData.postCode ||
      !formData.area ||
      !formData.streetAddress ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.paymentMethod ||
      !cart.length
    ) {
      setError(
        "Please fill in all required fields and ensure cart is not empty."
      );
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate phone number
    if (formData.phoneNumber.length > 15) {
      setError("Phone number must not exceed 15 characters");
      return;
    }

    try {
      setIsPlacingOrder(true);
      setError("");

      const totalAmount = cart.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
        0
      );

      const orderData = {
        user_id: parseInt(guestId), // Convert guest_id to number for user_id
        guest_id: guestId,
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        email: formData.email,
        country: formData.country,
        city: formData.town, // Add city field for API compatibility
        town: formData.town, // Keep town field as well
        state: formData.thana, // Add state field for API compatibility
        thana: formData.thana,
        police_station: formData.thana, // Add police_station field for API compatibility
        post_code: formData.postCode,
        area_details: formData.area, // Changed from area to area_details for API compatibility
        address_type: "home", // Add address_type field for API compatibility
        street_address: formData.streetAddress,
        apartment_address: formData.apartmentAddress,
        order_notes: formData.orderNotes,
        order_status: "pending",
        total_amount: totalAmount.toString(),
        items: cart.map((item) => ({
          product_id: item.product_id,
          color_id: item.color_id,
          size_id: item.size_id,
          quantity: item.quantity || 1,
          price: item.price?.toString(),
        })),
      };

      // Handle payment based on method
      switch (formData.paymentMethod) {
        case "stripe":
          await handleStripePayment(orderData);
          break;
        case "cod":
          await handleCashOnDelivery(orderData);
          break;
        default:
          setError("Please select a valid payment method");
          setIsPlacingOrder(false);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        Object.values(error.response?.data?.errors || {})
          .flat()
          .join(", ") ||
        "Failed to place order. Please try again.";
      setError(errorMessage);
      setIsPlacingOrder(false);
    }
  };

  const handleCashOnDelivery = async (orderData) => {
    try {
      const response = await instance.post("place-order", {
        ...orderData,
        payment_method: "cod",
      });

      if (response.data.success) {
        clearCart();
        router.push("/order-success");
      } else {
        throw new Error(response.data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("COD order error:", error);
      throw error; // Let the main error handler deal with it
    }
  };

  const handleStripePayment = async (orderData) => {
    try {
      const response = await instance.post("place-order", {
        ...orderData,
        payment_method: "stripe",
      });

      // Log the response for debugging
      console.log("Stripe payment response:", {
        success: response.data.success,
        session_url: response.data.session_url,
        url: response.data.url,
        message: response.data.message,
      });

      if (response.data.success) {
        // Check for session_url in the response
        if (response.data.session_url) {
          console.log(
            "Redirecting to Stripe session URL:",
            response.data.session_url
          );
          // Redirect to Stripe checkout
          window.location.href = response.data.session_url;
        } else if (response.data.url) {
          console.log("Redirecting to fallback URL:", response.data.url);
          // Fallback to url if session_url is not present
          window.location.href = response.data.url;
        } else {
          throw new Error("Payment URL not received");
        }
      } else {
        throw new Error(response.data.message || "Failed to process payment");
      }
    } catch (error) {
      console.error("Stripe payment error:", error);
      throw error; // Let the main error handler deal with it
    }
  };

  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto", py: 6 }}>
        <Typography variant="h4" textAlign="center" mb={4}>
          Checkout
        </Typography>

        <Grid container spacing={4}>
          {/* User Details Form */}
          <Grid item lg={8} sm={12} xs={12}>
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

              {/* Add Payment Method Selection */}
              <FormControl
                fullWidth
                required
                sx={{
                  mt: 2,
                  "& .MuiInputBase-input": {
                    color: "#ffffff",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9e9e9e",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9e9e9e",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9e9e9e",
                    },
                  },
                }}
              >
                <InputLabel>Payment Method *</InputLabel>
                <Select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="cod">Cash on Delivery (COD)</MenuItem>
                  <MenuItem value="stripe">Card Payment (Stripe)</MenuItem>
                </Select>
              </FormControl>

              {error && (
                <Typography color="error" variant="body2" textAlign="center">
                  {error}
                </Typography>
              )}
            </Stack>
          </Grid>

          {/* Cart Summary */}
          {/* Order Summary */}
          <Grid item lg={4} sm={12}>
            <Typography variant="h6" mb={2}>
              Order Summary
            </Typography>
            <Box
              sx={{
                border: "1px solid #ccc", // Border color
                borderRadius: "8px", // Rounded corners
                padding: 3, // Padding inside the box
                backgroundColor: "inherit", // Keep the background color as it is
              }}
            >
              {cart.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    marginBottom: 2,
                    paddingBottom: 2,
                    borderBottom:
                      index !== cart.length - 1 ? "1px solid #ddd" : "none", // Add a divider between items
                  }}
                >
                  <Typography>{item.name}</Typography>
                  <Typography>Price: BDT {item.price}</Typography>
                  <Typography>Quantity: {item.quantity || 1}</Typography>
                </Box>
              ))}
              <Typography variant="h5" mt={2}>
                Total Items: {cart.length}
              </Typography>
              <Typography variant="h5">
                Total Price : BDT{" "}
                {cart
                  .reduce(
                    (sum, item) =>
                      sum + item.price * 1.1 * (item.quantity || 1),
                    0
                  )
                  .toFixed(2)}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Place Order Button */}
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder || formData.phone.length > 15}
          >
            {isPlacingOrder
              ? formData.paymentMethod === "stripe"
                ? "Redirecting to Payment..."
                : "Placing Order..."
              : "Place Order"}
          </Button>
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default CheckoutForm;
