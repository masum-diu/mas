import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Typography, Stack } from "@mui/material";
import instance from "../pages/api/api_instance";
import Link from "next/link";
import static_category_list from "../public/data/static_category_list.json";
import { useRouter } from "next/router";

function ProgressPaginationSwipersider({ setTabId }) {
  const [products, setProducts] = useState(null);
  const router = useRouter(); // Initialize useRouter
  const id = localStorage.getItem("selectedItemId");
  const fatchingData = async () => {
    try {
      const res = await instance.get(`/v1/sub-category?category=${id}`);
      setProducts(res?.data?.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fatchingData();
  }, [id]);

  // let conditionalProducts = router?.asPath.includes("/wholesale")
  //   ? products
  //   : products;

  const fallbackImage = "https://via.placeholder.com/200";

  return (
    <Swiper
      modules={[Pagination, Scrollbar, Navigation]}
      spaceBetween={20}
      slidesPerView={6}
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
          slidesPerView: 6,
          spaceBetween: 20,
        },
      }}
    >
      {products?.map((product, index) => {
        return (
          <SwiperSlide key={product?.id} onClick={() => setTabId(product?.id)}>
            <Stack direction={"column"} spacing={1} alignItems="left">
              {/* Category Name displayed below the image */}
              <Typography
                sx={{ cursor: "pointer" }}
                className="Medium"
                fontSize={18}
                color={"#fffff"}
                textTransform={"uppercase"}
                style={{
                  textAlign: "left",
                  background: "none",
                  marginTop: "10px",
                }}
              >
                {product?.name || "No Category Name"}{" "}
                {/* Fallback text if category name is missing */}
              </Typography>
            </Stack>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default ProgressPaginationSwipersider;
