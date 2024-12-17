import React from "react";
import Layout from "../components/Layout";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid, Stack, styled, TextField } from "@mui/material";
const faq = () => {
    return (
      <Layout>
        <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
        <Grid container spacing={2} py={6} >
        <Grid item lg={12}>
            <Stack alignItems={"center"} justifyContent={"center"} direction={"column"} sx={{ position: "relative" }}>
                <Typography className="Medium" fontSize={18} sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative",bottom:"24px" }}>
                Frequently asked questions
                </Typography>
                </Stack>
                <Typography className="Regular" fontSize={16}  sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative", bottom:"30px"  }}>
                How long before my order ships out?
                </Typography>
                <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative", bottom:"30px"  }}>
                We do our best to ship out all orders on the next business day. But sometimes, if ordered before 11am, we may ship it out the same day. 
                </Typography>

                <Typography className="Regular" fontSize={16}  sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative", bottom:"30px"  }}>
                After my order ships, how long will it take for me to receive my order?"
                </Typography>
                <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative", bottom:"30px"  }}>
                On average, most orders take 2-3 days to arrive to their destination within the majority of the US. On the west coast, it may take 3-7 days.                 </Typography>
                
                <Typography className="Regular" fontSize={16}  sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative", bottom:"30px"  }}>
               How will I know when my order shipped?
                </Typography>
                <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative", bottom:"30px"  }}>
                We do our best to ship out all orders on the next business day. But sometimes, if ordered before 11am, we may ship it out the same day. 
                </Typography>

                <Typography className="Regular" fontSize={16}  sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative", bottom:"30px"  }}>
                The item Im looking for is out of stock. When will it be back in stock?
                 </Typography>
                 <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative", bottom:"30px"  }}>
                 Great Question! Normally we receive stock weekly to prevent being Out of Stock (OoS).

But LIFE happens. However, we can let you know when the Item is back in stock.


1. Just shop as you normally would until you come across an item OoS.

2. Press on the " Notify when available" button.

3. Enter your email and be notified as soon as we restock!

                 </Typography>


                 <Typography className="Regular" fontSize={16}  sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative", bottom:"30px"  }}>
                 How will I know when my order shipped?
                  </Typography>
                  <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative", bottom:"30px"  }}>
                  We do our best to ship out all orders on the next business day. But sometimes, if ordered before 11am, we may ship it out the same day. 
                  </Typography>
                  <Typography className="Regular" fontSize={16}  sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative", bottom:"30px"  }}>
                  How will I know when my order shipped?
                   </Typography>
                   <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative", bottom:"30px"  }}>
                   We do our best to ship out all orders on the next business day. But sometimes, if ordered before 11am, we may ship it out the same day. 
                   </Typography>
                   <Typography className="Regular" fontSize={16}  sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative", bottom:"30px"  }}>
                   How will I know when my order shipped?
                    </Typography>
                    <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative", bottom:"30px"  }}>
                    We do our best to ship out all orders on the next business day. But sometimes, if ordered before 11am, we may ship it out the same day. 
                    </Typography>
                    <Typography className="Regular" fontSize={16}  sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative", bottom:"30px"  }}>
                    How will I know when my order shipped?
                     </Typography>
                     <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative", bottom:"30px"  }}>
                     We do our best to ship out all orders on the next business day. But sometimes, if ordered before 11am, we may ship it out the same day. 
                     </Typography>
                     <Typography className="Regular" fontSize={16}  sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative", bottom:"30px"  }}>
                     How will I know when my order shipped?
                      </Typography>
                      <Typography className="Regular" fontSize={16} color={"#bbb"} sx={{ display: "flex", flexDirection: "column", zIndex: 2, position: "relative", bottom:"30px"  }}>
                      We do our best to ship out all orders on the next business day. But sometimes, if ordered before 11am, we may ship it out the same day. 
                      </Typography>
                
                
                
            
        </Grid>
        </Grid>
        </Box>
        </Layout>
      );
    };
    
    export default faq;
    