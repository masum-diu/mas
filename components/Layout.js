import {
  AppBar,
  Box,
  Stack,
  Toolbar,
  Typography,
  Grid,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  Phone,
  Twitter,
  Brightness4,
  Brightness7,
  ShoppingCart,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import Link from "next/link";
import instance from "../pages/api/api_instance";
import { useCart } from "../src/context/CartContext";
import { useRouter } from "next/router";

// Custom hook to handle dark mode with localStorage
const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode initially

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("darkMode", JSON.stringify(newTheme));
  };

  return [darkMode, toggleTheme];
};

const Layout = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, toggleTheme] = useDarkMode(); // Using custom hook
  const [cart, setCart] = useState([]);
  const { cart: stateCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    fatchingData();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (stateCart) {
      setCart(stateCart);
    } else if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [stateCart]);

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);
  const open = Boolean(anchorEl);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const [retailCategoryId, setRetailCategoryId] = useState(null);

  const fatchingData = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/category-list");
      const categories = res?.data?.data || [];

      setProducts(categories);

      // ✅ Find and set the ID of the "Retail" category
      const retail = categories.find(
        (cat) => cat.name?.toLowerCase() === "retail"
      );
      if (retail) {
        setRetailCategoryId(retail.id); // This will be used in your Link
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <Box
      sx={{
        backgroundColor: darkMode ? "#202020" : "#fff",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
      }}
    >
      <AppBar
        position="sticky"
        sx={{
          padding: "0px",
          color: "#ffff",
          bgcolor: darkMode ? "#000000" : "#f5f5f5",
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
            <Link href={"/"} passHref>
              <img src="/assets/logo.png" alt="Logo" width={132} />
            </Link>

            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Link href={"/"} passHref>
                <Typography
                  className="Medium"
                  fontSize={16}
                  sx={{ color: darkMode ? "#fff" : "#000" }}
                >
                  HOME
                </Typography>
              </Link>
              <Link href={"/about"} passHref>
                <Typography
                  className="Medium"
                  fontSize={16}
                  sx={{ color: darkMode ? "#fff" : "#000" }}
                >
                  ABOUT
                </Typography>
              </Link>
              <Link href={`/category/${retailCategoryId || 2}`} passHref>
                <Typography
                  className="Medium"
                  fontSize={16}
                  sx={{ cursor: "pointer", color: darkMode ? "#fff" : "#000" }}
                >
                  RETAIL
                </Typography>
              </Link>

              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                onClick={() => handleCartClick()}
                sx={{ cursor: "pointer" }}
              >
                <ShoppingCart sx={{ color: darkMode ? "#fff" : "#000" }} />

                <Typography
                  className="Medium"
                  fontSize={16}
                  sx={{ color: darkMode ? "#fff" : "#000" }}
                >
                  {cart.length}
                </Typography>
              </Stack>

              <Link href={"/contactus"} passHref>
                <Button variant="contained" color="error" className="Medium">
                  Contact Us
                </Button>
              </Link>

              <IconButton onClick={toggleTheme} color="inherit">
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Stack>
            <Box
              sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
            >
              <IconButton onClick={toggleTheme} color="inherit">
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>

              {/* Cart icon for mobile */}
              <IconButton onClick={handleCartClick} color="inherit">
                <ShoppingCart sx={{ color: darkMode ? "#fff" : "#000" }} />
                <Typography
                  className="Medium"
                  fontSize={14}
                  sx={{ ml: 0.5, color: darkMode ? "#fff" : "#000" }}
                >
                  {cart.length}
                </Typography>
              </IconButton>

              <IconButton color="inherit" onClick={handleDrawerOpen}>
                <MenuIcon style={{ fontSize: "33px" }} />
              </IconButton>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: darkMode ? "#000000" : "#f5f5f5",
            color: darkMode ? "#fff" : "#000",
          },
        }}
      >
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
            sx={{ border: "1px solid #9A0E20", color: "#9A0E20" }}
          >
            <CloseIcon sx={{ fontSize: 15 }} />
          </IconButton>
        </Stack>

        <List sx={{ width: 250 }}>
          <Link href={"/"} passHref>
            <ListItem button>
              <ListItemText
                primary={<Typography className="Medium">HOME</Typography>}
              />
            </ListItem>
          </Link>
          <Link href={"/about"} passHref>
            <ListItem button>
              <ListItemText
                primary={<Typography className="Medium">ABOUT</Typography>}
              />
            </ListItem>
          </Link>

          <Link href={`/category/${retailCategoryId || 2}`} passHref>
            <ListItem button>
              <ListItemText
                primary={<Typography className="Medium">RETAIL</Typography>}
              />
            </ListItem>
          </Link>
          <Link href={"/contactus"} passHref>
            <ListItem button>
              <ListItemText
                primary={<Typography className="Medium">CONTACT US</Typography>}
              />
            </ListItem>
          </Link>
        </List>
      </Drawer>

      <Box>{children}</Box>
      {/* Footer */}
      <Box
        sx={{
          backgroundColor: darkMode ? "#000000" : "#f5f5f5",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        <Grid
          container
          spacing={0}
          sx={{
            width: "90%",
            // color: "#fff",
            maxWidth: "1500px",
            margin: "0 auto",
            pb: 5,
            pt: 5,
          }}
        >
          <Grid item lg={3} sx={{ cursor: "pointer" }}>
            <Link href={"/"}>
              <img src="/assets/logo.png" alt="" width={132} />
            </Link>
            <Stack direction={"row"} spacing={2} py={2}>
              <a href="" target="_blank">
                <Facebook sx={{ color: darkMode ? "#fff" : "#000" }} />
              </a>
              <a href="" target="_blank">
                <Twitter sx={{ color: darkMode ? "#fff" : "#000" }} />
              </a>
              <a href="" target="_blank">
                <Instagram sx={{ color: darkMode ? "#fff" : "#000" }} />
              </a>
            </Stack>
          </Grid>

          <Grid item lg={3} xs={12}>
            <Typography
              className="Medium"
              fontSize={18}
              textTransform={"uppercase"}
              pt={3}
            >
              USA Address
            </Typography>
            <Typography className="Regular" fontSize={16}>
              106-20822 San Simeon Way, Miami, <br />
              Florida 33179, USA.
            </Typography>
            <Typography className="Regular" fontSize={16}>
              Phone no.: +1 (786) 934-6146
            </Typography>
          </Grid>
          <Grid item lg={3} xs={12}>
            <Typography
              className="Medium"
              fontSize={18}
              textTransform={"uppercase"}
              pt={3}
            >
              Canada Address
            </Typography>
            <Typography className="Regular" fontSize={16}>
              2010-2200 rue Sauvé Ouest, Montréal,
              <br />
              Québec H4N 0E1, Canada.
            </Typography>
            <Typography className="Regular" fontSize={16}>
              Phone no.: +1 (514) 677-7730
            </Typography>
          </Grid>

          <Grid item lg={3} xs={12}>
            <Typography
              className="Medium"
              fontSize={18}
              textTransform={"uppercase"}
              pt={3}
            >
              Bangladesh Address
            </Typography>
            <Typography className="Regular" fontSize={16}>
              Plot: 08, ABM Tower, Level: 08, <br />
              Road: 113/A, Gulshan 2,
              <br />
              Dhaka 1212, Bangladesh.
            </Typography>
            <Typography className="Regular" fontSize={16}>
              Phone no.: +88-02-55049698
            </Typography>
          </Grid>
        </Grid>
        <Grid item lg={12} textAlign={"center"} pb={"10px"}>
          <Typography className="Regular" fontSize={13}>
            All rights reserved 2025
          </Typography>
        </Grid>
      </Box>
    </Box>
  );
};

export default Layout;
