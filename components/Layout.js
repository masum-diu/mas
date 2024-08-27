import { AppBar, Box, Stack, Toolbar, Typography, Button, Grid } from "@mui/material";


const menuItems = [
    { id: 'dashboard', text: 'Dashboard' },

];

const Layout = ({ children }) => {

    return (

        <Box >
            <AppBar position="sticky" sx={{ padding: "0px", color: "#222222", bgcolor: "#ffff", boxShadow: "none", borderBottom: "1px solid rgb(0 0 0 / 15%)", }}>
                <Toolbar sx={{
                    width: "90%", maxWidth: "1500px", margin: "0 auto", padding: "0px", '@media (min-width: 600px)': {
                        paddingLeft: '0px',
                        paddingRight: '0px',
                    },
                    height: 94
                }}>
                    <Stack direction={"row"} width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                        <Stack direction={"row"} spacing={3} alignItems={"center"} >
                            <Typography className="SemiBold" fontSize={40}>
                                Logo
                            </Typography>
                            <Typography className="Regular" fontSize={16}>
                                Daily News
                            </Typography>
                            <Typography className="Regular" fontSize={16}>
                                Voting
                            </Typography>
                            <Typography className="Regular" fontSize={16}>
                                Blogs
                            </Typography>
                            <Typography className="Regular" fontSize={16}>
                                Thoughts
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2} alignItems={"center"} >
                            <Button className="Regular" fontSize={16} variant="text" color="black" sx={{ textTransform: "capitalize", boxShadow: "none", }}>
                                Log in
                            </Button>

                            <Button className="Regular" fontSize={16} variant="contained" color="background3" sx={{ textTransform: "capitalize", boxShadow: "none", color: "#000000", borderRadius: "20px" }}>
                                Write Blog
                            </Button>
                            <Button className="Regular" fontSize={16} variant="contained" color="background4" sx={{ textTransform: "capitalize", boxShadow: "none", color: "#000000", borderRadius: "20px" }}>
                                Share Thoughts
                            </Button>
                        </Stack>


                    </Stack>

                </Toolbar>
            </AppBar>
            <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto", }}>
                {children}

            </Box>
            <Box sx={{ backgroundColor: "#cdf462", height: 584, }}>

                <Grid container spacing={0} sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto", pb: 5, borderBottom: "1px solid rgb(0 0 0 / 15%)", pt: 5 }}>
                    <Grid item lg={6}>
                        <img src="/assets/logo.png" alt="" width={120} />
                    </Grid>
                    <Grid item lg={6}>
                        <Typography className="bold" fontSize={32}>
                            info@email.com
                        </Typography>
                    </Grid>

                </Grid>
                <Grid container spacing={0} sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto", pb: 5, borderBottom: "1px solid rgb(0 0 0 / 15%)", pt: 5 }}>
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
                            <Typography className="bold" fontSize={16} color={"rgb(0 0 0 / 50%)"}>
                                Daily News
                            </Typography>
                            <Typography className="bold" fontSize={16} color={"rgb(0 0 0 / 50%)"}>
                                Voting
                            </Typography>
                            <Typography className="bold" fontSize={16} color={"rgb(0 0 0 / 50%)"}>
                                Blogs
                            </Typography>
                            <Typography className="bold" fontSize={16} color={"rgb(0 0 0 / 50%)"}>
                                Thoughts
                            </Typography>
                        </Stack>

                    </Grid>
                    <Grid item lg={4}>
                        <Stack direction={"column"} spacing={3} alignItems={"center"}>
                            <Typography className="bold" fontSize={16}>
                                Resources                            </Typography>
                            <Typography className="bold" fontSize={16} color={"rgb(0 0 0 / 50%)"}>
                                Privacy Policy
                            </Typography>
                            <Typography className="bold" fontSize={16} color={"rgb(0 0 0 / 50%)"}>
                                Terms of Use
                            </Typography>

                        </Stack>

                    </Grid>

                </Grid>
                <Typography className="bold" fontSize={16} pt={3} textAlign={"center"} color={"rgb(0 0 0 / 50%)"} >
                    Friends of Bangladesh © 2024
                </Typography>
            </Box>
        </Box>


    );
};

export default Layout;
