import React from 'react'
import Layout from '../components/Layout'
import Typography from '@mui/material/Typography'
import ProgressPaginationSwiper from '../components/ProgressPaginationSwiper'
import { Box, Button, Grid, Stack, TextField } from '@mui/material'

const Home = () => {
    return (
        <Layout>
            <ProgressPaginationSwiper />
            <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto", }}>

                <Grid container spacing={0} py={6} >
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

                    <Grid item lg={6}>
                        <Typography className="Regular" fontSize={18} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", }}>
                            MAS is your go-to source for high-quality, basic commodity clothing <span>
                                items. We bring simplicity, comfort, and durability together, providing</span>  <span>essential apparel that meets the needs of today’s global market.</span>
                        </Typography>

                        <Stack direction={"row"} justifyContent={"space-between"} sx={{ maxWidth: 450 }} py={2} >
                            <Typography className="Medium" fontSize={28}  >
                                Since 2015
                            </Typography>
                            <Typography className="Medium" fontSize={28}  >
                                600+ Outlets
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} justifyContent={"space-between"} sx={{ maxWidth: 550 }} pb={5}  >
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
                <Grid container spacing={0} py={2} >

                    <Grid item lg={12}>
                        <Typography className="Medium" fontSize={40}   >
                            WhY CHOOSE MAS
                        </Typography>
                        <Typography className="Regular" fontSize={18} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", pt: 1 }}  >
                            Our product line includes T-shirts, Caps, Shorts, Socks, Fleece/Hoodies, <span>
                                Thermal wear, Tank Tops, and Boxer Shorts.</span>
                        </Typography>
                    </Grid>
                    <Grid item lg={4} sx={{ display: "flex", gap: 1, pt: 4 }}>
                        <img src="/assets/SVG.png" alt="" width={25} height={25} style={{ marginTop: 5 }} />
                        <Stack>
                            <Typography className="Medium" fontSize={28} textTransform={"uppercase"}  >
                                High-quality
                            </Typography>
                            <Typography className="Regular" fontSize={16} color={"#bbb"}   >
                                A dui aliquam ultrices eros lorem nibh vivamus.
                                Quis aliquam duis pharetra faucibus ultrices
                                volutpat quisque.
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item lg={4} sx={{ display: "flex", gap: 1, pt: 4 }}>
                        <img src="/assets/Vector (3).png" alt="" width={25} height={25} style={{ marginTop: 7 }} />
                        <Stack>
                            <Typography className="Medium" fontSize={28} textTransform={"uppercase"}  >
                                ethical manufacturing
                            </Typography>
                            <Typography className="Regular" fontSize={16} color={"#bbb"}   >
                                Viverra duis ut orci mi id. Eget ultricies facilisi
                                elementum nec vel a gravida facilisis in. Tellus
                                felis sapien adipiscing.
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item lg={4} sx={{ display: "flex", gap: 1, pt: 4 }}>
                        <img src="/assets/SVG (1).png" alt="" width={25} height={25} style={{ marginTop: 5 }} />
                        <Stack>
                            <Typography className="Medium" fontSize={28} textTransform={"uppercase"} >
                                Competitive pricing
                            </Typography>
                            <Typography className="Regular" fontSize={16} color={"#bbb"}   >
                                Lorem velit parturient consectetur cursus
                                tincidunt tristique pretium volutpat urna. Vitae
                                scelerisque quam eget.
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item lg={4} sx={{ display: "flex", gap: 1, pt: 4 }}>
                        <img src="/assets/SVG (2).png" alt="" width={25} height={25} style={{ marginTop: 5 }} />
                        <Stack>
                            <Typography className="Medium" fontSize={28} textTransform={"uppercase"}  >
                                Global distribution
                            </Typography>
                            <Typography className="Regular" fontSize={16} color={"#bbb"}   >
                                Dapibus ac mattis semper hendrerit eu dolor
                                aliquam. Vitae sem orci non diam. Venenatis
                                augue arcu mauris id eros.
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item lg={4} sx={{ display: "flex", gap: 1, pt: 4 }}>
                        <img src="/assets/Vector (5).png" alt="" width={25} height={25} style={{ marginTop: 8 }} />
                        <Stack>
                            <Typography className="Medium" fontSize={28} textTransform={"uppercase"}  >
                                timely delivery
                            </Typography>
                            <Typography className="Regular" fontSize={16} color={"#bbb"}   >
                                Interdum tincidunt condimentum vestibulum
                                feugiat arcu, in. Maecenas sit sem erat tellus
                                pellentesque aliquet.
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item lg={4} sx={{ display: "flex", gap: 1, pt: 4 }}>
                        <img src="/assets/Vector (4).png" alt="" width={25} height={25} style={{ marginTop: 8 }} />
                        <Stack>
                            <Typography className="Medium" fontSize={28} textTransform={"uppercase"} >
                                Support for new brands
                            </Typography>
                            <Typography className="Regular" fontSize={16} color={"#bbb"}   >
                                Congue pulvinar morbi pharetra tincidunt vel
                                tincidunt. Amet, morbi neque tellus vivamus
                                venenatis diam nisl.
                            </Typography>
                        </Stack>
                    </Grid>



                </Grid>
                <Grid container spacing={0} py={8} >
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
                        <img src="https://img.freepik.com/free-photo/shirt-mockup-concept-with-plain-clothing_23-2149448751.jpg?t=st=1724839125~exp=1724842725~hmac=4ed5cc00b445776d55c743530be031bcc87400b07d17f408e20c640addcbda4f&w=1380" alt="" width={"100%"} />

                    </Grid>

                </Grid>
                <Typography className="Medium" fontSize={40} textTransform={"uppercase"}  >
                    Our Products
                </Typography>
                <Grid container spacing={2} py={3} >

                    <Grid item lg={4}>
                        <img src="/assets/Margin (1).png" alt="" width={"100%"} />

                    </Grid>
                    <Grid item lg={4}>
                        <img src="/assets/Margin.png" alt="" width={"100%"} />

                    </Grid>
                    <Grid item lg={4}>
                        <img src="/assets/Picture → blog03.webp.png" alt="" width={"100%"} />

                    </Grid>

                </Grid>
                <Typography className="Medium" fontSize={40} textTransform={"uppercase"}  >
                    Let’s talk
                </Typography>
                <Grid container spacing={0} py={3} >

                    <Grid item lg={4}>
                       
                    </Grid>


                </Grid>
            </Box>

        </Layout>

    )
}

export default Home
