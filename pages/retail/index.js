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
  const { slug, id } = router.query; // Access dynamic parameters
  const [tabId, setTabId] = useState(31);
  const [isMounted, setIsMounted] = useState(false); // Track if the component has mounted
  const [tabName, setTabName] = useState("");

  console.log(tabId, "sds");
  // Fetch product data
  const fetchingData = async () => {
    try {
      setLoading(true);
      const res = await instance.get(`/product?sub_category=${tabId}`);
      setProducts(res?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    }
  };

  // Ensure that the component is mounted and router is ready before rendering
  useEffect(() => {
    if (router.isReady) {
      setIsMounted(true); // Set isMounted to true once router is ready
      fetchingData(); // Fetch data after hydration
    }
  }, [router.isReady, tabId]);

  // If not mounted yet, don't render anything (to avoid hydration mismatch)
  if (!isMounted) return null;

  const handleNavigation = (product) => {
    const productId = product?.id;

    router.push({
      pathname: `/retail/${productId}`,
      // query: { name: tabName },
    });
  };

  // const handleSetTab = (id, name) => {
  //   setTabId(id);
  //   setTabName(name);
  // };
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
              console.log(product, "p");
              const featureImages = product?.feature_image
                ? JSON.parse(product.feature_image)
                : [];
              const imageUrl =
                featureImages.length > 0
                  ? `${featureImages[0]}`
                  : "/placeholder.jpg";
              // ?.filter((product) => product?.sub_category_id === tabId) // 🔥 Filter by selected tab/category
              // .map((product, index) => {
              //   // console.log(product, "product");

              //   const imageUrl = product?.images?.[0] || "/placeholder.jpg";

                return (
                  <Grid
                    item
                    lg={3}
                    sm={6}
                    key={index}
                    sx={{ cursor: "pointer" }}
                  >
                    <img
                      src={imageUrl}
                      alt={product?.p_name || "Product Image"}
                      width="100%"
                      onClick={() => handleNavigation(product)}
                    />
                    <Typography
                      className="Medium"
                      fontSize={18}
                      textTransform="uppercase"
                    >
                      {product?.p_name}
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleNavigation(product)}
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
