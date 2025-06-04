import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Box, Grid } from "@mui/material";
import ProgressPaginationSwipersider from "../../components/ProgressPaginationSwipersider";

const Products = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { id } = router.query; // Get the dynamic id from the route

  console.log(id, "id");

  useEffect(() => {
    if (!id) return; // Wait until the id is available

    const fetchSubCategories = async () => {
      try {
        const response = await fetch(
          `https://tst.etherstaging.xyz/api/sub-categories?category=${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch subcategories");
        }
        const data = await response.json();
        setSubCategories(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [id]); // Re-run the effect when id changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    // <div>
    //   <h1>Subcategories</h1>
    //   <ul>
    //     {subCategories.map((subCategory) => (
    //       <li key={subCategory.id}>{subCategory.name}</li>
    //     ))}
    //   </ul>
    // </div>

    <Layout>
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
        <Grid container spacing={1} py={4}>
          <Grid item lg={12} xs={12}>
            <ProgressPaginationSwipersider subCategories={subCategories} />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Products;
