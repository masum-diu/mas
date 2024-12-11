import React, { useState } from "react";
import Layout from "../components/Layout";
import Typography from "@mui/material/Typography";
import ThumbsLoopGallery from "../components/ThumbsLoopGallery";
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
const product = () => {
  const [selectedValue, setSelectedValue] = useState("option1");
  const [age, setAge] = React.useState(10);

  const handleChangeSelect = (event) => {
    setAge(event.target.value);
  };

  // Handle change event
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Layout>
      <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
        <Grid container spacing={2} py={8}>
          <Grid item lg={6} sm={4}>
            <ThumbsLoopGallery />
          </Grid>

          <Grid item lg={6} sm={4}>
            <Stack direction={"column"} spacing={1}>
              <Typography
                className="Medium"
                fontSize={28}
                textTransform={"uppercase"}
              >
                High-quality
              </Typography>
              <Typography className="Regular" fontSize={16} color={"#bbb"}>
                Experience durable and well-crafted apparel that stands the test
                of time
              </Typography>
              <Typography className="Regular" fontSize={16} color={"#bbb"}>
             Color:
            </Typography>
              <FormControl component="fieldset">
         
                <RadioGroup
                  aria-label="options"
                  name="radio-buttons-group"
                  value={selectedValue}
                  onChange={handleChange}
                >
                  <Stack direction={"row"}>
                    <FormControlLabel
                      value="option1"
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: "red",
                            "&.Mui-checked": { color: "red" },
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value="option2"
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: "red",
                            "&.Mui-checked": { color: "red" },
                          }}
                        />
                      }
                    />       
                  </Stack>
                </RadioGroup>
              </FormControl>
              <Typography className="Regular" fontSize={16} color={"#bbb"}>
             Select Size:
             </Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                value={age}
                onChange={handleChangeSelect}
                sx={{
                  maxWidth: 200,
                  // Set text color
                  color: "red", // Change to any color you want
                  "& .MuiSelect-icon": {
                    color: "red", // Change icon color
                  },
                  "&.Mui-focused": {
                    borderColor: "white", // Change border color on focus
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "red", // Set the border color of the select field
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
                  Select Size
                </MenuItem>
                <MenuItem value={20}>Ten</MenuItem>
                <MenuItem value={30}>Twenty</MenuItem>
                <MenuItem value={40}>Thirty</MenuItem>
              </Select>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default product;
