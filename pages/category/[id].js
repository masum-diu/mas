import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import ProgressPaginationSwipersider from "../../components/ProgressPaginationSwipersider";
import instance from "../api/api_instance";

const Products = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { id } = router.query; // Get the dynamic id from the route

  // console.log(id, "id");

  useEffect(() => {
    if (!id) return; // Wait until the id is available

    const fetchSubCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await instance.get(`/sub-categories?category=${id}`);
        setSubCategories(response?.data?.data || []);
      } catch (err) {
        console.error("Error fetching sub-categories:", err);
        setError("Failed to fetch sub-categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [id]); // Re-run the effect when id changes

  if (loading) {
    return (
      <Layout>
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
        <Typography variant="h3" component="h1" color="white" align="center" py={4}>
          Explore Our Collections
        </Typography>
        {subCategories.length > 0 ? (
          <Grid container spacing={1} pb={4}>
            <Grid item lg={12} xs={12}>
              <ProgressPaginationSwipersider subCategories={subCategories} />
            </Grid>
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 10,
            }}
          >
            <Typography variant="h5" color="text.secondary">No collections found in this category.</Typography>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Products;
