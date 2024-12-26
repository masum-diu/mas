import {
  AppBar,
  Box,
  Stack,
  Toolbar,
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import { Facebook, Instagram, Phone, Twitter } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import Link from "next/link";
import Cursor from "quill/blots/cursor";
import instance from "../pages/api/api_instance";
const menuItems = [{ id: "dashboard", text: "Dashboard" }];

const Layout = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);
  const [products, setProducts] = useState(null);
  console.log(products)
  const [loading, setLoading] = useState(true);

  const open = Boolean(anchorEl);
  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMouseLeave = () => {
    setAnchorEl(null);
  };
  const fatchingData = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/category-list");
      setProducts(res?.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fatchingData();
  }, []);
  return (
    <Box sx={{ backgroundColor: "#202020", color: "#ffff" }}>
      <AppBar
        position="sticky"
        sx={{
          padding: "0px",
          color: "#ffff",
          bgcolor: "#000000",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            width: "90%",
            maxWidth: "1500px",
            margin: "0 auto",
            padding: "0px",
            "@media (min-width: 600px)": {
              paddingLeft: "0px",
              paddingRight: "0px",
            },
            height: 94,
          }}
        >

          <Stack
            direction="row"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            sx={{ cursor: "pointer" }}
          >
            <Link href={"/"} >
              <img src="/assets/logo.png" alt="Logo" width={132} />
            </Link>
            {/* Desktop Menu */}
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              sx={{
                display: { xs: "none", md: "flex" },
              }}
            >
              <Link href={"/"} >
                <Typography className="Medium" fontSize={16}>
                  HOME
                </Typography>
              </Link>
              <Link href={"/about"} >
                <Typography className="Medium" fontSize={16} >
                  ABOUT
                </Typography>
              </Link>
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ display: "inline-block" }}
              >
                {/* Dropdown trigger */}
                <Typography
                  className="Medium"
                  fontSize={16}
                  sx={{ cursor: "pointer" }}
                >
                  PRODUCTS
                </Typography>

                {/* Dropdown menu */}
                <Menu
                  sx={{ mt: 1 }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMouseLeave}
                  MenuListProps={{
                    onMouseLeave: handleMouseLeave,
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  {/* Dropdown items */}
                  {products?.map((item, index) => <MenuItem onClick={handleMouseLeave}>
                    <Link key={index} href={`/product-category/${item?.slug}/${item?.id}`} passHref>
                      <Typography className="Light"
                        fontSize={14}> {item?.cat_name || "No Category Name"}</Typography>
                    </Link>

                  </MenuItem>)}

                </Menu>
              </div>
              {/* <Typography className="Medium" fontSize={16}>
                CONTACTS
              </Typography>*/}
              <Link href={"/contactus"} >
                <Button variant="contained" color="error">
                  Contact Us
                </Button>
              </Link>
            </Stack>

            {/* Mobile Menu Button */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleDrawerOpen}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
        <Stack
          direction={"row"}
          alignItems={"flex-end"}
          justifyContent={"flex-end"}
          p={1}
        >
          <IconButton
            size="small"
            aria-label=""
            onClick={handleDrawerClose}
            sx={{ border: "1px solid #9A0E20" }}
          >
            <CloseIcon sx={{ fontSize: 15 }} />
          </IconButton>
        </Stack>

        <List sx={{ width: 250 }}>
          <Link href={"/"} >
            <ListItem button>
              <ListItemText primary="HOME" />
            </ListItem>
          </Link>
          <Link href={"/about"} >
            <ListItem button>
              <ListItemText primary="ABOUT" />
            </ListItem>
          </Link>
          <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: "inline-block" }}
      >
        {/* Link for PRODUCTS list item */}
       
          <ListItem button>
            <ListItemText primary="PRODUCTS" />
          </ListItem>
       

        {/* Dropdown menu */}
        <Menu
          sx={{ mt: 1 }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleMouseLeave}
          MenuListProps={{
            onMouseLeave: handleMouseLeave,
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {/* Dropdown items */}
          {products?.map((item, index) => (
            <MenuItem key={index} onClick={handleMouseLeave} >
              <Link href={`/product-category/${item?.slug}/${item?.id}`} passHref>
                <Typography className="Light" fontSize={14}>
                  {item?.cat_name || "No Category Name"}
                </Typography>
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </div>
          <Link href={"/contactus"} >
            <ListItem button onClick={handleDrawerClose}>
              <Button variant="contained" color="error">
                Contact Us
              </Button>
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Box>{children}</Box>
      <Box sx={{ backgroundColor: "#202020", color: "#ffff" }}>
        <Grid
          container
          spacing={0}
          sx={{
            width: "90%",
            color: "#ffff",
            maxWidth: "1500px",
            margin: "0 auto",
            pb: 5,
            pt: 5,
          }}
        >
          <Grid item lg={4} sx={{ cursor: "pointer" }}>
            <Link href={"/"} >
              <img src="/assets/logo.png" alt="" width={132} />
            </Link>
          </Grid>
          <Grid item lg={4}>
            <Stack direction={"column"} spacing={2}>
              <Stack direction={"column"} spacing={1} color={"#bbb"}>
                <Typography className="Regular" fontSize={16}>
             <b>Canada Address:</b> 2010-2200 rue Sauvé Ouest, Montréal, <br></br>
              Québec, H4N 0E1, Canada.
                </Typography>

              <Typography className="Regular" fontSize={16}>
             <b>Canada Phone no. :</b> +1 (514) 677-7730            
                </Typography>
                       <Typography className="Regular" fontSize={16}>
             <b>BD Address:</b> 113/A, Plot: 08, Level: 08, Gulshan-2, Dhaka- 1212, Bangladesh.
                </Typography>

              <Typography className="Regular" fontSize={16}>
             <b>BD Phone no. :</b>        
                </Typography>
                
                <Stack direction={"row"} spacing={2} color={"#ffff"} py={2}>
                  <Facebook /> <Twitter /> <Instagram />
                </Stack>

                <Link href={"/faq"} >
                  <Typography className="Regular" fontSize={16} sx={{ cursor: "pointer" }}>
                    FAQ
                  </Typography>
                </Link>
                <Link href={"/privacy"} >
                  <Typography className="Regular" fontSize={16} sx={{ cursor: "pointer" }}>
                    PRIVACY POLICY
                  </Typography>
                </Link>

              </Stack>
            </Stack>
          </Grid>

          <Grid item lg={4}>
            <Stack direction={"column"} spacing={2}>
              <Typography
                className="Medium"
                fontSize={28}
                textTransform={"uppercase"}
              >
                Subscribe our newsletter
              </Typography>

              <Stack direction={"column"} spacing={3} color={"#bbb"}>
                <Typography className="Regular" fontSize={18}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Luctus interdum volutpat urna neque varius congue.
                </Typography>
                <Stack direction={"row"}>
                  <TextField
                    //   variant="contented"
                    color="primary"
                    size="small"
                    placeholder="Enter Your Email Address"
                    fullWidth
                    focused
                    InputProps={{
                      sx: {
                        color: "#ffffff",
                      },
                    }}
                  />
                  <Button variant="contained" color="error">
                    Subscribe
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <Grid item lg={12} textAlign={"center"} pb={'10px'}>
          <Typography className="Regular" fontSize={13}>
            All rights reserved 2024
          </Typography></Grid>
        {/* <Grid container spacing={0} sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto", pb: 5,  pt: 5 }}>
                    <Grid item lg={4}>
                        <Typography className="bold" fontSize={16}>
                            Don't miss this chance to engage, innovate, and lead the change in our journey towards a circular textile economy!
                        </Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <Stack direction={"column"} spacing={3} alignItems={"center"}>
                            <Typography className="bold" fontSize={16}>
                                Menu
                            </Typography>
                            <Typography className="bold" fontSize={16} >
                                Daily News
                            </Typography>
                            <Typography className="bold" fontSize={16} >
                                Voting
                            </Typography>
                            <Typography className="bold" fontSize={16} >
                                Blogs
                            </Typography>
                            <Typography className="bold" fontSize={16} >
                                Thoughts
                            </Typography>
                        </Stack>

                    </Grid>
                    <Grid item lg={4}>
                        <Stack direction={"column"} spacing={3} alignItems={"center"}>
                            <Typography className="bold" fontSize={16}>
                                Resources                            </Typography>
                            <Typography className="bold" fontSize={16} >
                                Privacy Policy
                            </Typography>
                            <Typography className="bold" fontSize={16} >
                                Terms of Use
                            </Typography>

                        </Stack>

                    </Grid>

                </Grid>
                <Typography className="bold" fontSize={16} pt={3} textAlign={"center"}  >
                    Friends of Bangladesh © 2024
                </Typography> */}
      </Box>
    </Box>
  );
};

export default Layout;
