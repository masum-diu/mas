import React from "react";
import Layout from "../components/Layout";
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
} from "@mui/material";
import ProgressPaginationSwipersider from "../components/ProgressPaginationSwipersider";
const CustomTextField = styled(TextField)({
  '& input[type="date"]::-webkit-calendar-picker-indicator': {
    filter: "invert(100%) brightness(200%)", // Adjust color to red
  },
});
const Home = () => {
  return (
    <Layout>
      <ProgressPaginationSwiper />
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
        <Grid container spacing={4} py={6}>
          <Grid item lg={6}>
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
              SIMPLE ESSENTIALS, GLOBAL IMPACT
            </Typography>
            {/* <Typography className="Medium" fontSize={60} sx={{ position: 'absolute', left: 187, top: 80, zIndex: 1 }}>
                            MAS
                        </Typography> */}
          </Grid>

          <Grid item lg={6}>
            <Typography
              className="Regular"
              fontSize={18}
              color={"#bbb"}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              MAS is your go-to source for high-quality, basic commodity
              clothing items at an affordable price. We bring simplicity,
              comfort, and durability together, providing essential apparel that
              meets the needs of today’s global market.
            </Typography>

            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ maxWidth: 550 }}
              py={5}
              spacing={2}
            >
              <Stack direction={"column"} spacing={1}>
                <Typography className="Medium" fontSize={28}>
                  Since 2015
                </Typography>
                <Typography className="Regular" fontSize={16} color={"#bbb"}>
                  Delivering quality goods since 2024 inception.
                </Typography>
              </Stack>
              <Stack direction={"column"} spacing={1}>
                <Typography className="Medium" fontSize={28}>
                  600+ Outlets
                </Typography>
                <Typography className="Regular" fontSize={16} color={"#bbb"}>
                  Available for customers across the regions
                </Typography>
              </Stack>
            </Stack>
            {/* <Stack
              direction={"row"}
              spacing={2}
              justifyContent={"space-between"}
              // sx={{ maxWidth: 550 }}
              pb={5}
            >
              */}

            {/* </Stack> */}
            <Link href="/about">
              <Button variant="contained" color="error">
                learn more
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container spacing={4} py={8}>
          <Grid item lg={12}>
            <Typography className="Medium" fontSize={40}>
              WHY CHOOSE MAS
            </Typography>
            <Typography
              className="Regular"
              fontSize={18}
              color={"#bbb"}
              sx={{ display: "flex", flexDirection: "column", pt: 2 }}
            >
              Our product line includes T-Shirts, Polo Shirts, Boxer Shorts,
              Tank Tops/A Shirts, Thermal Wear,
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
              <Typography className="Regular" fontSize={16} color={"#bbb"}>
                Get premium clothing at prices that offer great value
              </Typography>
            </Stack>
          </Grid>

          {/* Premium Comfort */}
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
              <Typography className="Regular" fontSize={16} color={"#bbb"}>
                Discover premium, durable, and meticulously crafted apparel
                built to last, offering unmatched comfort for all-day wear.
              </Typography>
            </Stack>
          </Grid>

          {/* Ongoing Innovation */}
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
              <Typography className="Regular" fontSize={16} color={"#bbb"}>
                By seeing areas for development and reacting to changes in the
                market and consumer demands, we continuously enhance and modify
                our goods to remain competitive and expand.
              </Typography>
            </Stack>
          </Grid>

          {/* Strong Distribution */}
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
              <Typography className="Regular" fontSize={16} color={"#bbb"}>
                Reliable distribution network in national and global reach
                ensures your products are always within arm's reach.
              </Typography>
            </Stack>
          </Grid>

          {/* Ethical Manufacturing */}
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
              <Typography className="Regular" fontSize={16} color={"#bbb"}>
                Committed to responsible practices and sustainability in every
                step.
              </Typography>
            </Stack>
          </Grid>

          {/* Support for New Brands */}
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
              <Typography className="Regular" fontSize={16} color={"#bbb"}>
                Partnering with emerging brands to foster growth and innovation.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2} py={8}>
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
                fontSize={40}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                Team of professionals <span>is waiting for you</span>
              </Typography>

              <Typography
                className="Regular"
                fontSize={18}
                textAlign={"left"}
                color={"#bbb"}
              >
                At MAS, we understand the importance of the basics. That’s why
                we focus on delivering essential clothing items that form the
                foundation of any wardrobe. From T-shirts to Tank Tops, our
                products are designed for comfort, quality, and versatility. As
                a subsidiary of Mishael International Inc., we leverage decades
                of industry experience to bring you the best in basic apparel.
              </Typography>
            </Stack>
          </Grid>

          <Grid item lg={6}>
            <img src="/assets/bam.jpeg" alt="" width={"100%"} />
          </Grid>
        </Grid>

        <Grid container spacing={2} py={8}>
          <Grid item lg={12} xs={12}>
            <Typography
              className="Medium"
              fontSize={40}
              textTransform={"uppercase"}
              mb={3}
            >
              Our Products
            </Typography>
            <ProgressPaginationSwipersider />
          </Grid>
        </Grid>
        <Typography
          className="Medium"
          fontSize={40}
          textTransform={"uppercase"}
          pt={2}
        >
          Let’s talk
        </Typography>
        <Grid container spacing={1} py={3}>
          <Grid item lg={4}>
            <Typography
              className="Regular"
              fontSize={18}
              textTransform={"uppercase"}
              color={"#bbb"}
            >
              If you have any questions, feel free to <br /> email us or reach
              out through our <br /> contact form.
            </Typography>

            <Typography
              className="Medium"
              fontSize={18}
              textTransform={"uppercase"}
              pt={3}
            >
              Email
            </Typography>
            <Typography className="Regular" fontSize={18} color={"#bbb"}>
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
                // label="Standard warning"

                variant="standard"
                className="Light"
                color="primary"
                placeholder="Enter Your Name"
                fullWidth
                focused
                InputProps={{
                  sx: {
                    color: "#ffffff",
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
                // label="Standard warning"
                variant="standard"
                color="primary"
                placeholder="Enter Your Phone"
                fullWidth
                focused
                InputProps={{
                  sx: {
                    color: "#ffffff",
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
                // label="Standard warning"
                variant="standard"
                color="primary"
                placeholder="Enter Your Email"
                fullWidth
                focused
                InputProps={{
                  sx: {
                    color: "#ffffff",
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
                variant="standard"
                color="primary"
                placeholder="Enter Your Date"
                fullWidth
                type="date"
                focused
                InputProps={{
                  sx: {
                    color: "#ffffff",
                    fontSize: 18, // Sets the text color to white
                  },
                }}
              />
            </Stack>
          </Grid>
          <Grid item lg={4} xs={12}>
            {/* <Stack direction={"column"} spacing={1}>
                            <Typography className="Medium" fontSize={16} textTransform={"uppercase"}  >
                                Email *
                            </Typography>
                            <TextField
                                // label="Standard warning"
                                variant="standard"
                                color="primary"
                                placeholder="Enter Your Email"
                                multiline
                                rows={4}
                                fullWidth
                                focused
                                InputProps={{
                                    sx: {
                                        color: '#ffffff',
                                    },
                                }}
                            />
                        </Stack> */}
          </Grid>
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
                // label="Standard warning"
                variant="standard"
                color="primary"
                placeholder="Enter Your Message"
                multiline
                rows={4}
                fullWidth
                focused
                InputProps={{
                  sx: {
                    color: "#ffffff",
                    fontSize: 18,
                  },
                }}
              />
              <Button variant="contained" color="error" sx={{ maxWidth: 87 }}>
                submit
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Home;
