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

  // console.log(subcategoryId);

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
        {products?.length > 0 ? (
          <Grid container spacing={4} py={4}>
            {products.map((product) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={product.id}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: 345,
                    position: "relative",
                    borderRadius: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
                      "& .overlay": {
                        opacity: 1,
                      },
                      "& .card-media": {
                        opacity: 0.7,
                      },
                    },
                  }}
                >
                  <Box
                    sx={{ position: "relative", cursor: "pointer" }}
                    onClick={() => handleNavigation(product)}
                  >
                  <CardMedia
                    className="card-media"
                    component="img"
                    height="350"
                    image={product?.product_images?.[0]?.image || ""}
                    alt={product?.name || "Product Image"}
                  />
                  <CardContent
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
                      color: "white",
                      p: 2,
                      pt: 4,
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      fontWeight="bold"
                      color={"#fff"}
                      sx={{ textTransform: "uppercase" }}
                    >
                      {product?.name || "No Product Name"}
                    </Typography>
                  </CardContent>
                  </Box>
                  {/* <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 2,
                    }}
                  >
                    <Typography
                      variant="h5"
                      color="text.primary"
                      fontWeight="bold"
                    >
                      ${product?.price || "0.00"}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#333",
                        color: "white",
                        borderRadius: "20px",
                        px: 2,
                        "&:hover": {
                          backgroundColor: "#555",
                        },
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent> */}
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <Typography variant="h5" color="text.secondary">
              No products found in this collection.
            </Typography>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default SubcategoryProducts;
