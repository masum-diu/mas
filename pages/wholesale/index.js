import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Layout from "../../components/Layout";

import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import ProgressPaginationSwipersider from "../../components/ProgressPaginationSwipersider";

import instance from "../api/api_instance";

const ProductCategoryRetail = () => {
  const router = useRouter();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tabId, setTabId] = useState(1);
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  const { slug, id } = router.query;

  // Fetch product data
  const fetchingData = async () => {
    try {
      setLoading(true);
      const res = await instance.get(`/product/${tabId}`);
      setProducts(res?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchingData();
    }
  }, [tabId, router.isReady]);

  // Component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Wait until the component has mounted to avoid SSR mismatch
  if (!isMounted) return null;

  const handleNavigation = (productId) => {
    router.push(`/wholesale/${productId}`);
  };

  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
        <Grid container spacing={1} py={4}>
          <Grid item lg={12} xs={12}>
            <ProgressPaginationSwipersider setTabId={setTabId} />
          </Grid>
        </Grid>
        <Grid container spacing={2} pb={6}>
          {loading ? (
            <div className="loading-container">
              <CircularProgress />
            </div>
          ) : (
            products?.map((product, index) => {
              const featureImages = product?.feature_image
                ? JSON.parse(product.feature_image)
                : [];
              const imageUrl =
                featureImages.length > 0
                  ? `${product.img_path}/${featureImages[0]}`
                  : "/placeholder.jpg";

              return (
                <Grid item lg={3} sm={6} key={index} sx={{ cursor: "pointer" }}>
                  <img
                    src={imageUrl}
                    alt={product?.p_name || "Product Image"}
                    width="100%"
                    onClick={() => handleNavigation(product.id)}
                  />
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
                    onClick={() => handleNavigation(product.id)}
                  >
                    View Details
                  </Button>
                </Grid>
              );
            })
          )}
        </Grid>
      </Box>
    </Layout>
  );
};

export default ProductCategoryRetail;
