import React, { useEffect, useState } from "react";
import { useCart } from "../src/context/CartContext";
import { Box, Button, Grid, Typography, Stack } from "@mui/material";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close"; // Import the Close icon

const Cart = () => {
  const { cart, clearCart } = useCart();
  const [localCart, setLocalCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setLocalCart(JSON.parse(storedCart));
    }
  }, [cart]);

  const handleProceedToCheckout = () => {
    router.push("/checkout");
  };

  const handleRemoveProduct = (productId) => {
    // Filter out the product with the matching id
    const updatedCart = localCart.filter((item) => item.id !== productId);

    // Update the local cart state
    setLocalCart(updatedCart);

    // Update localStorage with the updated cart
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto", py: 6 }}>
        <Typography variant="h4" textAlign="center" mb={4}>
          Your Cart
        </Typography>

        {localCart.length > 0 ? (
          <Grid container spacing={4}>
            <Grid item lg={8} sm={12}>
              {localCart.map((item, index) => {
                const featureImages = item?.images ? item?.images[0] : [];
                const imageUrl = featureImages;

                return (
                  <Box
                    key={index}
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: 2,
                      marginBottom: 2,
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item lg={4} sm={6} xs={12}>
                        <img src={imageUrl} width="100%" />
                      </Grid>
                      <Grid item lg={8} sm={6} xs={12}>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography>Price: BDT {item.price}</Typography>
                        <Typography>VAT: BDT {item.vat?.toFixed(2)}</Typography>
                        <Typography>
                          Total: BDT {item.priceWithVAT?.toFixed(2)}
                        </Typography>
                        <Typography>Color: {item.color}</Typography>
                        <Typography>Size: {item.size}</Typography>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleRemoveProduct(item.id)} // Remove button
                        >
                          Remove
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                );
              })}
            </Grid>

            <Grid item lg={4} sm={12}>
              <Stack
                spacing={2}
                sx={{
                  border: "1px solid #ccc",
                  padding: 3,
                  borderRadius: "8px",
                }}
              >
                <Typography variant="h6">Order Summary</Typography>
                <Typography>Total Items: {localCart.length}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => clearCart()}
                >
                  Clear Cart
                </Button>
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <Typography textAlign="center">Your cart is empty.</Typography>
        )}
      </Box>
    </Layout>
  );
};

export default Cart;
