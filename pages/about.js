import React from "react";
import Layout from "../components/Layout";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid, Stack, styled, TextField } from "@mui/material";
const about = () => {
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
                MAS <span> </span>
              </Typography>
              {/* <Typography className="Medium" fontSize={60} sx={{ position: 'absolute', left: 187, top: 80, zIndex: 1 }}>
            MAS
        </Typography> */}
            </Stack>
          </Grid>
          <Grid item lg={6}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ maxWidth: 450 }}
              py={2}
            >
              <Typography className="Medium" fontSize={28}>
                Since 2015
              </Typography>
              <Typography className="Medium" fontSize={28}>
                600+ Outlets
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent={"space-between"}
              sx={{ maxWidth: 550 }}
              pb={5}
            >
              <Typography className="Regular" fontSize={16} color={"#bbb"}>
                Delivering quality goods since inception.
              </Typography>
              <Typography className="Regular" fontSize={16} color={"#bbb"}>
                Available for customers across the regions
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      {/*<Grid container spacing={2}>
         
          <Grid item lg={12} sx={{ display: "flex", gap: 1, pt: 4 }}>
            <Typography className="Regular" fontSize={16} color={"#bbb"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              illo fugit nemo eum assumenda id qui ea architecto amet libero
              quas laudantium recusandae rerum minus ducimus asperiores, esse
              quaerat vel?Lorem ipsum dolor sit amet, consectetur adipisicing
              elit.
            </Typography>
          </Grid>

       

        </Grid> */}
        <Grid container spacing={2} py={6}>
        <Grid item lg={5} sx={{ display: "flex", gap: 1, pt: 4 }}>
            <img
            src="https://html.merku.love/barbercrop/img/about/about.webp"
            alt=""
            style={{ width: "100%", height: "100%" }}
            />
            </Grid>
            <Grid item lg={7} sx={{ display: "flex", gap: 1, pt: 4 }}>
            <Typography className="Regular" fontSize={16} color={"#bbb"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            illo fugit nemo eum assumenda id qui ea architecto amet libero
            quas laudantium recusandae rerum minus ducimus asperiores, esse
            quaerat vel?Lorem ipsum dolor sit amet, consectetur adipisicing
            elit.
          </Typography>
        
           
          </Grid>
          </Grid>
        

       



      </Box>
    </Layout>
  );
};

export default about;
