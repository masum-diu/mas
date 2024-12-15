import React from "react";
import Layout from "../components/Layout";
import Typography from "@mui/material/Typography";
import ThumbsLoopGallery from "../components/ThumbsLoopGallery"
import { Box, Button, Grid, Stack, styled, TextField } from "@mui/material";
const product = () => {
  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
        <Grid container spacing={2} py={8}>
          <Grid item lg={3} sm={6}>
          <img src="/assets/Margin (1).png" alt="" width={"100%"} />
          <Typography className="Medium" fontSize={18} textTransform={"uppercase"}  >
              Multicolor round neck t-shirt
          </Typography>
          <Button variant="contained" color="error"  href="/singleproduct">
          View Details
                </Button>
          </Grid>
          <Grid item lg={3} sm={6}>
          <img src="/assets/Margin.png" alt="" width={"100%"} />
          <Typography className="Medium" fontSize={18} textTransform={"uppercase"}  >
              Hoodies
          </Typography>
          <Button variant="contained" color="error"  href="/singleproduct"
          >
          View Details
                </Button>
          </Grid>
          <Grid item lg={3} sm={6}>
          <img src="/assets/pant.png" alt="" width={"100%"} />
          <Typography className="Medium" fontSize={18} textTransform={"uppercase"} pt={4} >
              Shorts
          </Typography>
          <Button variant="contained" color="error">
          View Details
                </Button>
          </Grid>
          <Grid item lg={3} sm={6}>
          <img src="/assets/tank.jpeg" alt="" width={"100%"}  />
                    <Typography className="Medium" fontSize={18} textTransform={"uppercase"} pt={4} >
                        tank tops
                    </Typography>
                    <Button variant="contained" color="error" >
                    View Details
                </Button>
          </Grid>
          <Grid item lg={3} sm={6}>
          <img src="/assets/ThermalWear.jpeg" alt="" width={"100%"}  />
                    <Typography className="Medium" fontSize={18} textTransform={"uppercase"}  pt={4} >
                    Thermal Wear
                    </Typography>
                    <Button variant="contained" color="error">
                    View Details
                </Button>
          </Grid>
          <Grid item lg={3} sm={6}>
          <img src="/assets/Margin (1).png" alt="" width={"100%"} />
          <Typography className="Medium" fontSize={18} textTransform={"uppercase"}  >
              Multicolor round neck t-shirt
          </Typography>
          <Button variant="contained" color="error">
          View Details
                </Button>
          </Grid>
          <Grid item lg={3} sm={6}>
          <img src="/assets/Margin.png" alt="" width={"100%"} />
          <Typography className="Medium" fontSize={18} textTransform={"uppercase"}  >
              Hoodies
          </Typography>
          <Button variant="contained" color="error">
          View Details
                </Button>
          </Grid>
          <Grid item lg={3} sm={6}>
          <img src="/assets/pant.png" alt="" width={"100%"} />
          <Typography className="Medium" fontSize={18} textTransform={"uppercase"} pt={4} >
              Shorts
          </Typography>
          <Button variant="contained" color="error">
          View Details
                </Button>
          </Grid>
          <Grid item lg={3} sm={6}>
          <img src="/assets/tank.jpeg" alt="" width={"100%"}  />
                    <Typography className="Medium" fontSize={18} textTransform={"uppercase"} pt={4} >
                        tank tops
                    </Typography>
                    <Button variant="contained" color="error" >
                    View Details
                </Button>
          </Grid>
          <Grid item lg={3} sm={6}>
          <img src="/assets/ThermalWear.jpeg" alt="" width={"100%"}  />
                    <Typography className="Medium" fontSize={18} textTransform={"uppercase"}  pt={4} >
                    Thermal Wear
                    </Typography>
                    <Button variant="contained" color="error">
                    View Details
                </Button>
          </Grid>
        </Grid>
      </Box>
      
    </Layout>
 
    
  );
};

export default product;
