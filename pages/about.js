import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Typography from "@mui/material/Typography";
import { Box, Grid, Stack } from "@mui/material";
import instance from "../pages/api/api_instance";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const res = await instance.get("/about/1"); // Use your API instance
      setAboutData(res?.data?.data);
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
      <Box
        sx={{
          width: "90%",
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        <Grid container spacing={1} py={2}>
          <Grid item lg={12}>
            <Typography className="Medium" fontSize={{ xs: 33, md: 36 }} textAlign={"justify"}>
              {aboutData?.title}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} >
          {/* <Grid item lg={5} sx={{ display: "flex", gap: 1, pt: 4 }}>
            <img
              src={"/assets/1744545144_67fba578d2642.jpg"}
              alt="About Image"
              style={{ width: "100%", height: "100%" }}
            />
          </Grid> */}
          <Grid item lg={12} sx={{ display: "flex", gap: 1, pt: 4 }}>
            <Typography className="Regular" fontSize={18} textAlign={"justify"}>
              <div
                dangerouslySetInnerHTML={{ __html: aboutData?.description }}
              />
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default About;
