import React from "react";
import Layout from "../components/Layout";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid, Stack, styled, TextField } from "@mui/material";
const privacy = () => {
    return (
      <Layout>
        <Box sx={{ width: "70%", maxWidth: "1500px", margin: "0 auto" }}>
        <Grid container spacing={2} py={6} >
        <Grid item lg={12}>
            <Stack alignItems={"center"} justifyContent={"center"} direction={"column"} sx={{ position: "relative", top:"10px" }}>
                <Typography className="Medium" fontSize={18} sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative",bottom:"50px" }}>
                Privacy Policy
                </Typography>
                </Stack>
              
                <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative"}}>
                This Privacy Policy applies to our website, and its associated subdomains (collectively, our “Service”) alongside our application, MAS. By accessing or using our Service, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy and our Terms of Service.                </Typography>

                <Typography className="Medium" fontSize={18}  sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative" }}>
                Definitions and key terms                </Typography>
                <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", }}>

               Cookie: small amount of data generated by a website and saved by your web browser. It is used to identify your browser, provide analytics, remember information about you such as your language preference or login information.</Typography>
               <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", }}>Company: when this policy mentions “Company,” “we,” “us,” or “our,” it refers to MAS, that is responsible for your information under this Privacy Policy.</Typography>
               <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", }}>Country: where MAS or the owners/founders of MAS are based, in this case is Bangladesh</Typography>
               <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", }}>Customer: refers to the company, organization or person that signs up to use the MAS Service to manage the relationships with your consumers or service users.</Typography>
               <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", }}>Device: any internet connected device such as a phone, tablet, computer or any other device that can be used to visit MAS and use the services.</Typography>
               <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", }}>IP address: Every device connected to the Internet is assigned a number known as an Internet protocol (IP) address. These numbers are usually assigned in geographic blocks. An IP address can often be used to identify the location from which a device is connecting to the Internet.</Typography>
               <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", }}>Personnel: refers to those individuals who are employed by MAS or are under contract to perform a service on behalf of one of the parties.</Typography>
               <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", }}>Third-party service: refers to advertisers, contest sponsors, promotional and marketing partners, and others who provide our content or whose products or services we think may interest you.</Typography>
               <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", }}>You: a person or entity that is registered with MAS to use the Services.</Typography>
               <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", }}>Personnel: refers to those individuals who are employed by MAS or are under contract to perform a service on behalf of one of the parties.</Typography>
               <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", }}>Third-party service: refers to advertisers, contest sponsors, promotional and marketing partners, and others who provide our content or whose products or services we think may interest you.</Typography>
               <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", }}>You: a person or entity that is registered with MAS to use the Services.</Typography>
       
            </Grid>
        </Grid>
        </Box>
        </Layout>
      );
    };
    
    export default privacy;
    