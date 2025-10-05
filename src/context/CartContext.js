import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartData = async (guestId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/cart?guest_id=${guestId}`
      );
      const data = await response.json();
      if (data.data) {
        setCart(data.data);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
    }
  };

  // Fetch cart data on mount
  useEffect(() => {
    const guestId = localStorage.getItem("guest_id");
    if (!guestId) {
      setLoading(false);
      return;
    }
    fetchCartData(guestId).finally(() => setLoading(false));
  }, []);

  const addToCart = async (product) => {
    console.log("product", product);

    const guestId = localStorage.getItem("guest_id");
    if (!guestId) return;

    try {
      const response = await fetch(
        "http://localhost:8000/api/cart/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...product,
            guest_id: guestId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      // Fetch the updated cart data
      await fetchCartData(guestId);
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    const guestId = localStorage.getItem("guest_id");
    if (!guestId) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/cart/update/${cartItemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );

      await fetchCartData(guestId);
    } catch (error) {
      console.error("Error updating quantity:", error);
      throw error;
    }
  };

  const removeFromCart = async (cartItemId) => {
    const guestId = localStorage.getItem("guest_id");
    if (!guestId) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/cart/${cartItemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to remove from cart");
      }

      setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
      await fetchCartData(guestId);
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  };

  const clearCart = async () => {
    const guestId = localStorage.getItem("guest_id");
    if (!guestId) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/cart/clear`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ guest_id: guestId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }

      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        loading,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
