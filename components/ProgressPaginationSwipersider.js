import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";

function ProgressPaginationSwipersider({ subCategories }) {
  console.log(subCategories,"sub")
  const fallbackImage = "https://via.placeholder.com/200";
  const router = useRouter();

  const handleCardClick = (subcategoryId) => {
    // Navigate to the subcategory page
    router.push(`/category/subcategory/${subcategoryId}`);
  };
  return (
    <Box>
      {/* <Typography
        variant="h4"
        component="h2"
        color="white"
        align="center"
        gutterBottom
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        {(subCategories && subCategories[0].category?.name) ||
          "No Category Name"}
      </Typography> */}

      <Grid container spacing={4} justifyContent="center">
        {subCategories.map((subcategory) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={subcategory.id}>
            <Card
              sx={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
                  "& .overlay": {
                    opacity: 1,
                  },
                  "& .card-media": {
                    transform: "scale(1.1)",
                  },
                },
              }}
              onClick={() => handleCardClick(subcategory.id)}
            >
              <CardMedia
                className="card-media"
                component="img"
                height="350"
                image={subcategory.image || fallbackImage}
                alt={subcategory.name || "No Image"}
                sx={{ transition: "transform 0.4s ease" }}
              />
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  p: 2,
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  fontWeight="bold"
                  textAlign="center"
                  color={"#fff"}
                >
                  {subcategory.name || "No Category Name"}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProgressPaginationSwipersider;
