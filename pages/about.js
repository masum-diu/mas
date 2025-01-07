import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Typography from "@mui/material/Typography";
import { Box, Grid, Stack } from "@mui/material";
import instance from '../pages/api/api_instance';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const res = await instance.get("/get-about-story"); // Use your API instance or axios directly
      setAboutData(res?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
        <Grid container spacing={2} py={6}>
          <Grid item lg={6}>
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              direction={"column"}
              sx={{ position: "relative" }}
            >
              <Typography
                className="Medium"
                fontSize={40}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  zIndex: 2,
                  position: "relative",
                }}
              >
                {aboutData?.title}
              </Typography>
            </Stack>
          </Grid>
      
          </Grid>
      
        <Grid container spacing={2} py={6}>
          <Grid item lg={5} sx={{ display: "flex", gap: 1, pt: 4 }}>
            <img
              src={aboutData?.img_path+'/'+aboutData?.feature_image}
              alt="About Image"
              style={{ width: "100%", height: "100%" }}
            />
          </Grid>
          <Grid item lg={7} sx={{ display: "flex", gap: 1, pt: 4 }}>
            <Typography className="Regular" fontSize={16} color={"#bbb"}>
            <div dangerouslySetInnerHTML={{ __html: aboutData?.description }} />
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default About;
