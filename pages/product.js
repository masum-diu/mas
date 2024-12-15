import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter
import Layout from "../components/Layout";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid } from "@mui/material";
import instance from "./api/api_instance";

const Product = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const fetchingData = async () => {
    try {
      setLoading(true);
      const res = await instance.get("/product?no_paginate=yes&take_some=8");
      setProducts(res?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const handleNavigation = (id) => {
    router.push(`/singleproduct/${id}`); // Navigate to the detail page with ID
  };

  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
        <Grid container spacing={2} py={8}>
          {loading ? (
            <Typography>Loading..</Typography>
          ) : (
            products?.map((product, index) => (
              <Grid item lg={3} sm={6} key={index}>
                <img src={product?.feature_image} alt="" width={"100%"} />
                <Typography
                  className="Medium"
                  fontSize={18}
                  textTransform={"uppercase"}
                >
                  {product?.p_name}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleNavigation(product.id)} // Pass product ID
                >
                  View Details
                </Button>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Product;
