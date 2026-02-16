import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import axios from "axios";
import Typography from "@mui/material/Typography";
import ProgressPaginationSwiper from "../components/ProgressPaginationSwiper";
import {
  Box,
  Button,
  Grid,
  Link,
  Stack,
  styled,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import ProgressPaginationSwipersider from "../components/ProgressPaginationSwipersider";
import instance from "./api/api_instance";

const CustomTextField = styled(TextField)({
  '& input[type="date"]::-webkit-calendar-picker-indicator': {
    filter: "invert(100%) brightness(200%)", // Adjust color to red
  },
});

const ImageContainer = styled(Box)({
  position: "relative",
  overflow: "hidden", // Ensure content stays within bounds
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)", // Always show shadow
  "& img": {
    transition: "opacity 0.3s ease, transform 0.3s ease", // Smooth transition for image
  },
  "&:hover img": {
    opacity: 0.5, // Dim the image on hover
    transform: "scale(1.05)", // Optional: Slight zoom effect
  },
  "&:hover .overlay": {
    opacity: 1, // Show overlay on hover
    transform: "scale(1)", // Scale back to normal size
  },
});

const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Default background
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0, // Initially hidden
  transition: "opacity 0.3s ease, transform 0.3s ease", // Smooth transition
  transform: "scale(0.95)", // Slightly shrink initially
});

const Home = () => {
  const [data, setData] = useState([]);
  const [datasectionthree, setDatasectionthree] = useState([]);
  const [datasectionOne, setDatasectionOne] = useState([]);
  const [sectionTitle, setSectionTitle] = useState(""); // State to store the title
  const [loading, setLoading] = useState(false); // State to track loading
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    appointmentDate: "",
  });
  console.log(datasectionOne, "datasectionOne")
  const [formLoading, setFormLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/categories");

      setData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataSectionOne = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/section-one");
      setDatasectionOne(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataSectionthree = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/section-three");

      setDatasectionthree(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataSectionthree();
    fetchDataSectionOne();
  }, []);
  const fetchSectionTitle = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://tst.etherstaging.xyz/api/section-one/1"
      );
      setSectionTitle(response?.data?.title || ""); // Update the title from the API response
      setLoading(false);
    } catch (error) {
      console.error("Error fetching section title:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSectionTitle(); // Fetch the title when the component mounts
  }, []);
  const router = useRouter();

  const handleNavigate = (id) => {
    router.push(`/category/${id}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      // Try the Resend API
      const response = await fetch("/api/contact-resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSnackbar({
          open: true,
          message: result.message,
          severity: "success",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          appointmentDate: "",
        });
      } else {
        setSnackbar({
          open: true,
          message: result.message || "Failed to send message",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Network error. Please try again.",
        severity: "error",
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Layout>
      {/* <ProgressPaginationSwiper /> */}
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
        {/* <Grid container spacing={4} py={6}>
          {data?.map((item, index) => (
            <React.Fragment key={index}>
              <Grid
                item
                lg={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  verticalAlign: "center",
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
              </Grid>
              <Grid item lg={4}>
                <ImageContainer
                  onClick={() => handleNavigate(item?.id)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={item?.image} alt="category image" width="100%" />
                  <Overlay className="overlay" />
                </ImageContainer>
              </Grid>
            </React.Fragment>
          ))}
        </Grid> */}



        {/* <Grid container spacing={4} py={8}>
          <Grid item lg={12}>
            <Typography className="Medium" fontSize={40}>
              WHY CHOOSE MAS
            </Typography>
            <Typography
              textAlign={"justify"}
              className="Regular"
              fontSize={18}
              sx={{ display: "flex", flexDirection: "column", pt: 2 }}
            >
              Our product line includes T-Shirts, Polo Shirts, Boxer Shorts,
              Tank Tops, A Shirts, Thermal Wear,
              <span>
                Hoodies, Sweat Shirts/Pants, Socks and Caps will be under both
                “MAS” label and tear up label.
              </span>
            </Typography>
          </Grid>
          <Grid
            item
            lg={4}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", lg: "row" },
              alignItems: "flex-start",
              textAlign: "left",
              gap: 1,
              pt: 4,
            }}
          >
            <img
              src="/assets/competitive.png"
              alt=""
              width={25}
              height={25}
              style={{
                marginTop: 5,
                marginBottom: { xs: 8, sm: 8, lg: 0 },
              }}
            />
            <Stack direction={"column"} spacing={1}>
              <Typography
                className="Medium"
                fontSize={28}
                textTransform={"uppercase"}
              >
                Competitive pricing
              </Typography>
              <Typography className="Regular" fontSize={16}>
                Get premium clothing at prices that offer great value.
              </Typography>
            </Stack>
          </Grid>

          <Grid
            item
            lg={4}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", lg: "row" },
              alignItems: "flex-start",
              textAlign: "justify",

              gap: 1,
              pt: 4,
            }}
          >
            <img
              src="/assets/Vector (5).png"
              alt=""
              width={25}
              height={25}
              style={{
                marginTop: 8,
                marginBottom: { xs: 8, sm: 8, lg: 0 },
              }}
            />
            <Stack direction={"column"} spacing={1}>
              <Typography
                className="Medium"
                fontSize={28}
                textTransform={"uppercase"}
              >
                Premium Comfort
              </Typography>
              <Typography className="Regular" fontSize={16}>
                Discover premium, durable, and meticulously crafted apparel
                built to last, offering unmatched comfort for all-day wear.
              </Typography>
            </Stack>
          </Grid>

       
          <Grid
            item
            lg={4}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", lg: "row" },
              alignItems: "flex-start",
              textAlign: "justify",
              gap: 1,
              pt: 4,
            }}
          >
            <img
              src="/assets/SVG.png"
              alt=""
              width={25}
              height={25}
              style={{
                marginTop: 5,
                marginBottom: { xs: 8, sm: 8, lg: 0 },
              }}
            />
            <Stack direction={"column"} spacing={1}>
              <Typography
                className="Medium"
                fontSize={28}
                textTransform={"uppercase"}
              >
                Ongoing Innovation
              </Typography>
              <Typography className="Regular" fontSize={16}>
                By seeing areas for development and reacting to changes in the
                market and consumer demands, we continuously enhance and modify
                our goods to remain competitive and expand.
              </Typography>
            </Stack>
          </Grid>

          <Grid
            item
            lg={4}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", lg: "row" },
              alignItems: "flex-start",
              textAlign: "justify",
              gap: 1,
              pt: 4,
            }}
          >
            <img
              src="/assets/SVGst.png"
              alt=""
              width={25}
              height={25}
              style={{
                marginTop: 5,
                marginBottom: { xs: 8, sm: 8, lg: 0 },
              }}
            />
            <Stack direction={"column"} spacing={1}>
              <Typography
                className="Medium"
                fontSize={28}
                textTransform={"uppercase"}
              >
                Strong Distribution
              </Typography>
              <Typography className="Regular" fontSize={16}>
                Reliable distribution network in national and global reach
                ensures your products are always within arm's reach.
              </Typography>
            </Stack>
          </Grid>

         
          <Grid
            item
            lg={4}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", lg: "row" },
              alignItems: "flex-start",
              textAlign: "justify",
              gap: 1,
              pt: 4,
            }}
          >
            <img
              src="/assets/value-chain.png"
              alt=""
              width={25}
              height={25}
              style={{
                marginTop: 7,
                marginBottom: { xs: 8, sm: 8, lg: 0 },
              }}
            />
            <Stack direction={"column"} spacing={1}>
              <Typography
                className="Medium"
                fontSize={28}
                textTransform={"uppercase"}
              >
                Ethical Manufacturing
              </Typography>
              <Typography className="Regular" fontSize={16}>
                Committed to responsible practices and sustainability in every
                step.
              </Typography>
            </Stack>
          </Grid>

          <Grid
            item
            lg={4}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", lg: "row" },
              alignItems: "flex-start",
              textAlign: "justify",
              gap: 1,
              pt: 4,
            }}
          >
            <img
              src="/assets/support(2).png"
              alt=""
              width={25}
              height={25}
              style={{
                marginTop: 7,
                marginBottom: { xs: 8, sm: 8, lg: 0 },
              }}
            />
            <Stack direction={"column"} spacing={1}>
              <Typography
                className="Medium"
                fontSize={28}
                textTransform={"uppercase"}
              >
                Support for New Brands
              </Typography>
              <Typography className="Regular" fontSize={16}>
                Partnering with emerging brands to foster growth and innovation.
              </Typography>
            </Stack>
          </Grid>
        </Grid> */}
        <Grid container spacing={4} pt={8} >
          <Grid sx={{backgroundColor: 'black'}} item lg={6}>
            <img src={datasectionthree[0]?.image} alt="" width={"100%"} style={{ borderRadius: 20 }} />
            <Typography
            sx={{fontWeight: 600, }}
              className=""
              fontSize={24}
              mt={2}
              textAlign={"center"}

            >
              {datasectionOne[0]?.title}
            </Typography>
          </Grid>
          <Grid item lg={6}>
            <Stack
              alignItems={"left"}
              justifyContent={"left"}
              direction={"column"}
              spacing={2}
            >
              <Typography
                className="Medium"
                textTransform={"uppercase"}
                fontSize={22}
                textAlign={"justify"}

              >
                {datasectionthree[0]?.title}
              </Typography>

              <Typography
                className="Regular"
                fontSize={18}
                textAlign={"justify"}
                dangerouslySetInnerHTML={{ __html: datasectionthree[0]?.description }}
              >

              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={4} pb={8} pt={2}>
          <Grid item lg={6}>
            <Typography
            sx={{fontWeight: 600, color: "transparent"}}
              className=""
              fontSize={24}
              mt={2}
              textAlign={"center"}

            >
              {datasectionOne[0]?.title}
            </Typography>
          </Grid>

          <Grid item lg={6}>
            <Typography
              textAlign={"justify"}
              className="Regular"
              fontSize={18}
              sx={{ display: "flex", flexDirection: "column" }}
              dangerouslySetInnerHTML={{ __html: datasectionOne[0]?.description }}
            >
            </Typography>

            {/* <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ maxWidth: 550 }}
              py={5}
              spacing={2}
              textAlign={"justify"}
            >
              <Stack direction={"column"} spacing={1}>
                <Typography className="Medium" fontSize={28}>
                  Since 2024
                </Typography>
                <Typography className="Regular" fontSize={16}>
                  Delivering quality goods since 2024 inception.
                </Typography>
              </Stack>
              <Stack direction={"column"} spacing={1}>
                <Typography className="Medium" fontSize={28}>
                  600+ Outlets
                </Typography>
                <Typography className="Regular" fontSize={16}>
                  Available for customers across the regions.
                </Typography>
              </Stack>
            </Stack> */}
            <Stack direction={"row"} alignItems={"flex-end"} justifyContent={"flex-start "}>
              <Link href="/worldwide-wardrobe">
                <Button variant="contained" color="error" sx={{ textTransform: "capitalize" }}>
                  Worldwide Wardrobe Wholesale Catalog
                </Button>
              </Link></Stack>
          </Grid>
        </Grid>

        {/* <Typography
          className="Medium"
          fontSize={40}
          textTransform={"uppercase"}
          pt={2}
          py={7}
        >
          Let's talk
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1} py={2}>
            <Grid item lg={4}>
              <Typography
                className="Regular"
                fontSize={18}
                textTransform={"uppercase"}
              >
                If you have any questions, feel free <br />
                to email us or reach out through <br />
                our contact form.
              </Typography>

              <Typography
                className="Medium"
                fontSize={18}
                textTransform={"uppercase"}
                pt={3}
              >
                Email
              </Typography>
              <Typography className="Regular" fontSize={18}>
                Info@masoutfits.com
              </Typography>
            </Grid>

            <Grid item lg={4} xs={12} pt={2}>
              <Stack direction={"column"} spacing={1}>
                <Typography
                  className="Medium"
                  fontSize={18}
                  textTransform={"uppercase"}
                >
                  Name <span style={{ color: "#9A0E20" }}>*</span>
                </Typography>
                <TextField
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  variant="standard"
                  className="Light"
                  color="primary"
                  placeholder="Enter Your Name"
                  fullWidth
                  focused
                  required
                  InputProps={{
                    sx: {
                      color: "#bbb",
                      fontSize: 18,
                    },
                  }}
                />
              </Stack>
              <Stack direction={"column"} spacing={1} pt={2}>
                <Typography
                  className="Medium"
                  fontSize={18}
                  textTransform={"uppercase"}
                >
                  Phone <span style={{ color: "#9A0E20" }}>*</span>
                </Typography>
                <TextField
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  variant="standard"
                  color="primary"
                  placeholder="Enter Your Phone"
                  fullWidth
                  focused
                  required
                  InputProps={{
                    sx: {
                      color: "#bbb",
                      fontSize: 18,
                    },
                  }}
                />
              </Stack>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Stack direction={"column"} spacing={1}>
                <Typography
                  className="Medium"
                  fontSize={18}
                  textTransform={"uppercase"}
                >
                  Email <span style={{ color: "#9A0E20" }}>*</span>
                </Typography>
                <TextField
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="standard"
                  color="primary"
                  placeholder="Enter Your Email"
                  fullWidth
                  focused
                  required
                  type="email"
                  InputProps={{
                    sx: {
                      color: "#bbb",
                      fontSize: 18,
                    },
                  }}
                />
              </Stack>
              <Stack direction={"column"} spacing={1} pt={2}>
                <Typography
                  className="Medium"
                  fontSize={18}
                  textTransform={"uppercase"}
                >
                  Choose an appointment date
                </Typography>
                <CustomTextField
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                  variant="standard"
                  color="primary"
                  placeholder="Enter Your Date"
                  fullWidth
                  type="date"
                  focused
                  InputProps={{
                    sx: {
                      color: "#bbb",
                      fontSize: 18,
                    },
                  }}
                />
              </Stack>
            </Grid>
            <Grid item lg={4} xs={12}></Grid>
            <Grid item lg={8} xs={12}>
              <Stack direction={"column"} spacing={1}>
                <Typography
                  className="Medium"
                  fontSize={18}
                  textTransform={"uppercase"}
                >
                  Message
                </Typography>
                <TextField
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  variant="standard"
                  color="primary"
                  placeholder="Enter Your Message"
                  multiline
                  rows={4}
                  fullWidth
                  focused
                  InputProps={{
                    sx: {
                      color: "#bbb",
                      fontSize: 18,
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  sx={{ maxWidth: 87 }}
                  disabled={formLoading}
                >
                  {formLoading ? "Sending..." : "Submit"}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form> */}
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default Home;
