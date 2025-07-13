import React from "react";
import { useCart } from "../src/context/CartContext";
import {
  Box,
  Button,
  Grid,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

const Cart = () => {
  const { cart, loading, clearCart, removeFromCart, updateQuantity } =
    useCart();
  const router = useRouter();

  const handleRemoveProduct = async (cartItem) => {
    try {
      console.log("Removing item:", cartItem);
      await removeFromCart(cartItem.id);
    } catch (error) {
      console.error("Error removing product:", error);
      alert("Failed to remove item from cart. Please try again.");
    }
  };

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    try {
      await updateQuantity(cartItemId, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity. Please try again.");
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert("Failed to clear cart. Please try again.");
    }
  };

  const handleProceedToCheckout = () => {
    router.push("/checkout");
  };

  if (loading) {
    return (
      <Layout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto", py: 6 }}>
        <Typography variant="h4" textAlign="center" mb={4}>
          Your Cart
        </Typography>
        {cart.length > 0 ? (
          <Grid container spacing={4}>
            <Grid item lg={8} sm={12}>
              {cart.map((item) => {
                const product = item.product || {};
                const imageUrl =
                  product?.product_images?.[0]?.image ||
                  "/placeholder-image.png";
                return (
                  <Box
                    key={item.id}
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: 2,
                      marginBottom: 2,
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item lg={4} sm={6} xs={12}>
                        <img
                          src={imageUrl}
                          alt={product.name}
                          width="100%"
                          style={{ objectFit: "contain" }}
                        />
                      </Grid>
                      <Grid item lg={8} sm={6} xs={12}>
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography>Price: {product.price} USD</Typography>
                        <Typography>
                          Color: {item.color?.name || "N/A"}
                        </Typography>
                        <Typography>
                          Size: {item.size?.name || "N/A"}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 2,
                            mb: 2,
                          }}
                        >
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() =>
                              item.quantity > 1 &&
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <Typography sx={{ mx: 2 }}>
                            {item.quantity}
                          </Typography>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </Box>

                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleRemoveProduct(item)}
                          sx={{ mt: 2 }}
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
                <Typography>Total Items: {cart.length}</Typography>
                <Typography>
                  Total Amount:{" "}
                  {cart.reduce(
                    (sum, item) =>
                      sum + (item.product?.price || 0) * item.quantity,
                    0
                  )}{" "}
                  USD
                </Typography>
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
                  onClick={handleClearCart}
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
