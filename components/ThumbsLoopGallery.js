import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function App({ data }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // Track the active index

  return (
    <>
      {/* Main Swiper */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        modules={[FreeMode, Navigation, Thumbs]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Track active slide
        className="mySwiper2"
      >
        {data.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Main slide ${index}`} width={"100%"} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper} // Link the thumbsSwiper instance
        spaceBetween={10}
        slidesPerView={10}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {data.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Thumbnail ${index}`}
              onClick={() => setActiveIndex(index)} // Set active index on click
              style={{
                border: activeIndex === index ? "2px solid red" : "none", // Highlight active thumbnail
                cursor: "pointer",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
