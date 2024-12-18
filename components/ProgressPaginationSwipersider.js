import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Typography, CircularProgress, Stack } from "@mui/material";
import instance from "../pages/api/api_instance";
import Link from "next/link";

function ProgressPaginationSwipersider() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

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


  const fallbackImage = "https://via.placeholder.com/200";

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <Swiper
          modules={[Pagination, Scrollbar, Navigation]}
          spaceBetween={20}
          slidesPerView={4}
          navigation={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {products?.map((product, index) => (
            <SwiperSlide
              key={index}
              style={{ background: "none", width: "200px", height: "200px" }}
            >
              <Link href={`/product-category/${product?.slug}/${product?.id}`} passHref>
                <Stack
                  direction={"column"}
                  spacing={1}
                  alignItems="center"
                  style={{ width: "100%", height: "100%" }}
                >
                  {/* Image with fallback in case of error */}
                  <img
                    src={product?.
                      category_feature_image
                      || fallbackImage} // Use fallback if no image is found
                    alt={product?.cat_name || "Category"} // Alt text for missing category name
                    style={{
                      width: "100%",
                      height: "100%", // Adjust image height
                      objectFit: "cover",
                      background: "none",
                    }}
                  />
                  {/* Category Name displayed below the image */}
                  <Typography
                    className="Medium"
                    fontSize={18}
                    color={"red"}
                    textTransform={"uppercase"}
                    style={{
                      textAlign: "center",
                      background: "none",
                      marginTop: "10px", // Add some spacing
                    }}
                  >
                    {product?.cat_name || "No Category Name"} {/* Fallback text if category name is missing */}
                  </Typography>
                </Stack>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

export default ProgressPaginationSwipersider;
