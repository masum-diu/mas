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

export default function App({ data, link }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // Track the active index

  // Parse the data properly to ensure consistency
  const parsedData = data.map((item, index) => {
    try {
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error parsing item at index ${index}:`, error);
      return []; // Return an empty array for invalid data
    }
  });

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
        {parsedData.map((featureImages, index) => {
          const imageUrl =
            featureImages.length > 0
              ? `${link}/${featureImages[0].replace(/\\/g, "")}` // Clean up any escaped characters
              : "/placeholder.jpg"; // Fallback image

          console.log("Main Image URL:", imageUrl); // Debug log

          return (
            <SwiperSlide key={index}>
              <img
                src={imageUrl}
                alt={`Main slide ${index}`}
                width="100%"
                height="auto"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper} // Link the thumbsSwiper instance
        spaceBetween={10}
        slidesPerView={6} // Adjust the number of visible slides
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {parsedData.map((featureImages, index) => {
          // Ensure `featureImages` is an array of images
          const imageUrls = featureImages.map(
            (image) => `${link}/${image.replace(/\\/g, "")}`
          );

          return imageUrls.map((imageUrl, i) => (
            <SwiperSlide key={`${index}-${i}`}>
              <img
                src={imageUrl}
                alt={`Thumbnail ${index}-${i}`}
                onClick={() => setActiveIndex(index)} // Set active index on click
                style={{
                  border: activeIndex === index ? "2px solid red" : "none", // Highlight active thumbnail
                  cursor: "pointer",
                }}
              />
            </SwiperSlide>
          ));
        })}
      </Swiper>
    </>
  );
}
