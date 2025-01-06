import React from "react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Typography from "@mui/material/Typography";

function ProgressPaginationSwiper() {
  // Static slides data
  const slides = [
    {
      feature_image: "/assets/bannernewimage.jpg",
      //   title: "Sustainability Slide 1",
    },
    {
      feature_image: "/assets/bannernewimage.jpg",
      //   title: "Sustainability Slide 1",
    },
    {
      feature_image: "/assets/bannernewimage.jpg",
      //   title: "Sustainability Slide 1",
    },
  ];

  return (
    <Swiper
      modules={[Pagination, Scrollbar, Navigation, Autoplay]}
      pagination={{
        type: "progressbar",
      }}
      spaceBetween={50}
      slidesPerView={1}
      navigation={true}
      autoplay={{
        delay: 3000, // 3 seconds delay
        disableOnInteraction: false, // Continue autoplay even after user interaction
      }}
      style={{ width: "100%", height: "600px" }}
    >
      {slides.length > 0 ? (
        slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              <img
                src={slide.feature_image}
                alt={slide.title || `Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Title Section using Typography */}
              <Typography
                className="Medium"
                fontSize={40}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "40%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  color: "#fff",
                  padding: "10px 20px",
                  textAlign: "left",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                {slide.title}
              </Typography>
            </div>
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <div style={{ textAlign: "center", padding: "20px" }}>
            No slides available.
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
}

export default ProgressPaginationSwiper;
