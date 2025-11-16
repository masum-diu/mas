import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Box, Button, Grid, styled, Typography } from "@mui/material";
import instance from "./api/api_instance";
import { useRouter } from "next/router";

const ImageContainer = styled(Box)(({ theme }) => ({
  width: "90%",
  maxWidth: "400px",
  aspectRatio: "1 / 1", // ✅ always keeps it a perfect circle
  borderRadius: "50%",
  position: "relative",
  overflow: "hidden",
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
  cursor: "pointer",
  transition: "transform 0.3s ease",

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    transition: "opacity 0.3s ease, transform 0.3s ease",
    display: "block",
  },

  "&:hover img": {
    opacity: 0.5,
    transform: "scale(1.05)",
  },

  "&:hover .overlay": {
    opacity: 1,
    transform: "scale(1)",
  },

  // ✅ Responsive adjustments
  [theme.breakpoints.down("md")]: {
    maxWidth: "300px",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "220px",
  },
  [theme.breakpoints.down("xs")]: {
    maxWidth: "180px",
  },
}));

const Overlay = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0,
    transition: "opacity 0.3s ease, transform 0.3s ease",
    transform: "scale(0.95)",
    zIndex: 2,
});

function WorldwideWardrobe() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await instance.get("/categories");
            setData(response?.data?.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const router = useRouter();
    const handleNavigate = (id) => {
        router.push(`/category/${id}`);
    };

    return (
        <Layout>
            <Grid
                container
                spacing={4}
                py={6}
                sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}
            >
                {data?.map((item, index) => (
                    <React.Fragment key={index}>
                        {/* <Grid
              item
              lg={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" color="white">
                {item?.name}
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleNavigate(item?.id)}
              >
                Learn More
              </Button>
            </Grid> */}

                        <Grid item lg={4} sx={{ textAlign: "left" }} >
                            <ImageContainer onClick={() => handleNavigate(item?.id)}>
                                <img
                                    src={item?.image}
                                    alt="category image"
                                />

                                <Overlay className="overlay" />
                            </ImageContainer>
                            <Typography variant="h4" color="white" mt={3} >
                                {item?.name}
                            </Typography>
                        </Grid>
                    </React.Fragment>
                ))}
            </Grid>
        </Layout>
    );
}

export default WorldwideWardrobe;
