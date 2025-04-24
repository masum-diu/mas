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
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Layout from "../../components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useCart } from "../../src/context/CartContext";

const SingleProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart(); // Access addToCart from CartContext
  const [product, setProduct] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSizeGuide, setOpenSizeGuide] = useState(false);

  // Fetch product data
  const fetchProductData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://masapi.etherstaging.xyz/api/product-by/${id}`
      );
      const productData = res?.data?.data;
      setProduct(productData);

      // Set default color and images
      if (productData?.p_colours?.length > 0) {
        const defaultColor = productData.p_colours[0];
        setSelectedColor(defaultColor.color_name);
        setSelectedImages(defaultColor.images || []);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to fetch product data.");
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    if (router.isReady && id) {
      fetchProductData();
    }
  }, [id, router.isReady]);

  const handleColorChange = (color) => {
    setSelectedColor(color.color_name);
    setSelectedImages(color.images || []);
  };

  const handleAddToCart = () => {
    const cartData = {
      id: product?.id,
      name: product?.p_name,
      price: product?.price,
      color: selectedColor,
      size: selectedSize,
      images: selectedImages,
    };
    addToCart(cartData); // Add product to cart
  };

  const handleOpenSizeGuide = () => {
    setOpenSizeGuide(true);
  };

  const handleCloseSizeGuide = () => {
    setOpenSizeGuide(false);
  };

  const decodedHtml = product?.size_guide
    ?.replace(/&lt;/g, "<")
    ?.replace(/&gt;/g, ">")
    ?.replace(/&quot;/g, '"');

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
        <Grid container py={6} spacing={0}>
          <Grid item lg={6} sm={4} xs={12}>
            {/* Display images for the selected color */}
            <ThumbsLoopGallery data={selectedImages} />
          </Grid>

          <Grid item lg={6} sm={4}>
            <Stack direction={"column"} spacing={1}>
              <Typography
                className="Medium"
                fontSize={28}
                textTransform={"uppercase"}
              >
                {product?.p_name}
              </Typography>
              <Typography className="Regular" fontSize={18}>
                Color:
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="colors"
                  name="color-buttons-group"
                  value={selectedColor}
                >
                  <Stack direction="row" spacing={1}>
                    {product?.p_colours?.map((color, index) => (
                      <FormControlLabel
                        key={index}
                        value={color.color_name}
                        control={
                          <Radio
                            sx={{
                              border: 1,
                              px: 1,
                              borderColor: "#9A0E20",
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              backgroundColor: color.color_code,
                              padding: 0,
                              "& .MuiSvgIcon-root": { display: "none" },
                              "&.Mui-checked": {
                                backgroundColor: color.color_code,
                              },
                            }}
                            onClick={() => handleColorChange(color)}
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
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                sx={{
                  maxWidth: { lg: "100%", xs: "100%" },
                }}
              >
                <MenuItem disabled value="">
                  Select Size
                </MenuItem>
                {product?.p_sizes?.map((size, index) => (
                  <MenuItem key={index} value={size?.size_name}>
                    {size?.size_name}
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
                    {product?.size_guide ? (
                      <div dangerouslySetInnerHTML={{ __html: decodedHtml }} />
                    ) : (
                      <Typography>No size guide available.</Typography>
                    )}
                  </Stack>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseSizeGuide} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>

              <Stack direction={"row"} spacing={2} py={2}>
                <Typography className="Regular">
                  Price: <span className="Medium">USD {product?.price}</span>
                </Typography>
              </Stack>
              <Button
                variant="contained"
                color="error"
                className="Medium"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Typography className="Regular" style={{ marginTop: "30px" }}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: product?.p_description,
                  }}
                />
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default SingleProduct;
