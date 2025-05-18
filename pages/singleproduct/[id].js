import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import ThumbsLoopGallery from "../../components/ThumbsLoopGallery";
import {
  Box,
  Button,
  Grid,
  Stack,
  Radio,
  RadioGroup,
  FormControl,
  Select,
  MenuItem,
  CardMedia,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Layout from "../../components/Layout";
import instance from "../api/api_instance";
import Link from "next/link";
import { useCart } from "../../src/context/CartContext"; // Import CartContext

import { useRouter } from "next/router";

const SingleProduct = () => {
  const router = useRouter();
  const { id } = router?.query;
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [selectedSize, setSelectedSize] = useState(""); // State to track selected size

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProduct] = useState(null);
  const [tags, setTags] = useState([]); // State to store tags
  const [activeTab, setActiveTab] = useState(0); // State to track the active tab
  const [selectedColorName, setSelectedColorName] = useState(""); // State to store selected color name
  const [sizeGuide, setSizeGuide] = useState([]);
  const [openSizeGuide, setOpenSizeGuide] = useState(false);
  const handleOpenSizeGuide = () => setOpenSizeGuide(true);
  const handleCloseSizeGuide = () => setOpenSizeGuide(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    // Find the selected size object to get its id
    const selectedSizeObj = products?.availability.find(
      (item) =>
        item.color?.id === selectedColorId && item.size?.name === selectedSize
    );

    const cartData = {
      id: products?.id,
      name: products?.name,
      price: products?.price,
      color: selectedColorName,
      size: selectedSize,
      images: products?.product_images?.map((img) => img.image),
      link: router.asPath,
    };

    addToCart(cartData);

    try {
      await instance.post("https://msb.etherstaging.xyz/api/cart/add", {
        product_id: products?.id,
        color_id: selectedColorId,
        size_id: selectedSizeObj?.size?.id,
        quantity: 1,
      });
      // Optionally show a success message or redirect
      // router.push("/cart");
    } catch (error) {
      console.error("Failed to add to backend cart:", error);
    }
  };

  const fetchProductData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await instance.get(`/product/${id}`);
      const productData = res?.data?.data;

      // Set product details
      setProduct(productData);

      // Set tags
      if (productData?.tags) {
        setTags(productData.tags);
      }

      // Set default selected color
      if (productData?.product_images?.length > 0) {
        setSelectedValue(productData.product_images[0].color.id);
      }

      // ✅ Set size guide from API
      if (productData?.size_guide) {
        setSizeGuide(productData.size_guide);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "Something went wrong.");
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductData();
    }
  }, [id]);

  const imageArray = products?.product_images || [];
  const handleChange = (color_id) => {
    setSelectedValue(color_id);
    setSelectedColorId(color_id);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const uniqueColors = [
    ...new Map(
      products?.product_images?.map((img) => [img.color?.id, img])
    ).values(),
  ];

  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
        <Grid container py={6} spacing={0}>
          <Grid item lg={6} sm={4} xs={12}>
            <ThumbsLoopGallery
              images={imageArray}
              selectedColorId={selectedValue}
              setSelectedColorId={setSelectedValue}
            />
          </Grid>

          <Grid item lg={6} sm={4}>
            <Stack direction={"column"} spacing={1}>
              <Typography
                className="Medium"
                fontSize={28}
                textTransform={"uppercase"}
              >
                {products?.name}
              </Typography>

              <Typography className="Regular" fontSize={18}>
                Color:{" "}
                {selectedColorName || products?.availability[0]?.color?.name}
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="options"
                  name="radio-buttons-group"
                  value={selectedValue}
                  onChange={handleChange}
                >
                  <Box
                    display="grid"
                    gridTemplateColumns={{
                      xs: "repeat(3, 1fr)", // 2 columns on extra-small (mobile)
                      sm: "repeat(3, 1fr)", // 3 columns on small screens
                      md: "repeat(4, 1fr)", // 4 columns on medium screens
                      lg: "repeat(6, 1fr)", // 6 columns on large screens
                    }}
                    gap={1}
                  >
                    {uniqueColors.map((v, i) => (
                      <Grid
                        key={i}
                        onClick={() => {
                          setSelectedColorId(v.color?.id);
                          setSelectedValue(v.color?.id);
                          setSelectedColorName(v.color?.name);
                        }}
                        sx={{
                          width: "100%",
                          aspectRatio: "1", // Makes the grid square
                          border:
                            selectedValue === v.color?.id
                              ? "3px solid #9A0E20"
                              : "1px solid #ccc",
                          cursor: "pointer",
                          backgroundColor: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={v?.image}
                          alt={`Thumbnail`}
                          sx={{
                            objectFit: "contain",
                            backgroundColor: v.color?.code,
                          }}
                        />
                      </Grid>
                    ))}
                  </Box>
                </RadioGroup>
              </FormControl>
              <Typography className="Regular" fontSize={18}>
                Size:
              </Typography>

              <Select
                size="small"
                value={selectedSize} // Bind the selectedSize state
                onChange={(e) => setSelectedSize(e.target.value)} // Update selectedSize state
                sx={{
                  maxWidth: { lg: "100%", xs: "100%" },
                  color: "inherit",
                  "& .MuiSelect-icon": { color: "inherit" },
                  "&.Mui-focused": { borderColor: "inherit" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "inherit",
                  },
                  "& .MuiMenuItem-root": { color: "inherit" },
                  "&:hover": { backgroundColor: "inherit" },
                }}
              >
                <MenuItem disabled value="">
                  Select Size
                </MenuItem>
                {products?.availability
                  .filter((item) => item.color?.id === selectedColorId) // Filter sizes by selected color
                  .map((v, i) => (
                    <MenuItem key={i} value={v?.size?.name}>
                      {v?.size?.name}
                    </MenuItem>
                  ))}
              </Select>
              <Button
                onClick={handleOpenSizeGuide}
                size="small"
                variant="text"
                sx={{ textTransform: "none", mt: 1 }}
                color="inherit"
              >
                View Size Guide
              </Button>
              <Dialog
                open={openSizeGuide}
                onClose={handleCloseSizeGuide}
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle>Size Guide</DialogTitle>
                <DialogContent>
                  {sizeGuide.length > 0 ? (
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <strong>Size</strong>
                          </TableCell>
                          {products?.name === "Boxer Short" ? (
                            <>
                              <TableCell>
                                <strong>Side Length (cm) </strong>
                              </TableCell>
                              <TableCell>
                                <strong>½ Waist (cm)</strong>
                              </TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell>
                                <strong>Chest (cm)</strong>
                              </TableCell>
                              <TableCell>
                                <strong>Body Length (cm)</strong>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sizeGuide.map((guide, index) => (
                          <TableRow key={index}>
                            <TableCell>{guide.name}</TableCell>
                            {products?.name === "Boxer Short" ? (
                              <>
                                <TableCell>{guide.chest}</TableCell>
                                <TableCell>{guide.body}</TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell>{guide.chest}</TableCell>
                                <TableCell>{guide.body}</TableCell>
                              </>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <Typography>No size guide available.</Typography>
                  )}
                </DialogContent>
              </Dialog>

              {Number(products?.category_id) === 1 && (
                <Link href="/contactus">
                  <Button variant="contained" color="error" className="Medium">
                    Contact Us
                  </Button>
                </Link>
              )}
              {Number(products?.category_id) === 2 && (
                <>
                  <Typography className="Regular" fontSize={20}>
                    Price: {products?.price} USD
                  </Typography>

                  <Button
                    variant="contained"
                    color="error"
                    className="Medium"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </>
              )}

              {/* Tags Section */}
              <Box sx={{ mt: 4 }}>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  textColor="inherit"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {tags.map((tag, index) => (
                    <Tab key={index} label={tag.name} />
                  ))}
                </Tabs>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    className="Regular"
                    dangerouslySetInnerHTML={{
                      __html: tags[activeTab]?.description || "",
                    }}
                  />
                </Box>
              </Box>
              <Typography className="Regular" fontSize={18} color={"inherit"}>
                Specifications
              </Typography>
            </Stack>
            <Grid container py={2} spacing={4}>
              <Grid item lg={6} sm={12} xs={12}>
                <Typography className="Regular" fontSize={18}>
                  Fit
                </Typography>
                <Typography className="Regular" fontSize={16}>
                  {products?.fit}
                </Typography>
              </Grid>

              <Grid item lg={6} sm={12} xs={12}>
                <Typography className="Regular" fontSize={18}>
                  Care
                </Typography>
                <Typography className="Regular" fontSize={16}>
                  {products?.care}
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
