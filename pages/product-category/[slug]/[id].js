import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import instance from '../../api/api_instance';

const ProductCategory = () => {
    const router = useRouter();
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(false);
    const { slug, id } = router.query; // Access dynamic parameters

    // Fetch product data
    const fetchingData = async () => {
        try {
            setLoading(true);
            const res = await instance.get(`/product/${id}`);
            setProducts(res?.data?.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchingData();
        }
    }, [id]);

    const handleNavigation = (productId) => {
        router.push(`/singleproduct/${productId}`);
    };

    if (!slug || !id) {
        return <p>Loading...</p>;
    }

    return (
        <Layout>
            <Box sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}>
                <Grid container spacing={2} py={8}>
                    {loading ? (
                        <div className="loading-container">
                            <CircularProgress />
                        </div>
                    ) : (
                        products?.map((product, index) => {
                            // Parse feature_image if it's a JSON string
                            const featureImages = product?.feature_image ? JSON.parse(product.feature_image) : [];
                            const imageUrl = featureImages.length > 0
                                ? `${product.img_path}/${featureImages[0]}` // Use the first image
                                : "/placeholder.jpg"; // Fallback image

                            return (
                                <Grid
                                    item
                                    lg={3}
                                    sm={6}
                                    key={index}
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => handleNavigation(product.id)}
                                >
                                    <img
                                        src={imageUrl}
                                        alt={product?.p_name || "Product Image"}
                                        width="100%"
                                    />
                                    <Typography
                                        className="Medium"
                                        fontSize={18}
                                        textTransform={"uppercase"}
                                    >
                                        {product?.p_name}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleNavigation(product.id)}
                                    >
                                        View Details
                                    </Button>
                                </Grid>
                            );
                        })
                    )}
                </Grid>
            </Box>
        </Layout>
    );
};

export default ProductCategory;
