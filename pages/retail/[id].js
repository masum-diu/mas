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
import instance from "../api/api_instance";
import { useRouter } from "next/router";
import { useCart } from "../../src/context/CartContext"; // Import CartContext
import staticData from "../../public/data/static_product_data.json";
import sizeGuideData from "../../public/data/sizeGuideData.json";
import catData from "../../public/data/static_category_list"; // Import category data

const SingleProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  const { addToCart } = useCart(); // Access addToCart from CartContext
  const [product, setProduct] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSizeGuide, setOpenSizeGuide] = useState(false); // State for Size Guide popup
  // console.log(product, "router");
  const products = router.isReady
    ? staticData?.find((item) => parseInt(item.id) === parseInt(id)) // Ensure id is parsed correctly
    : {};
  // console.log(product, "res");
  const handleChangeSelect = (event) => {
    setAge(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const imageArray = [product?.feature_image].filter(Boolean);
  const link = product?.img_path;

  const handleAddToCart = () => {
    const cartData = {
      id: product?.id,
      name: product?.p_name,
      price: product?.p_price,
      color: selectedValue,
      size: age,
      images: imageArray,
      link: link,
    };
    addToCart(cartData); // Call addToCart from CartContext
  };

  const handleOpenSizeGuide = () => {
    setOpenSizeGuide(true); // Open Size Guide popup
  };

  const handleCloseSizeGuide = () => {
    setOpenSizeGuide(false); // Close Size Guide popup
  };
  const getFilteredSizeGuide = () => {
    return sizeGuideData.sizeGuide.filter((item) => {
      // console.log("Item in size guide:", item); // Log the item
      // console.log("Product name:", products?.p_name); // Log the product name
      // return name?.toLowerCase().includes(item.style.toLowerCase());
    });
  };

  const fatchingData = async () => {
    try {
      const res = await instance.get(`/product-by/${id}`);
      setProduct(res?.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fatchingData();
  }, [id]);

  // console.log(imageArray, "imageArray");
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
        <Grid container py={6} spacing={0}>
          <Grid item lg={6} sm={4} xs={12}>
            <ThumbsLoopGallery data={imageArray} link={link} id={id} />
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
                  aria-label="options"
                  name="radio-buttons-group"
                  value={selectedValue}
                  onChange={handleChange}
                >
                  <Stack direction="row" spacing={1}>
                    {product?.p_colours?.map((v, i) => (
                      <FormControlLabel
                        key={i}
                        value={v.color_name}
                        control={
                          <Radio
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              backgroundColor: v.color_code,
                              padding: 0,
                              "& .MuiSvgIcon-root": { display: "none" },
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
                value={age}
                onChange={handleChangeSelect}
                sx={{
                  maxWidth: { lg: "100%", xs: "100%" },
                  color: "inherit", // Inherit text color
                  "& .MuiSelect-icon": {
                    color: "inherit", // Inherit icon color
                  },
                  "&.Mui-focused": {
                    borderColor: "inherit", // Inherit border color on focus
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "inherit", // Inherit border color
                  },
                  "& .MuiMenuItem-root": {
                    color: "inherit", // Inherit menu item color
                  },
                  "&:hover": {
                    backgroundColor: "inherit", // Inherit background color on hover
                  },
                }}
              >
                <MenuItem disabled value={10}>
                  View Size
                </MenuItem>
                {product?.p_sizes?.map((v, i) => (
                  <MenuItem key={i} value={v?.size_name}>
                    {v?.size_name}
                  </MenuItem>
                ))}
              </Select>

              {/* Size Guide Button */}
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

              {/* Size Guide Dialog */}
              <Dialog
                open={openSizeGuide}
                onClose={handleCloseSizeGuide}
                maxWidth="lg"
                fullWidth
              >
                <DialogTitle>Size Guide</DialogTitle>
                <DialogContent>
                  <Typography variant="body1" mb={2}>
                    All Style Measurements in CM
                  </Typography>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Style
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Description
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          S
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          M
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          L
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          XL
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          1XL
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          2XL
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          3XL
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          4XL
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          5XL
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          6XL
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredSizeGuide().length > 0 ? (
                        getFilteredSizeGuide().map((item, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                border: "1px solid #ddd",
                                padding: "8px",
                              }}
                            >
                              {name}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ddd",
                                padding: "8px",
                              }}
                            >
                              {item.description}
                            </td>
                            {Object.keys(item.sizes).map((sizeKey) => (
                              <td
                                key={sizeKey}
                                style={{
                                  border: "1px solid #ddd",
                                  padding: "8px",
                                }}
                              >
                                {item.sizes[sizeKey]}
                              </td>
                            ))}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="12"
                            style={{ textAlign: "center", padding: "8px" }}
                          >
                            No size guide available for this product.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseSizeGuide} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
              <Stack direction={"row"} spacing={2} py={2}>
                <Typography className="Regular">
                  Price: <span className="Medium">USD {product?.p_price}</span>
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

              <Typography className="Regular">
                <span
                  dangerouslySetInnerHTML={{
                    __html: product?.p_raw_description,
                  }}
                />
              </Typography>
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
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default SingleProduct;
