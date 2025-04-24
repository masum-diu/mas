// // import React, { useEffect, useState } from "react";
// // import Typography from "@mui/material/Typography";
// // import ThumbsLoopGallery from "../../components/ThumbsLoopGallery";
// // import {
// //   Box,
// //   Button,
// //   Grid,
// //   Stack,
// //   Select,
// //   MenuItem,
// //   FormControl,
// //   Radio,
// //   RadioGroup,
// //   FormControlLabel,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// // } from "@mui/material";
// // import Layout from "../../components/Layout";
// // import instance from "../api/api_instance";
// // import Link from "next/link";
// // import { useRouter } from "next/router";

// // const SingleProduct = () => {
// //   const router = useRouter();
// //   const [openSizeGuide, setOpenSizeGuide] = useState(false);
// //   const { id } = router.query; // Get dynamic route parameter (id)
// //   const [selectedValue, setSelectedValue] = useState("option1");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [products, setProduct] = useState(null);
// //   const [isClient, setIsClient] = useState(false); // Flag to indicate client-side render
// //   const [sizegruid, setSizegruid] = useState(null);
// //   const fetchProductData = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null); // Reset error state
// //       const res = await instance.get(`/product-by/${id}`);
// //       const productData = res?.data?.data;
// //       setProduct(productData);
// //       console.log( productData, "productData");

// //       if (productData?.p_colours?.length > 0) {
// //         setSelectedValue(productData.p_colours[0].color_name);
// //       }
// //       setLoading(false);
// //     } catch (error) {
// //       setLoading(false);
// //       setError(error.response?.data?.message || "Something went wrong.");
// //       console.error(
// //         "Error fetching product data:",
// //         error.response || error.message
// //       );
// //     }
// //   };
// //   const fatchingDataSize = async () => {
// //       try {
// //         const res = await instance.get(`https://apimas.etherstaging.xyz/public/api/product-by/${id}`);
// //         setSizegruid(res?.data?.data);
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //       }
// //     };

// //   useEffect(() => {
// //     if (router.isReady && id) {
// //       setIsClient(true); // Mark as client-side render
// //       fetchProductData();
// //       fatchingDataSize()
// //     }
// //   }, [id, router.isReady]); // Only run when id or router is ready

// //   const handleChange = (event) => {
// //     setSelectedValue(event.target.value);
// //   };

// //   if (!isClient) return null; // Ensure we wait until client-side rendering

// //   if (loading) return <Typography>Loading...</Typography>;
// //   if (error) return <Typography color="error">{error}</Typography>;
// //   const handleOpenSizeGuide = () => {
// //     setOpenSizeGuide(true); // Open Size Guide popup
// //   };

// //   const handleCloseSizeGuide = () => {
// //     setOpenSizeGuide(false); // Close Size Guide popup
// //   };
// //   const decodedHtml = sizegruid?.size_guide
// //     ?.replace(/&lt;/g, '<')
// //     ?.replace(/&gt;/g, '>')
// //     ?.replace(/&quot;/g, '"');

// //   const imageArray = [products?.feature_image].filter(Boolean);
// //   const link = products?.img_path;

// //   return (
// //     <Layout>
// //       <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
// //         <Grid container py={6} spacing={0}>
// //           <Grid item lg={6} sm={4} xs={12}>
// //             <ThumbsLoopGallery data={imageArray} link={link} />
// //           </Grid>

// //           <Grid item lg={6} sm={4}>
// //             <Stack direction={"column"} spacing={1}>
// //               <Typography
// //                 className="Medium"
// //                 fontSize={28}
// //                 textTransform={"uppercase"}
// //               >
// //                 {products?.p_name}
// //               </Typography>
// //               <Typography className="Regular" fontSize={18}>
// //                 Color:
// //               </Typography>
// //               <FormControl component="fieldset">
// //                 <RadioGroup
// //                   aria-label="options"
// //                   name="radio-buttons-group"
// //                   value={selectedValue}
// //                   onChange={handleChange}
// //                 >
// //                   <Stack direction="row" spacing={1}>
// //                     {products?.p_colours.map((v, i) => (
// //                       <FormControlLabel
// //                         key={i}
// //                         value={v.color_name}
// //                         control={
// //                           <Radio
// //                             sx={{
// //                               width: 24,
// //                               height: 24,
// //                               borderRadius: "50%",
// //                               backgroundColor: v.color_code, // Filled color
// //                               padding: 0,
// //                               "& .MuiSvgIcon-root": { display: "none" }, // Hide default radio circle
// //                               "&.Mui-checked": {
// //                                 backgroundColor: v.color_code,
// //                               },
// //                             }}
// //                           />
// //                         }
// //                       />
// //                     ))}
// //                   </Stack>
// //                 </RadioGroup>
// //               </FormControl>

// //               <Typography className="Regular" fontSize={18}>
// //                 Size:
// //               </Typography>
// //               <Select
// //                 labelId="demo-simple-select-label"
// //                 id="demo-simple-select"
// //                 size="small"
// //                 value={selectedValue}
// //                 onChange={handleChange}
// //               >
// //                 <MenuItem disabled value={10}>
// //                   View Size
// //                 </MenuItem>
// //                 {products?.p_sizes.map((v, i) => (
// //                   <MenuItem key={i} value={v?.size_name}>
// //                     {v?.size_name}
// //                   </MenuItem>
// //                 ))}
// //               </Select>
// //               <Box
// //                 sx={{
// //                   display: "flex",
// //                   justifyContent: "flex-end",
// //                   marginTop: 1,
// //                 }}
// //               >
// //                 <Button
// //                   variant="text"
// //                   color="primary"
// //                   onClick={handleOpenSizeGuide}
// //                 >
// //                   Size Guide
// //                 </Button>
// //               </Box>
// //               <Dialog
// //                 open={openSizeGuide}
// //                 onClose={handleCloseSizeGuide}
// //                 maxWidth="lg"

// //               >
// //                 <DialogTitle>Size Guide</DialogTitle>
// //                 <DialogContent>
// //                   <Typography variant="body1" mb={2}>
// //                     All Style Measurements in CM
// //                   </Typography>
// //                   <Stack width={"100%"}>
// //                     <div dangerouslySetInnerHTML={{ __html: decodedHtml }} /></Stack>
// //                 </DialogContent>
// //                 <DialogActions>
// //                   <Button onClick={handleCloseSizeGuide} color="primary">
// //                     Close
// //                   </Button>
// //                 </DialogActions>
// //               </Dialog>

// //               <Link href={"/contactus"}>
// //                 <Button variant="contained" color="error" className="Medium">
// //                   Contact Us
// //                 </Button>
// //               </Link>

// //               <Typography className="Regular">
// //                 <span
// //                   dangerouslySetInnerHTML={{
// //                     __html: products?.psh_raw_description,
// //                   }}
// //                 />
// //               </Typography>

// //               <Typography className="Regular">
// //                 <span
// //                   dangerouslySetInnerHTML={{
// //                     __html: products?.p_raw_description,
// //                   }}
// //                 />
// //               </Typography>
// //             </Stack>

// //             {/* Specifications Section */}
// //             <Typography
// //               className="Regular"
// //               fontSize={18}
// //               color={"inherit"}
// //               mt={4}
// //             >
// //               Specifications
// //             </Typography>
// //             <Grid container py={2} spacing={4}>
// //               <Grid item xs={6}>
// //                 <Typography className="Medium" fontSize={16}>
// //                   Material
// //                 </Typography>
// //                 <Typography className="Regular" fontSize={14}>
// //                   100% Organic Cotton
// //                 </Typography>
// //               </Grid>
// //               <Grid item xs={6}>
// //                 <Typography className="Medium" fontSize={16}>
// //                   Weight
// //                 </Typography>
// //                 <Typography className="Regular" fontSize={14}>
// //                   180 GSM (Medium Weight)
// //                 </Typography>
// //               </Grid>
// //               <Grid item xs={6}>
// //                 <Typography className="Medium" fontSize={16}>
// //                   Fit
// //                 </Typography>
// //                 <Typography className="Regular" fontSize={14}>
// //                   Regular Fit
// //                 </Typography>
// //               </Grid>
// //               <Grid item xs={6}>
// //                 <Typography className="Medium" fontSize={16}>
// //                   Care
// //                 </Typography>
// //                 <Typography className="Regular" fontSize={14}>
// //                   Machine wash cold, tumble dry low
// //                 </Typography>
// //               </Grid>
// //             </Grid>
// //           </Grid>
// //         </Grid>
// //       </Box>
// //     </Layout>
// //   );
// // };

// // export default SingleProduct;

// import React, { useEffect, useState } from "react";
// import Typography from "@mui/material/Typography";
// import ThumbsLoopGallery from "../../components/ThumbsLoopGallery";
// import {
//   Box,
//   Button,
//   Grid,
//   Stack,
//   FormControl,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import Layout from "../../components/Layout";
// import instance from "../api/api_instance";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import axios from "axios";
// import { ST } from "next/dist/shared/lib/utils";

// const SingleProduct = () => {
//   const router = useRouter();
//   const { id } = router.query; // Get dynamic route parameter (id)
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [products, setProduct] = useState(null);
//   const [selectedColor, setSelectedColor] = useState(null); // Track selected color
//   const [selectedImages, setSelectedImages] = useState([]); // Track images for selected color
//   const [openSizeGuide, setOpenSizeGuide] = useState(false);

//   const fetchProductData = async () => {
//     try {
//       setLoading(true);
//       setError(null); // Reset error state
//       const res = await axios.get(
//         `https://masapi.etherstaging.xyz/api/product-by/${id}`
//       );
//       const productData = res?.data?.data;
//       console.log(productData?.p_colours, "productData?.p_colours");
//       setProduct(productData);

//       // Set default color and images
//       if (productData?.p_colours?.length > 0) {
//         const defaultColor = productData?.p_colours[0];
//         setSelectedColor(defaultColor?.color_name);
//         setSelectedImages(defaultColor?.images || []); // Ensure images is not undefined
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
//   console.log(selectedImages, "seleced ");

//   useEffect(() => {
//     if (router.isReady && id) {
//       fetchProductData();
//     }
//   }, [id, router.isReady]); // Only run when id or router is ready

//   const handleColorChange = (color) => {
//     setSelectedColor(color.color_name);
//     setSelectedImages(color.images || []); // Update images for the selected color
//   };

//   const handleOpenSizeGuide = () => {
//     setOpenSizeGuide(true); // Open Size Guide popup
//   };

//   const handleCloseSizeGuide = () => {
//     setOpenSizeGuide(false); // Close Size Guide popup
//   };

//   const decodedHtml = products?.size_guide
//     ?.replace(/&lt;/g, "<")
//     ?.replace(/&gt;/g, ">")
//     ?.replace(/&quot;/g, '"');

//   if (loading) return <Typography>Loading...</Typography>;
//   if (error) return <Typography color="error">{error}</Typography>;

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
//                 {products?.p_name}
//               </Typography>
//               <Typography className="Regular" fontSize={18}>
//                 Color:
//               </Typography>
//               <FormControl component="fieldset">
//                 <RadioGroup
//                   aria-label="colors"
//                   name="color-buttons-group"
//                   value={selectedColor}
//                 >
//                   <Stack direction="row" spacing={1}>
//                     {products?.p_colours?.map((color, index) => (
//                       <FormControlLabel
//                         key={index}
//                         value={color.color_name}
//                         control={
//                           <Radio
//                             sx={{
//                               width: 24,
//                               height: 24,
//                               borderRadius: "50%",
//                               backgroundColor: color.color_code, // Filled color
//                               padding: 0,
//                               "& .MuiSvgIcon-root": { display: "none" }, // Hide default radio circle
//                               "&.Mui-checked": {
//                                 backgroundColor: color.color_code,
//                               },
//                             }}
//                             onClick={() => handleColorChange(color)} // Handle color change
//                           />
//                         }
//                       />
//                     ))}
//                   </Stack>
//                 </RadioGroup>
//               </FormControl>

//               <Typography className="Regular" fontSize={18}>
//                 Size:
//               </Typography>
//               <Stack direction="row" spacing={1} justifyContent={"flex-end"}>
//               <Button
//                 variant="text"
//                 color="primary"
//                 onClick={handleOpenSizeGuide}
//               >
//                Size Guide
//               </Button>
//               </Stack>
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
//                     {products?.size_guide ? (
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

//               <Link href={"/contactus"}>
//                 <Button variant="contained" color="error" className="Medium">
//                   Contact Us
//                 </Button>
//               </Link>

//               <Typography className="Regular">
//                 <span
//                   dangerouslySetInnerHTML={{
//                     __html: products?.p_raw_description,
//                   }}
//                 />
//               </Typography>
//             </Stack>
//           </Grid>
//         </Grid>
//       </Box>
//     </Layout>
//   );
// };

// export default SingleProduct;

import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import ThumbsLoopGallery from "../../components/ThumbsLoopGallery";
import {
  Box,
  Button,
  Grid,
  Stack,
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
import axios from "axios";

const SingleProduct = () => {
  const router = useRouter();
  const { id } = router.query; // Get dynamic route parameter (id)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null); // Track selected color
  const [selectedImages, setSelectedImages] = useState([]); // Track images for selected color
  const [openSizeGuide, setOpenSizeGuide] = useState(false);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state
      const res = await axios.get(
        `https://masapi.etherstaging.xyz/api/product-by/${id}`
      );
      const productData = res?.data?.data;
      setProduct(productData);

      // Set default color and images
      if (productData?.p_colours?.length > 0) {
        const defaultColor = productData.p_colours[0];
        setSelectedColor(defaultColor.color_name);
        setSelectedImages(defaultColor.images || []); // Ensure images is not undefined
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
      fetchProductData();
    }
  }, [id, router.isReady]); // Only run when id or router is ready

  const handleColorChange = (color) => {
    setSelectedColor(color.color_name);
    setSelectedImages(color.images || []); // Update images for the selected color
  };

  const handleOpenSizeGuide = () => {
    setOpenSizeGuide(true); // Open Size Guide popup
  };

  const handleCloseSizeGuide = () => {
    setOpenSizeGuide(false); // Close Size Guide popup
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
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              backgroundColor: color.color_code, // Filled color
                              padding: 0,
                              "& .MuiSvgIcon-root": { display: "none" }, // Hide default radio circle
                              "&.Mui-checked": {
                                backgroundColor: color.color_code,
                              },
                            }}
                            onClick={() => handleColorChange(color)} // Handle color change
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
              <Stack direction="row" spacing={1} justifyContent={"flex-end"}>
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleOpenSizeGuide}
                >
                  Size Guide
                </Button>
              </Stack>
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

              <Typography className="Regular">
                <span
                  dangerouslySetInnerHTML={{
                    __html: product?.p_raw_description,
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
