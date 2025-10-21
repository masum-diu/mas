import React, { useState } from "react";
import Layout from "../components/Layout";
import Typography from "@mui/material/Typography";
import ProgressPaginationSwiper from "../components/ProgressPaginationSwiper";
import {
  Box,
  Button,
  Grid,
  Stack,
  styled,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import ProgressPaginationSwipersider from "../components/ProgressPaginationSwipersider";
const CustomTextField = styled(TextField)({
  '& input[type="date"]::-webkit-calendar-picker-indicator': {
    filter: "invert(100%) brightness(200%)", // Adjust color to red
  },
});
const contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    appointmentDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create mailto link as fallback
      const subject = `Contact Form Submission from ${formData.name}`;
      const body = `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Appointment Date: ${formData.appointmentDate || "Not specified"}
Message: ${formData.message}`;

      // Try Next.js API first, then PHP, then mailto
      let apiSuccess = false;

      try {
        const response = await fetch("/api/contact", {
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
          apiSuccess = true;
        } else {
          throw new Error(result.message || "API failed");
        }
      } catch (apiError) {
        // Try PHP endpoint as fallback
        try {
          const response = await fetch("/contact-handler.php", {
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
            apiSuccess = true;
          } else {
            throw new Error(result.message || "PHP API failed");
          }
        } catch (phpError) {
          // Fallback to mailto if both APIs fail
          const mailtoLink = `mailto:info@masoutfits.com?subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(body)}`;
          window.open(mailtoLink, "_blank");

          setSnackbar({
            open: true,
            message: "Opening email client. Please send the email manually.",
            severity: "info",
          });
        }
      }

      // Reset form if any method succeeded
      if (apiSuccess) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          appointmentDate: "",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Network error. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

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
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1} py={3}>
            <Grid item lg={4}>
              <Typography
                textAlign={"justify"}
                className="Regular"
                fontSize={16}
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
              <Typography
                className="Regular"
                fontSize={18}
                textAlign={"justify"}
              >
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
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  variant="standard"
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
              <Stack direction={"column"} spacing={1} pt={4}>
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
              <Stack direction={"column"} spacing={1} pt={4}>
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
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Submit"}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
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

export default contactus;
