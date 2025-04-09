import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

const OrderSuccess = () => {
  const router = useRouter();

  return (
    <Layout>
      <Box
        sx={{
          width: "90%",
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
          py: 6,
        }}
      >
        <Typography variant="h4" mb={4}>
          Order Placed Successfully!
        </Typography>
        <Typography variant="body1" mb={4}>
          Thank you for your order. We will process it shortly.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
        >
          Back to Home
        </Button>
      </Box>
    </Layout>
  );
};

export default OrderSuccess;
