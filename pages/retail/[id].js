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
} from "@mui/material";
import Layout from "../../components/Layout";
import instance from "../api/api_instance";
import { useRouter } from "next/router";
import { useCart } from "../../src/context/CartContext"; // Import CartContext
import staticData from "../../public/data/static_product_data.json";

const SingleProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart(); // Access addToCart from CartContext

  const [selectedValue, setSelectedValue] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const products = router.isReady
    ? staticData?.find((item) => parseInt(item.id) === parseInt(id)) // Ensure id is parsed correctly
    : {};

  const handleChangeSelect = (event) => {
    setAge(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  console.log("your log output", products);
  const handleAddToCart = () => {
    const cartData = {
      id: products?.id,
      name: products?.p_name,
      price: products?.p_price,
      color: selectedValue,
      size: age,
      images: products?.feature_static_images,
    };
    addToCart(cartData); // Call addToCart from CartContext
  };
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
        <Grid container py={6} spacing={0}>
          <Grid item lg={6} sm={4} xs={12}>
            <ThumbsLoopGallery
              data={products?.feature_static_images}
              link={products?.img_path}
              id={id}
            />
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
                    {products?.p_colours?.map((v, i) => (
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
                {products?.p_sizes?.map((v, i) => (
                  <MenuItem key={i} value={v?.size_name}>
                    {v?.size_name}
                  </MenuItem>
                ))}
              </Select>

              <Stack direction={"row"} spacing={2} py={2}>
                <Typography className="Regular">
                  Price: <span className="Medium">BDT {products?.p_price}</span>
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

            <Typography className="Regular" fontSize={18} color={"inherit"}>
              Specifications
            </Typography>
            <Grid container py={2} spacing={4}>
              <Grid item lg={6} sm={12} xs={12}>
                <Typography className="Regular" fontSize={18}>
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
                <Typography className="Regular" fontSize={18}>
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
                <Typography className="Regular" fontSize={18}>
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
                <Typography className="Regular" fontSize={18}>
                  Care
                </Typography>
                <Typography
                  className="Regular"
                  fontSize={16}
                  borderBottom={"1px solid #5a5858"}
                >
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
