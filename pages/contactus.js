import React from "react";
import Layout from "../components/Layout";
import Typography from "@mui/material/Typography";
import ProgressPaginationSwiper from "../components/ProgressPaginationSwiper";
import { Box, Button, Grid, Stack, styled, TextField } from "@mui/material";
import ProgressPaginationSwipersider from "../components/ProgressPaginationSwipersider";
const CustomTextField = styled(TextField)({
  '& input[type="date"]::-webkit-calendar-picker-indicator': {
    filter: "invert(100%) brightness(200%)", // Adjust color to red
  },
});
const contactus = () => {
  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
        <Typography
          className="Medium"
          fontSize={40}
          textTransform={"uppercase"}
          pt={5}
        >
          Let’s talk
        </Typography>
        <Grid container spacing={1} py={3}>
          <Grid item lg={4}>
            <Typography
              className="Regular"
              fontSize={16}
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
          <Grid item lg={4} xs={12}>
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
            <Stack direction={"column"} spacing={1} pt={4}>
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
            <Stack direction={"column"} spacing={1} pt={4}>
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

export default contactus;
