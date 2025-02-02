import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import ThumbsLoopGallery from "../../components/ThumbsLoopGallery";
import {
  Box,
  Button,
  Grid,
  Stack,
  styled,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";
import Layout from "../../components/Layout";
import instance from "../api/api_instance";
import Link from "next/link";
import { useRouter } from "next/router";
const singleproduct = () => {
  const router = useRouter();
  const { id } = router?.query;
  // console.log(id)
  const [selectedValue, setSelectedValue] = useState("option1");
  const [age, setAge] = React.useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProduct] = useState(null);
  // console.log(products, "products")

  const fatchingData = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state
      const res = await instance.get(`/product-by/${id}`);
      const productData = res?.data?.data;
      setProduct(productData);

      // Set the first color as the default selected value
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

  // Inside JSX

  useEffect(() => {
    if (id) {
      fatchingData();
    }
  }, [id]);

  const handleChangeSelect = (event) => {
    setAge(event.target.value);
  };
  const imageArray = [products?.feature_image].filter(Boolean); // Removes undefined or null values
  const link = products?.img_path;

  // Handle change event
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
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
              <Typography className="Regular" fontSize={18} color={"#fff"}>
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
                              }, // Keep the color when selected
                            }}
                          />
                        }
                      />
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>

              <Typography className="Regular" fontSize={18} color={"#fff"}>
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
                  // Set text color
                  color: "#fff", // Change to any color you want
                  "& .MuiSelect-icon": {
                    color: "gray", // Change icon color
                  },
                  "&.Mui-focused": {
                    borderColor: "gray", // Change border color on focus
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "gray", // Set the border color of the select field
                  },
                  "& .MuiMenuItem-root": {
                    color: "blue", // Set the color of menu items
                  },
                  "&:hover": {
                    backgroundColor: "gray", // Change background color on hover
                  },
                }}
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
              <Link href={"/contactus"}>
                <Button variant="contained" color="error" className="Medium">
                  Contact Us
                </Button>
              </Link>
              <Typography className="Regular" color={"#bbb"}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: products?.psh_raw_description,
                  }}
                />
              </Typography>

              <Typography className="Regular" color={"#bbb"}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: products?.p_raw_description,
                  }}
                />
              </Typography>
            </Stack>

            <Typography className="Regular" fontSize={18} color={"#fff"}>
              Specifications
            </Typography>
            <Grid container py={2} spacing={4}>
              <Grid item lg={6} sm={12} xs={12}>
                <Typography className="Regular" fontSize={18} color={"#bbb"}>
                  Material
                </Typography>
                <Typography
                  className="Regular"
                  fontSize={16}
                  borderBottom={"1px solid #5a5858"}
                >
                  100% organic cotton
                </Typography>
              </Grid>
              <Grid item lg={6} sm={12} xs={12}>
                <Typography className="Regular" fontSize={18} color={"#bbb"}>
                  Weight
                </Typography>
                <Typography
                  className="Regular"
                  fontSize={16}
                  borderBottom={"1px solid #5a5858"}
                >
                  180 GSM (Medium Weight)
                </Typography>
              </Grid>
              <Grid item lg={6} sm={12} xs={12}>
                <Typography className="Regular" fontSize={18} color={"#bbb"}>
                  Fit
                </Typography>
                <Typography
                  className="Regular"
                  fontSize={16}
                  borderBottom={"1px solid #5a5858"}
                >
                  Regular Fit
                </Typography>
              </Grid>
              <Grid item lg={6} sm={12} xs={12}>
                <Typography className="Regular" fontSize={18} color={"#bbb"}>
                  Care
                </Typography>
                <Typography
                  className="Regular"
                  fontSize={16}
                  borderBottom={"1px solid #5a5858"}
                >
                  Mahchine wash cold, tumble dry low
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default singleproduct;
