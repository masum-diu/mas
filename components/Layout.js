import { AppBar, Box, Stack, Toolbar, Typography, Button, Grid, TextField, InputAdornment, Drawer, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Facebook, Instagram, Phone, Twitter, } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
const menuItems = [
    { id: 'dashboard', text: 'Dashboard' },

];

const Layout = ({ children }) => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleDrawerOpen = () => setOpenDrawer(true);
    const handleDrawerClose = () => setOpenDrawer(false);
    return (

        <Box sx={{ backgroundColor: "#202020", color: "#ffff", }}>
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
                        '@media (min-width: 600px)': {
                            paddingLeft: '0px',
                            paddingRight: '0px',
                        },
                        height: 94,
                    }}
                >
                    <Stack
                        direction="row"
                        width="100%"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <img src="/assets/logo.png" alt="Logo" width={132} />

                        {/* Desktop Menu */}
                        <Stack
                            direction="row"
                            spacing={3}
                            alignItems="center"
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            <Typography className="Medium" fontSize={16}>
                                HOME
                            </Typography>
                            <Typography className="Medium" fontSize={16}>
                                ABOUT
                            </Typography>
                            <Typography className="Medium" fontSize={16}>
                                PRODUCTS
                            </Typography>
                            <Typography className="Medium" fontSize={16}>
                                CONTACTS
                            </Typography>
                            <Button variant="contained" color="error">
                                Contact Us
                            </Button>
                        </Stack>

                        {/* Mobile Menu Button */}
                        <Box
                            sx={{
                                display: { xs: 'flex', md: 'none' },
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
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={handleDrawerClose}
            >
                <Stack direction={"row"} alignItems={"flex-end"} justifyContent={"flex-end"} p={1}>
                    <IconButton size="small" aria-label="" onClick={handleDrawerClose} sx={{border:"1px solid #9A0E20"}}>
                        <CloseIcon sx={{fontSize:15}} />
                    </IconButton>
                </Stack>

                <List sx={{ width: 250 }}>
                    <ListItem button >
                        <ListItemText primary="HOME" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText primary="ABOUT" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText primary="PRODUCTS" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText primary="CONTACTS" />
                    </ListItem>
                    <ListItem button onClick={handleDrawerClose}>
                        <Button variant="contained" color="error">
                            Contact Us
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
            <Box >
                {children}

            </Box>
            <Box sx={{ backgroundColor: "#202020", color: "#ffff", }}>

                <Grid container spacing={0} sx={{ width: "90%", color: "#ffff", maxWidth: "1500px", margin: "0 auto", pb: 5, pt: 5 }}>
                    <Grid item lg={4}>
                        <img src="/assets/logo.png" alt="" width={132} />
                    </Grid>
                    <Grid item lg={4} >
                        <Stack direction={"column"} spacing={2}>
                            <Stack direction={"row"} alignItems={"center"} spacing={1} >
                                <Phone sx={{ fontSize: 28 }} />
                                <Typography className="Medium" fontSize={28}>
                                    +1 234 567 890
                                </Typography>
                            </Stack>
                            <Stack direction={"column"} spacing={1} color={"#bbb"}>
                                <Typography className="Regular" fontSize={16}>
                                    3891 Ranchview Dr. Richardson,
                                </Typography>
                                <Typography className="Regular" fontSize={16}>
                                    California 62639
                                </Typography>
                                <Typography className="Regular" fontSize={16} sx={{ textDecoration: "underline" }}>
                                    mas@gmail.com
                                </Typography>
                                <Stack direction={"row"} spacing={2} color={"#ffff"} py={2}>
                                    <Facebook /> <Twitter /> <Instagram />
                                </Stack>
                                <Typography className="Regular" fontSize={16}>
                                    © MAS
                                </Typography>
                                <Typography className="Regular" fontSize={16} >
                                    All rights reserved 2024
                                </Typography>
                            </Stack>
                        </Stack>


                    </Grid>
                    <Grid item lg={4}>
                        <Stack direction={"column"} spacing={2}>


                            <Typography className="Medium" fontSize={28} textTransform={"uppercase"}>
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
                                                color: '#ffffff',
                                            },
                                        }}

                                    />
                                    <Button variant="contained" color="error"  >
                                        Subscribe
                                    </Button>
                                </Stack>

                            </Stack>

                        </Stack>
                    </Grid>

                </Grid>
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
