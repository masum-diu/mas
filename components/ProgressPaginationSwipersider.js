import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import instance from "../pages/api/api_instance";
import { useRouter } from "next/router";

function ProgressPaginationSwipersider({ subCategories }) {
  const fallbackImage = "https://via.placeholder.com/200";
  const router = useRouter();

  const handleCardClick = (subcategoryId) => {
    // Navigate to the subcategory page
    router.push(`/category/subcategory/${subcategoryId}`);
  };
  return (
    <Box>
      <Typography
        variant="h6"
        component="div"
        textTransform="uppercase"
        fontWeight="bold"
        color="white"
      >
        {(subCategories && subCategories[0].category?.name) ||
          "No Category Name"}
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {subCategories.map((subcategory) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={subcategory.id}>
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
              onClick={() => handleCardClick(subcategory.id)}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image={subcategory.image || fallbackImage}
                  alt={subcategory.name || "No Image"}
                  sx={{
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />
                <CardContent
                  sx={{
                    backgroundColor: "#f9f9f9",
                    textAlign: "center",
                    padding: "16px",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    textTransform="uppercase"
                    fontWeight="bold"
                    color="#333"
                  >
                    {subcategory.name || "No Category Name"}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProgressPaginationSwipersider;
