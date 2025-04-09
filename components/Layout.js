import {
  AppBar,
  Box,
  Stack,
  Toolbar,
  Typography,
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
  const [darkMode, setDarkMode] = useState(false); // Default to light mode initially

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
  // const { cart } = useCart();
  const router = useRouter();
  console.log(cart, "cart");

  useEffect(() => {
    fatchingData();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);
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
      setProducts(res?.data?.data || []);
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
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ display: "inline-block" }}
              >
                <Typography
                  className="Medium"
                  fontSize={16}
                  sx={{ cursor: "pointer", color: darkMode ? "#fff" : "#000" }}
                >
                  RETAIL
                </Typography>

                <Menu
                  sx={{
                    mt: 1,
                    "& .MuiPaper-root": {
                      backgroundColor: darkMode ? "#000000" : "#f5f5f5",
                    },
                  }}
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
                  {products?.length > 0 &&
                    products?.map((item, index) => (
                      <MenuItem
                        key={index}
                        onClick={handleMouseLeave}
                        sx={{
                          backgroundColor: darkMode ? "#000000" : "#f5f5f5",
                          "&:hover": {
                            backgroundColor: darkMode ? "#333333" : "#e0e0e0",
                          },
                        }}
                      >
                        <Link
                          href={`/product-category/${item?.slug}/${item?.id}`}
                          passHref
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            className="Medium"
                            fontSize={14}
                            sx={{ color: darkMode ? "#fff" : "#000" }}
                          >
                            {item?.cat_name || "No Category Name"}
                          </Typography>
                        </Link>
                      </MenuItem>
                    ))}
                </Menu>
              </div>

              <Link href={"/product-category/wholesale/1"} passHref>
                <Typography
                  className="Medium"
                  fontSize={16}
                  sx={{ color: darkMode ? "#fff" : "#000" }}
                >
                  WHOLESALE
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

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton onClick={toggleTheme} color="inherit">
                {darkMode ? <Brightness7 /> : <Brightness4 />}
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
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <ListItem button>
              <ListItemText
                primary={<Typography className="Medium">PRODUCTS</Typography>}
              />
            </ListItem>
            <Menu
              sx={{
                mt: 1,
                "& .MuiPaper-root": {
                  backgroundColor: darkMode ? "#000000" : "#f5f5f5",
                },
              }}
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
              {products?.length > 0 &&
                products?.map((item, index) => (
                  <MenuItem key={index} onClick={handleMouseLeave}>
                    <Link
                      href={`/product-category/${item?.slug}/${item?.id}`}
                      passHref
                      style={{ textDecoration: "none" }}
                    >
                      <Typography className="Medium">
                        {item?.cat_name}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
            </Menu>
          </div>
          <Link href={"/product-category/wholesale/1"} passHref>
            <ListItem button>
              <ListItemText
                primary={<Typography className="Medium">WHOLESALE</Typography>}
              />
            </ListItem>
          </Link>
          <Link href={"/contactus"} passHref>
            <ListItem button>
              <ListItemText
                primary={<Typography className="Medium">Contact Us</Typography>}
              />
            </ListItem>
          </Link>
        </List>
      </Drawer>

      {children}
    </Box>
  );
};

export default Layout;
