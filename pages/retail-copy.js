// import React, { useEffect, useState } from "react";
// import Typography from "@mui/material/Typography";
// import ThumbsLoopGallery from "../../components/ThumbsLoopGallery";
// import {
//   Box,
//   Button,
//   Grid,
//   Stack,
//   Select,
//   MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import Layout from "../../components/Layout";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { useCart } from "../../src/context/CartContext";
// import tagsData from "../../public/data/tagsData.json"; // Import the tags JSON file
// const SingleProduct = () => {
//   const router = useRouter();
//   const { id } = router.query; // Get dynamic route parameter (id)
//   const { addToCart } = useCart(); // Access addToCart from CartContext
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [product, setProduct] = useState(null);
//   const [selectedColor, setSelectedColor] = useState(null); // Track selected color
//   const [selectedImages, setSelectedImages] = useState([]); // Track images for selected color
//   const [selectedSize, setSelectedSize] = useState("");
//   const [openSizeGuide, setOpenSizeGuide] = useState(false);
//   const [selectedTag, setSelectedTag] = useState(tagsData.tags[0]); // Default to the first tag

//   const fetchProductData = async () => {
//     try {
//       setLoading(true);
//       setError(null); // Reset error state
//       const res = await axios.get(
//         `https://masapi.etherstaging.xyz/api/product-by/${id}`
//       );
//       const productData = res?.data?.data;
//       setProduct(productData);

//       // Set default color and images
//       if (productData?.p_colours?.length > 0) {
//         const defaultColor = productData.p_colours[0];
//         setSelectedColor(defaultColor.color_name);
//         setSelectedImages(defaultColor.images || []); // Ensure images is not undefined
//       }
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       setError(error.response?.data?.message || "Something went wrong.");
//       console.error(
//         "Error fetching product data:",
//         error.response || error.message
//       );
//     }
//   };

//   useEffect(() => {
//     if (router.isReady && id) {
//       fetchProductData();
//     }
//   }, [id, router.isReady]); // Only run when id or router is ready

//   const handleColorChange = (color) => {
//     setSelectedColor(color.color_name);
//     setSelectedImages(color.images || []); // Update images for the selected color
//   };
//   const handleAddToCart = () => {
//     const cartData = {
//       id: product?.id,
//       name: product?.p_name,
//       price: product?.price,
//       color: selectedColor,
//       size: selectedSize,
//       images: selectedImages,
//     };
//     addToCart(cartData); // Add product to cart
//   };

//   const handleOpenSizeGuide = () => {
//     setOpenSizeGuide(true); // Open Size Guide popup
//   };

//   const handleCloseSizeGuide = () => {
//     setOpenSizeGuide(false); // Close Size Guide popup
//   };

//   const decodedHtml = product?.size_guide
//     ?.replace(/&lt;/g, "<")
//     ?.replace(/&gt;/g, ">")
//     ?.replace(/&quot;/g, '"');

//   if (loading) return <Typography>Loading...</Typography>;
//   if (error) return <Typography color="error">{error}</Typography>;

//   const handleTagChange = (tag) => {
//     setSelectedTag(tag); // Update the selected tag
//   };

//   return (
//     <Layout>
//       <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
//         <Grid container py={6} spacing={0}>
//           <Grid item lg={6} sm={4} xs={12}>
//             {/* Display images for the selected color */}
//             <ThumbsLoopGallery data={selectedImages} />
//           </Grid>

//           <Grid item lg={6} sm={4}>
//             <Stack direction={"column"} spacing={1}>
//               <Typography
//                 className="Medium"
//                 fontSize={28}
//                 textTransform={"uppercase"}
//               >
//                 {product?.p_name}
//               </Typography>
//               <Typography className="Regular" fontSize={18}>
//                 Color:{selectedColor || "No Color Selected"}
//               </Typography>
//               <Stack direction="row" spacing={1}>
//                 {product?.p_colours?.map((color, index) => (
//                   <Button
//                     key={index}
//                     onClick={() => handleColorChange(color)} // Handle color change
//                     sx={{
//                       width: 100,
//                       height: 100,
//                       backgroundColor: color.color_code, // Use the color code as the background
//                       border:
//                         selectedColor === product.color_name
//                           ? "2px solid #000"
//                           : "1px solid #ccc", // Highlight selected color
//                       padding: 0,
//                       minWidth: 0,
//                       "&:hover": {
//                         border: "2px solid #000",
//                       },
//                     }}
//                   >
//                     {color.images && color.images.length > 0 && (
//                       <img
//                         src={color.images[0]} // Display the first image for the color
//                         alt={color.color_name}
//                         style={{
//                           width: "100%",
//                           height: "100%",

//                           objectFit: "cover",
//                         }}
//                       />
//                     )}
//                   </Button>
//                 ))}
//               </Stack>

//               <Typography className="Regular" fontSize={18}>
//                 Size:
//               </Typography>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 size="small"
//                 value={selectedSize}
//                 onChange={(e) => setSelectedSize(e.target.value)}
//                 sx={{
//                   maxWidth: { lg: "100%", xs: "100%" },
//                 }}
//               >
//                 <MenuItem disabled value="">
//                   Select Size
//                 </MenuItem>
//                 {product?.p_sizes?.map((size, index) => (
//                   <MenuItem key={index} value={size?.size_name}>
//                     {size?.size_name}
//                   </MenuItem>
//                 ))}
//               </Select>

//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   marginTop: 1,
//                 }}
//               >
//                 <Button
//                   variant="text"
//                   color="primary"
//                   onClick={handleOpenSizeGuide}
//                 >
//                   Size Guide
//                 </Button>
//               </Box>

//               <Dialog
//                 open={openSizeGuide}
//                 onClose={handleCloseSizeGuide}
//                 maxWidth="lg"
//               >
//                 <DialogTitle>Size Guide</DialogTitle>
//                 <DialogContent>
//                   <Typography variant="body1" mb={2}>
//                     All Style Measurements in CM
//                   </Typography>
//                   <Stack width={"100%"}>
//                     {product?.size_guide ? (
//                       <div dangerouslySetInnerHTML={{ __html: decodedHtml }} />
//                     ) : (
//                       <Typography>No size guide available.</Typography>
//                     )}
//                   </Stack>
//                 </DialogContent>
//                 <DialogActions>
//                   <Button onClick={handleCloseSizeGuide} color="primary">
//                     Close
//                   </Button>
//                 </DialogActions>
//               </Dialog>

//               <Stack direction={"row"} spacing={2} py={2}>
//                 <Typography className="Regular">
//                   Price: <span className="Medium">USD {product?.price}</span>
//                 </Typography>
//               </Stack>
//               <Button
//                 variant="contained"
//                 color="error"
//                 className="Medium"
//                 onClick={handleAddToCart}
//               >
//                 Add to Cart
//               </Button>
//               {/* Tags Section */}
//               <Typography className="Regular" fontSize={18}>
//                 Description:
//               </Typography>
//               <Stack direction="row" spacing={2}>
//                 {tagsData.tags.map((tag, index) => (
//                   <Button
//                     key={index}
//                     onClick={() => handleTagChange(tag)}
//                     variant={
//                       selectedTag.tag_name === tag.tag_name
//                         ? "contained"
//                         : "outlined"
//                     }
//                     color="primary"
//                   >
//                     {tag.tag_name}
//                   </Button>
//                 ))}
//               </Stack>
//               <Typography className="Regular" mt={2}>
//                 {selectedTag.description}
//               </Typography>
//               {/* Specifications Section */}
//               <Typography className="Regular" color={"inherit"} fontSize={18}>
//                 Specifications
//               </Typography>
//               <Grid container py={2}>
//                 <Grid item xs={6}>
//                   <Typography className="Medium" fontSize={18}>
//                     Fit
//                   </Typography>
//                   <Typography className="Regular" fontSize={14}>
//                     {product?.product_fit}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography className="Medium" fontSize={18}>
//                     Care
//                   </Typography>
//                   <Typography className="Regular" fontSize={14}>
//                     {product?.product_care}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Stack>
//           </Grid>
//         </Grid>
//       </Box>
//     </Layout>
//   );
// };

// export default SingleProduct;

// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
// import Layout from "../../components/Layout";
// import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
// import ProgressPaginationSwipersider from "../../components/ProgressPaginationSwipersider";
// import instance from "../api/api_instance";

// const ProductCategoryRetail = () => {
//   const router = useRouter();
//   const [products, setProducts] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { slug, id } = router.query; // Access dynamic parameters
//   const [tabId, setTabId] = useState(31);
//   const [isMounted, setIsMounted] = useState(false); // Track if the component has mounted
//   const [tabName, setTabName] = useState("");

//   console.log(tabId, "sds");
//   // Fetch product data
//   const fetchingData = async () => {
//     try {
//       setLoading(true);
//       const res = await instance.get(`/product?sub_category=${tabId}`);
//       setProducts(res?.data?.data);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.error("Error fetching products:", error);
//     }
//   };

//   // Ensure that the component is mounted and router is ready before rendering
//   useEffect(() => {
//     if (router.isReady) {
//       setIsMounted(true); // Set isMounted to true once router is ready
//       fetchingData(); // Fetch data after hydration
//     }
//   }, [router.isReady, tabId]);

//   // If not mounted yet, don't render anything (to avoid hydration mismatch)
//   if (!isMounted) return null;

//   const handleNavigation = (product) => {
//     const productId = product?.id;

//     router.push({
//       pathname: `/retail/${productId}`,
//       // query: { name: tabName },
//     });
//   };

//   // const handleSetTab = (id, name) => {
//   //   setTabId(id);
//   //   setTabName(name);
//   // };
//   return (

//   );
// };

// export default ProductCategoryRetail;
