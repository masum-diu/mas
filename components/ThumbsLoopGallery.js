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
import Image from "next/image";

export default function App({ data, link }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // Track the active index
  const [isMagnifying, setIsMagnifying] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });

  // Parse the data properly to ensure consistency
  const parsedData = data.map((item, index) => {
    try {
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error parsing item at index ${index}:`, error);
      return []; // Return an empty array for invalid data
    }
  });

  const handleMouseMove = (e, img) => {
    if (isMagnifying) {
      const { left, top, width, height } = img.getBoundingClientRect();
      const offsetX = e.clientX - left;
      const offsetY = e.clientY - top;

      const x = (offsetX / width) * 100;
      const y = (offsetY / height) * 100;

      setMagnifierPosition({ x, y });
    }
  };

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
          // Ensure `featureImages` is an array of images
          const imageUrls = featureImages.map(
            (image) => `${link}/${image.replace(/\\/g, "")}`
          );

          return imageUrls.map((imageUrl, i) => (
            <SwiperSlide key={`${index}-${i}`}>
              <div
                className="magnifying-container"
                onMouseEnter={() => setIsMagnifying(true)}
                onMouseLeave={() => setIsMagnifying(false)}
              >
                <Image
                  src={imageUrl}
                  onMouseMove={(e) => handleMouseMove(e, e.target)}
                  onClick={() => setActiveIndex(index)} // Set active index on click
                  alt={`Image ${index}-${i}`}
                  width={500}
                  height={850}
                  objectFit="cover"
                />
                {isMagnifying && (
                  <div
                    className="magnifier"
                    style={{
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: "800%", // Zoom level (increase size to zoom more)
                      backgroundPosition: `${magnifierPosition.x}% ${magnifierPosition.y}%`, // Show the specific part under the cursor
                      left: `${magnifierPosition.x}%`,
                      top: `${magnifierPosition.y}%`,
                    }}
                  />
                )}
              </div>
            </SwiperSlide>
          ));
        })}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        style={{ marginTop: 5 }}
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
                  border: activeIndex === index ? "2px solid #9A0E20" : "none", // Highlight active thumbnail
                  cursor: "pointer",
                }}
              />
            </SwiperSlide>
          ));
        })}
      </Swiper>

      {/* Add the necessary styles for magnification */}
      <style jsx>{`
        .magnifying-container {
          position: relative;
          display: inline-block;
        }

        .magnifier {
          position: absolute;
          border-radius: 50%;
          width: 100px; /* Size of the magnifying glass */
          height: 100px;
          border: 3px solid #9a0e20;
          pointer-events: none;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 200%; /* Zoom level */
          display: none;
          transform: translate(-50%, -50%);
        }

        .magnifying-container:hover .magnifier {
          display: block;
        }
      `}</style>
    </>
  );
}
