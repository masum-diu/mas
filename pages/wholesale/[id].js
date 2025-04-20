import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import ThumbsLoopGallery from "../../components/ThumbsLoopGallery";
import {
  Box,
  Button,
  Grid,
  Stack,
  Select,
  MenuItem,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Layout from "../../components/Layout";
import instance from "../api/api_instance";
import Link from "next/link";
import { useRouter } from "next/router";

const SingleProduct = () => {
  const router = useRouter();
  const [openSizeGuide, setOpenSizeGuide] = useState(false);
  const { id } = router.query; // Get dynamic route parameter (id)
  const [selectedValue, setSelectedValue] = useState("option1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProduct] = useState(null);
  const [isClient, setIsClient] = useState(false); // Flag to indicate client-side render

  const fetchProductData = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state
      const res = await instance.get(`/product-by/${id}`);
      const productData = res?.data?.data;
      setProduct(productData);

      if (productData?.p_colours?.length > 0) {
        setSelectedValue(productData.p_colours[0].color_name);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "Something went wrong.");
      console.error(
        "Error fetching product data:",
        error.response || error.message
      );
    }
  };

  useEffect(() => {
    if (router.isReady && id) {
      setIsClient(true); // Mark as client-side render
      fetchProductData();
    }
  }, [id, router.isReady]); // Only run when id or router is ready

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  if (!isClient) return null; // Ensure we wait until client-side rendering

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  const handleOpenSizeGuide = () => {
    setOpenSizeGuide(true); // Open Size Guide popup
  };

  const handleCloseSizeGuide = () => {
    setOpenSizeGuide(false); // Close Size Guide popup
  };
  const decodedHtml = products?.size_guide
    ?.replace(/&lt;/g, '<')
    ?.replace(/&gt;/g, '>')
    ?.replace(/&quot;/g, '"');

  const imageArray = [products?.feature_image].filter(Boolean);
  const link = products?.img_path;

  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
        <Grid container py={6} spacing={0}>
          <Grid item lg={6} sm={4} xs={12}>
            <ThumbsLoopGallery data={imageArray} link={link} />
          </Grid>

          <Grid item lg={6} sm={4}>
            <Stack direction={"column"} spacing={1}>
              <Typography
                className="Medium"
                fontSize={28}
                textTransform={"uppercase"}
              >
                {products?.p_name}
              </Typography>
              <Typography className="Regular" fontSize={18}>
                Color:
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="options"
                  name="radio-buttons-group"
                  value={selectedValue}
                  onChange={handleChange}
                >
                  <Stack direction="row" spacing={1}>
                    {products?.p_colours.map((v, i) => (
                      <FormControlLabel
                        key={i}
                        value={v.color_name}
                        control={
                          <Radio
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              backgroundColor: v.color_code, // Filled color
                              padding: 0,
                              "& .MuiSvgIcon-root": { display: "none" }, // Hide default radio circle
                              "&.Mui-checked": {
                                backgroundColor: v.color_code,
                              },
                            }}
                          />
                        }
                      />
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>

              <Typography className="Regular" fontSize={18}>
                Size:
              </Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                value={selectedValue}
                onChange={handleChange}
              >
                <MenuItem disabled value={10}>
                  View Size
                </MenuItem>
                {products?.p_sizes.map((v, i) => (
                  <MenuItem key={i} value={v?.size_name}>
                    {v?.size_name}
                  </MenuItem>
                ))}
              </Select>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 1,
                }}
              >
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleOpenSizeGuide}
                >
                  Size Guide
                </Button>
              </Box>
              <Dialog
                open={openSizeGuide}
                onClose={handleCloseSizeGuide}
                maxWidth="lg"

              >
                <DialogTitle>Size Guide</DialogTitle>
                <DialogContent>
                  <Typography variant="body1" mb={2}>
                    All Style Measurements in CM
                  </Typography>
                  <Stack width={"100%"}>
                    <div dangerouslySetInnerHTML={{ __html: decodedHtml }} /></Stack>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseSizeGuide} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>

              <Link href={"/contactus"}>
                <Button variant="contained" color="error" className="Medium">
                  Contact Us
                </Button>
              </Link>

              <Typography className="Regular">
                <span
                  dangerouslySetInnerHTML={{
                    __html: products?.psh_raw_description,
                  }}
                />
              </Typography>

              <Typography className="Regular">
                <span
                  dangerouslySetInnerHTML={{
                    __html: products?.p_raw_description,
                  }}
                />
              </Typography>
            </Stack>

            {/* Specifications Section */}
            <Typography
              className="Regular"
              fontSize={18}
              color={"inherit"}
              mt={4}
            >
              Specifications
            </Typography>
            <Grid container py={2} spacing={4}>
              <Grid item xs={6}>
                <Typography className="Medium" fontSize={16}>
                  Material
                </Typography>
                <Typography className="Regular" fontSize={14}>
                  100% Organic Cotton
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className="Medium" fontSize={16}>
                  Weight
                </Typography>
                <Typography className="Regular" fontSize={14}>
                  180 GSM (Medium Weight)
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className="Medium" fontSize={16}>
                  Fit
                </Typography>
                <Typography className="Regular" fontSize={14}>
                  Regular Fit
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className="Medium" fontSize={16}>
                  Care
                </Typography>
                <Typography className="Regular" fontSize={14}>
                  Machine wash cold, tumble dry low
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default SingleProduct;
