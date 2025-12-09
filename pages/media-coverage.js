import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Typography from "@mui/material/Typography";
import { Box, Grid, Card, CardContent, CardMedia } from "@mui/material";
import instance from "../pages/api/api_instance";

const MediaCoverage = () => {
    const [mediaData, setMediaData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from the API
    const fetchMediaData = async () => {
        try {
            setLoading(true);
            // Assuming the endpoint for media coverage is /media-coverage
            const res = await instance.get("/media-coverage");
            console.log(res, "res");
            // Assuming the data is an array of media items
            setMediaData(res?.data?.data || []);
            setError(null); // Clear previous errors
        } catch (err) {
            console.error("Error fetching media data:", err);
            setError("Failed to load media coverage.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMediaData();
    }, []);

    if (loading) {
        return (
            <Layout>
                <Typography>Loading...</Typography>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <Typography color="error">{error}</Typography>
            </Layout>
        );
    }

    return (
        <Layout>
            <Box
                sx={{
                    width: "90%",
                    maxWidth: "1500px",
                    margin: "0 auto",
                    py: 4,
                }}
            >

                <Grid container spacing={4}>
                    {mediaData.length > 0 ? (
                        mediaData.map((item) => (
                            <Grid item key={item.id} >
                                <Typography className="Medium" fontSize={40} textAlign={"justify"}>
                                    {item?.title}
                                </Typography>
                                <Typography className="Regular" fontSize={18} textAlign={"justify"}>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: item?.description }}
                                    />
                                </Typography>
                            </Grid>
                        ))
                    ) : (
                        <Typography sx={{ mt: 2, ml: 2 }}>No media coverage found.</Typography>
                    )}
                </Grid>
            </Box>
        </Layout>
    );
};

export default MediaCoverage;