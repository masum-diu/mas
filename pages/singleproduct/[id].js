import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import ThumbsLoopGallery from "../../components/ThumbsLoopGallery";
import {
  Box,
  Button,
  Grid,
  Stack,
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
import { useCart } from "../../src/context/CartContext";
import { useRouter } from "next/router";

const SingleProduct = () => {
  const router = useRouter();
  const { id } = router?.query;
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProduct] = useState(null);
  const [tags, setTags] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedColorName, setSelectedColorName] = useState("");
  const [sizeGuide, setSizeGuide] = useState([]);
  const [selectedSizeInfo, setSelectedSizeInfo] = useState(null);
  console.log(products, "selectedSizeInfo");
  const [openSizeGuide, setOpenSizeGuide] = useState(false);
  const handleOpenSizeGuide = () => setOpenSizeGuide(true);
  const handleCloseSizeGuide = () => setOpenSizeGuide(false);
  const { addToCart } = useCart();

  const handleSizeChange = (e) => {
    const selectedSizeId = e.target.value;

    const selected = products?.availability?.find(
      (item) =>
        item.color_id === selectedColorId && item.size_id === selectedSizeId
    );

    if (selected) {
      setSelectedSizeInfo({
        color_id: selected.color_id,
        size_id: selected.size_id,
      });
    }
  };

  const handleAddToCart = async () => {
    // if (!selectedColorId || !selectedSize) {
    //   alert("Please select both color and size");
    //   return;
    // }

    const selectedSizeObj = products?.availability.find(
      (item) => item.color === selectedColorId && item.size === selectedSize
    );

    // if (!selectedSizeObj) {
    //   console.error("Selected size configuration not found");
    //   return;
    // }

    const cartData = {
      product_id: products?.id,
      color_id: selectedSizeInfo.color_id,
      size_id: selectedSizeInfo.size_id,
      quantity: 1,
    };
    console.log(cartData, "cartData");

    try {
      await addToCart(cartData);
      // alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      // alert("Failed to add product to cart. Please try again.");
    }
  };

  const fetchProductData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await instance.get(`/product/${id}`);
      const productData = res?.data?.data;
      setProduct(productData);

      if (productData?.tags) {
        setTags(productData.tags);
      }

      if (productData?.product_images?.length > 0) {
        setSelectedValue(productData.product_images[0].color.name);
        setSelectedColorId(productData.product_images[0].color_id);
        setSelectedColorName(productData.product_images[0].color.name);
      }

      // Check for size guide data in various possible field names
      if (productData?.sizeGuides) {
        console.log(
          "Found size guide in sizeGuides field:",
          productData.sizeGuides
        );
        setSizeGuide(productData.sizeGuides);
      } else if (productData?.size_guide) {
        console.log(
          "Found size guide in size_guide field:",
          productData.size_guide
        );
        setSizeGuide(productData.size_guide);
      } else if (productData?.sizeGuide) {
        console.log(
          "Found size guide in sizeGuide field:",
          productData.sizeGuide
        );
        setSizeGuide(productData.sizeGuide);
      } else if (productData?.category?.size_guide) {
        console.log(
          "Found size guide in category.size_guide field:",
          productData.category.size_guide
        );
        setSizeGuide(productData.category.size_guide);
      } else if (productData?.subcategory?.size_guide) {
        console.log(
          "Found size guide in subcategory.size_guide field:",
          productData.subcategory.size_guide
        );
        setSizeGuide(productData.subcategory.size_guide);
      } else {
        // Try to fetch size guide separately if not included in product data
        try {
          // Try different possible endpoints
          const endpoints = [
            `/product/${id}/size-guide`,
            `/product/${id}/sizeguide`,
            `/size-guide?product_id=${id}`,
            `/sizeguide?product_id=${id}`,
            `/size-guides?product_id=${id}`,
          ];

          for (const endpoint of endpoints) {
            try {
              const sizeGuideRes = await instance.get(endpoint);
              if (sizeGuideRes?.data?.data) {
                setSizeGuide(sizeGuideRes.data.data);
                console.log("Size guide found at:", endpoint);
                break;
              }
            } catch (endpointError) {
              console.log(`Endpoint ${endpoint} not found`);
            }
          }
        } catch (error) {
          console.log("No size guide endpoints found:", error);
        }
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
  const uniqueColors = [
    ...new Map(
      products?.product_images?.map((img) => [img.color.name, img])
    ).values(),
  ];
  const filteredImages =
    selectedValue && products?.product_images
      ? products.product_images.filter(
        (img) => img.color.name === selectedValue
      )
      : products?.product_images || [];

  console.log("Product images:", products?.product_images);
  console.log("Unique colors:", uniqueColors);
  console.log("Selected value:", selectedValue);
  console.log("Filtered images:", filteredImages);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
        <Grid container py={6} spacing={0}>
          <Grid item lg={6} sm={4} xs={12}>
            <ThumbsLoopGallery
              images={filteredImages}
              selectedColorId={selectedValue}
              setSelectedColorId={setSelectedValue}
              discount_amount
              ={products?.discount_amount}
            />
          </Grid>

          <Grid item lg={6} sm={12} xs={12}>
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
                {selectedColorName ||
                  products?.product_images?.[0]?.color?.name}
              </Typography>
              <FormControl component="fieldset">
                <Box
                  display="grid"
                  gridTemplateColumns={{
                    xs: "repeat(3, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(4, 1fr)",
                    lg: "repeat(6, 1fr)",
                  }}
                  gap={1}
                >
                  {uniqueColors.map((v, i) => (
                    <Grid
                      key={i}
                      onClick={() => {
                        setSelectedColorId(v.color_id);
                        setSelectedValue(v.color.name);
                        setSelectedColorName(v.color.name);
                      }}
                      sx={{
                        width: "100%",
                        aspectRatio: "1",
                        border:
                          selectedValue === v.color.name
                            ? "3px solid #9A0E20"
                            : "1px solid #ccc",
                        cursor: "pointer",
                        backgroundColor: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "border 0.2s",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={v?.image}
                        alt={`Thumbnail`}
                        sx={{
                          objectFit: "contain",
                        }}
                      />
                    </Grid>
                  ))}
                </Box>
              </FormControl>
              <Typography className="Regular" fontSize={18}>
                Size:
              </Typography>
              <Select
                size="small"
                value={selectedSizeInfo?.size_id || ""}
                onChange={handleSizeChange}
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
                  .filter((item) => item.color_id === selectedColorId)
                  .map((v, i) => {
                    return (
                      <MenuItem key={i} value={v?.size_id}>
                        {v?.size?.name}
                      </MenuItem>
                    );
                  })}
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
              {products?.category?.id === 1 && (
                <>
                  <Typography className="Regular" fontSize={20}></Typography>
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
                    textAlign="justify"
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
                <Typography
                  className="Regular"
                  fontSize={16}
                  textAlign={"justify"}
                >
                  {products?.fit}
                </Typography>
              </Grid>
              <Grid item lg={6} sm={12} xs={12}>
                <Typography className="Regular" fontSize={18}>
                  Care
                </Typography>
                <Typography
                  className="Regular"
                  fontSize={16}
                  textAlign={"justify"}
                >
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
