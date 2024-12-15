import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Typography } from "@mui/material";
import instance from "../pages/api/api_instance";

function ProgressPaginationSwipersider() {
  const [products, setProducts] = useState(null);
  const fatchingData = async () => {
    const res = await instance.get("/product?no_paginate=yes&take_some=8");
    setProducts(res?.data?.data);
  };
  useEffect(() => {
    fatchingData();
  }, []);
  return (
    <>
     
        <Swiper
          modules={[Pagination, Scrollbar, Navigation]}
          spaceBetween={20}
          slidesPerView={4}
          navigation={true}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
             {products?.map((product,index) => (
          <SwiperSlide key={index} className="">
            <img src={product?.feature_image} alt="" width={"100%"} />
            <Typography
              className="Medium"
              fontSize={18}
              textTransform={"uppercase"}
            >
              {product?.p_name}
            </Typography>
          </SwiperSlide>
           ))}
        </Swiper>
     
    </>
  );
}

export default ProgressPaginationSwipersider;
