import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import instance from "../../api/api_instance";

const SubcategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { subcategoryId } = router.query;

  console.log(subcategoryId);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await instance.get(`/product?sub-category=${subcategoryId}`);
      setProducts(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    if (subcategoryId) {
      fetchProducts();
    }
  }, [subcategoryId]);

  const handleNavigation = (product) => {
    const productId = product?.id;
    router.push({
      pathname: `/singleproduct/${productId}`,
    });
  };

  if (loading) {
    return (
      <Layout>
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
        <Grid container spacing={1} py={4}>
          {products?.map((product, index) => {
            return (
              <Grid item lg={3} sm={6} key={index} sx={{ cursor: "pointer" }}>
                <Card
                  sx={{
                    maxWidth: 300,
                    margin: "10px auto",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                  onClick={() => handleNavigation(product)}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={product?.product_images[0]?.image || ""}
                    alt={product?.name || "Product Image"}
                  />
                  <CardContent
                    sx={{
                      backgroundColor: "#f9f9f9",
                      textAlign: "center",
                      padding: "16px",
                    }}
                  >
                    <Typography
                      component="div"
                      textTransform="uppercase"
                      fontWeight="bold"
                      color="#333"
                    >
                      {product?.name || "No Product Name"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Layout>
  );
};

export default SubcategoryProducts;
