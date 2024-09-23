import React from 'react'
import Layout from '../components/Layout'
import Typography from '@mui/material/Typography'
import ProgressPaginationSwiper from '../components/ProgressPaginationSwiper'
import { Box, Button, Grid, Stack, styled, TextField } from '@mui/material'
import ProgressPaginationSwipersider from '../components/ProgressPaginationSwipersider'
const CustomTextField = styled(TextField)({
    '& input[type="date"]::-webkit-calendar-picker-indicator': {
        filter: 'invert(100%) brightness(200%)', // Adjust color to red
    },
});
const Home = () => {
    return (
        <Layout>
            <ProgressPaginationSwiper />
            <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto", }}>

                <Grid container spacing={2} py={6} >
                    <Grid item lg={6}>
                        <Stack alignItems={"center"} justifyContent={"center"} direction={"column"} sx={{ position: "relative" }}>
                            <Typography className="Medium" fontSize={40} sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative" }}>
                                Simple Essentials, <span> Global Impact</span>
                            </Typography>
                            {/* <Typography className="Medium" fontSize={60} sx={{ position: 'absolute', left: 187, top: 80, zIndex: 1 }}>
                            MAS
                        </Typography> */}
                        </Stack>
                    </Grid>

                    <Grid item lg={6} >
                        <Typography className="Regular" fontSize={18} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", }}>
                            MAS is your go-to source for high-quality, basic commodity clothing items at an affordable price. We bring simplicity, comfort, and durability together, providing essential apparel that meets the needs of today’s global market.
                        </Typography>

                        <Stack direction={"row"} justifyContent={"space-between"} sx={{ maxWidth: 450 }} py={2} >
                            <Typography className="Medium" fontSize={28}  >
                                Since 2015
                            </Typography>
                            <Typography className="Medium" fontSize={28}  >
                                600+ Outlets
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2} justifyContent={"space-between"} sx={{ maxWidth: 550 }} pb={5}  >
                            <Typography className="Regular" fontSize={16} color={"#bbb"}  >
                                Delivering quality goods since inception.
                            </Typography>
                            <Typography className="Regular" fontSize={16} color={"#bbb"} >
                                Available for customers across the regions
                            </Typography>
                        </Stack>
                        <Button variant="contained" color="error">
                            learn more
                        </Button>
                    </Grid>

                </Grid>
                <Grid container spacing={4} py={2} >

                    <Grid item lg={12}>
                        <Typography className="Medium" fontSize={40}   >
                            WhY CHOOSE MAS
                        </Typography>
                        <Typography className="Regular" fontSize={18} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", pt: 1 }}  >
                            Our product line includes T shirts, Polo shirts, Boxer shorts, Tank Tops/A <span>
                                Shirts, Thermal Wear, Hoodies, Sweat Shirts/Pants, Socks and Caps both with</span>
                            labels and blanks
                        </Typography>
                    </Grid>
                    <Grid item lg={4} sx={{ display: "flex", gap: 1, pt: 4 }}>
                        <img src="/assets/SVG.png" alt="" width={25} height={25} style={{ marginTop: 5 }} />
                        <Stack direction={"column"} spacing={1}>
                            <Typography className="Medium" fontSize={28} textTransform={"uppercase"}  >
                                High-quality
                            </Typography>
                            <Typography className="Regular" fontSize={16} color={"#bbb"}   >
                                Experience durable and well-crafted apparel that stands the test of time
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item lg={4} sx={{ display: "flex", gap: 1, pt: 4 }}>
                        <img src="/assets/Vector (3).png" alt="" width={25} height={25} style={{ marginTop: 7 }} />
                        <Stack direction={"column"} spacing={1}>
                            <Typography className="Medium" fontSize={28} textTransform={"uppercase"}  >
                                ethical manufacturing
                            </Typography>
                            <Typography className="Regular" fontSize={16} color={"#bbb"}   >
                                Committed to responsible practices and sustainability in every step
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item lg={4} sx={{ display: "flex", gap: 1, pt: 4 }}>
                        <img src="/assets/SVG (1).png" alt="" width={25} height={25} style={{ marginTop: 5 }} />
                        <Stack direction={"column"} spacing={1}>
                            <Typography className="Medium" fontSize={28} textTransform={"uppercase"} >
                                Competitive pricing
                            </Typography>
                            <Typography className="Regular" fontSize={16} color={"#bbb"}   >
                                Get premium clothing at prices that offer great value
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item lg={4} sx={{ display: "flex", gap: 1, pt: 4 }}>
                        <img src="/assets/SVG (2).png" alt="" width={25} height={25} style={{ marginTop: 5 }} />
                        <Stack direction={"column"} spacing={1}>
                            <Typography className="Medium" fontSize={28} textTransform={"uppercase"}  >
                                Strong distribution
                            </Typography>
                            <Typography className="Regular" fontSize={16} color={"#bbb"}   >
                                Reliable distribution network in national and global reach ensures your products are always within arm's reach.
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item lg={4} sx={{ display: "flex", gap: 1, pt: 4 }}>
                        <img src="/assets/Vector (5).png" alt="" width={25} height={25} style={{ marginTop: 8 }} />
                        <Stack direction={"column"} spacing={1}>
                            <Typography className="Medium" fontSize={28} textTransform={"uppercase"}  >
                                Comfortable
                            </Typography>
                            <Typography className="Regular" fontSize={16} color={"#bbb"}   >
                                Designed with materials and styles that prioritize your comfort all day long
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item lg={4} sx={{ display: "flex", gap: 1, pt: 4 }}>
                        <img src="/assets/Vector (4).png" alt="" width={25} height={25} style={{ marginTop: 8 }} />
                        <Stack direction={"column"} spacing={1}>
                            <Typography className="Medium" fontSize={28} textTransform={"uppercase"} >
                                Support for new brands
                            </Typography>
                            <Typography className="Regular" fontSize={16} color={"#bbb"}   >
                                Partnering with emerging brands to foster growth and innovation
                            </Typography>
                        </Stack>
                    </Grid>



                </Grid>
                <Grid container spacing={2} py={8} >
                    <Grid item lg={6} >
                        <Stack alignItems={"left"} justifyContent={"left"} direction={"column"} spacing={2} >
                            <Typography className="Medium" textTransform={"uppercase"} fontSize={28} sx={{ display: "flex", flexDirection: "column", }}>
                                Team of professionals <span>is waiting for you</span>
                            </Typography>
                            <Typography className="Medium" fontSize={16} textAlign={"left"} >
                                At MAS, we understand the importance of the basics. That’s why we focus on delivering essential clothing items that form the foundation of any wardrobe. From T-shirts to Tank Tops, our products are designed for comfort, quality, and versatility. As a subsidiary of Mishael International Inc., we leverage decades of industry experience to bring you the best in basic apparel.
                            </Typography>
                            <Button variant="contained" color="error" sx={{ maxWidth: 140 }}>
                                learn more
                            </Button>
                        </Stack>

                    </Grid>

                    <Grid item lg={6}>
                        <img src="/assets/bam.jpeg" alt="" width={"100%"} />

                    </Grid>

                </Grid>
                <Typography className="Medium" fontSize={40} textTransform={"uppercase"} mb={3} >
                    Our Products
                </Typography>
                <ProgressPaginationSwipersider />
                <Typography className="Medium" fontSize={40} textTransform={"uppercase"} pt={8} >
                    Let’s talk
                </Typography>
                <Grid container spacing={1} py={3} >

                    <Grid item lg={4}>
                        <Typography className="Medium" fontSize={18} textTransform={"uppercase"}  >
                            Email
                        </Typography>
                        <Typography className="Regular" fontSize={16} color={"#bbb"}   >
                            barbercrop@example.com
                        </Typography>
                        <Typography className="Medium" fontSize={18} textTransform={"uppercase"} pt={3} >
                            Address
                        </Typography>
                        <Typography className="Regular" fontSize={16} color={"#bbb"}   >
                            3891 Ranchview Dr. Richardson,California 62639
                        </Typography>
                        <Typography className="Medium" fontSize={18} textTransform={"uppercase"} pt={3} >
                            Phone
                        </Typography>
                        <Typography className="Regular" fontSize={16} color={"#bbb"}   >
                            +1 234 567 890
                        </Typography>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Stack direction={"column"} spacing={1}>
                            <Typography className="Medium" fontSize={16} textTransform={"uppercase"}  >
                                Name <span style={{ color: "#9A0E20" }}>*</span>
                            </Typography>
                            <TextField
                                // label="Standard warning"
                                variant="standard"
                                color="primary"
                                placeholder="Enter Your Name"
                                fullWidth
                                focused
                                InputProps={{
                                    sx: {
                                        color: '#ffffff',
                                    },
                                }}
                            />
                        </Stack>
                        <Stack direction={"column"} spacing={1} pt={4} >
                            <Typography className="Medium" fontSize={16} textTransform={"uppercase"}  >
                                Phone <span style={{ color: "#9A0E20" }}>*</span>
                            </Typography>
                            <TextField
                                // label="Standard warning"
                                variant="standard"
                                color="primary"
                                placeholder="Enter Your Phone"
                                fullWidth
                                focused
                                InputProps={{
                                    sx: {
                                        color: '#ffffff',
                                    },
                                }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Stack direction={"column"} spacing={1}>
                            <Typography className="Medium" fontSize={16} textTransform={"uppercase"}  >
                                Email <span style={{ color: "#9A0E20" }}>*</span>
                            </Typography>
                            <TextField
                                // label="Standard warning"
                                variant="standard"
                                color="primary"
                                placeholder="Enter Your Email"
                                fullWidth
                                focused
                                InputProps={{
                                    sx: {
                                        color: '#ffffff',
                                    },
                                }}
                            />
                        </Stack>
                        <Stack direction={"column"} spacing={1} pt={4}>
                            <Typography className="Medium" fontSize={16} textTransform={"uppercase"}  >
                                Choose an appointment date
                            </Typography>
                            <CustomTextField
                                variant="standard"
                                color="primary"
                                placeholder="Enter Your Date"
                                fullWidth
                                type="date"
                                focused
                                InputProps={{
                                    sx: {
                                        color: '#ffffff', // Sets the text color to white
                                    },
                                }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        {/* <Stack direction={"column"} spacing={1}>
                            <Typography className="Medium" fontSize={16} textTransform={"uppercase"}  >
                                Email *
                            </Typography>
                            <TextField
                                // label="Standard warning"
                                variant="standard"
                                color="primary"
                                placeholder="Enter Your Email"
                                multiline
                                rows={4}
                                fullWidth
                                focused
                                InputProps={{
                                    sx: {
                                        color: '#ffffff',
                                    },
                                }}
                            />
                        </Stack> */}

                    </Grid>
                    <Grid item lg={8} xs={12}>
                        <Stack direction={"column"} spacing={1}>
                            <Typography className="Medium" fontSize={16} textTransform={"uppercase"}  >
                                Message
                            </Typography>
                            <TextField
                                // label="Standard warning"
                                variant="standard"
                                color="primary"
                                placeholder="Enter Your Message"
                                multiline
                                rows={4}
                                fullWidth
                                focused
                                InputProps={{
                                    sx: {
                                        color: '#ffffff',
                                    },
                                }}
                            />
                            <Button variant="contained" color="error" sx={{ maxWidth: 87 }} >
                                submit
                            </Button>
                        </Stack>

                    </Grid>


                </Grid>
            </Box>

        </Layout>

    )
}

export default Home
