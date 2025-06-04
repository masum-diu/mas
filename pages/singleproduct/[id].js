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
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProduct] = useState(null);
  const [tags, setTags] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedColorName, setSelectedColorName] = useState("");
  const [sizeGuide, setSizeGuide] = useState([]);
  const [openSizeGuide, setOpenSizeGuide] = useState(false);
  const handleOpenSizeGuide = () => setOpenSizeGuide(true);
  const handleCloseSizeGuide = () => setOpenSizeGuide(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (!selectedColorId || !selectedSize) {
      alert("Please select both color and size");
      return;
    }

    const selectedSizeObj = products?.availability.find(
      (item) => item.color === selectedColorId && item.size === selectedSize
    );

    if (!selectedSizeObj) {
      console.error("Selected size configuration not found");
      return;
    }

    const cartData = {
      product_id: products?.id,
      color_id: selectedColorId,
      size_id: selectedSize,
      quantity: 1,
    };
    console.log(cartData, "cartData");

    try {
      await addToCart(cartData);
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add product to cart. Please try again.");
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

      if (productData?.productImages?.length > 0) {
        setSelectedValue(productData.productImages[0].color);
        setSelectedColorId(productData.productImages[0].color);
        setSelectedColorName(productData.productImages[0].color);
      }

      if (productData?.sizeGuides) {
        setSizeGuide(productData.sizeGuides);
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

  const imageArray = products?.productImages || [];
  const uniqueColors = [
    ...new Map(
      products?.productImages?.map((img) => [img.color, img])
    ).values(),
  ];
  const filteredImages =
    selectedValue && products?.productImages
      ? products.productImages.filter((img) => img.color === selectedValue)
      : products?.productImages || [];

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
                Color: {selectedColorName || products?.availability[0]?.color}
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
                        setSelectedColorId(v.color);
                        setSelectedValue(v.color);
                        setSelectedColorName(v.color);
                      }}
                      sx={{
                        width: "100%",
                        aspectRatio: "1",
                        border:
                          selectedValue === v.color
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
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
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
                  .filter((item) => item.color === selectedColorId)
                  .map((v, i) => (
                    <MenuItem key={i} value={v?.size}>
                      {v?.size}
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
              {products?.category?.id === 1 && (
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
