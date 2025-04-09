import { useState, useEffect } from "react";
import { Box, Card, CardMedia, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { GlassMagnifier, Magnifier } from "react-image-magnifiers";
import "swiper/css";
import { useRouter } from "next/router";

const ThumbsLoopGallery = ({ data, link, id = 1 }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [isClient, setIsClient] = useState(false); // New state to track if we're on the client
  const router = useRouter();

  // Parse the data array
  useEffect(() => {
    setIsClient(true); // Once the component is mounted, set isClient to true
    // console.log("ssdfsdf", data, link);
    if (data) {
      try {
        if (router?.asPath.includes("/wholesale")) {
          const parsed = JSON.parse(data[0]);
          setParsedData(parsed);
          setSelectedImage(parsed[0]);
        } else {
          setParsedData(data);
          setSelectedImage(data[0]); // Set the first image as default
        }
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    }
  }, [data]);
  // console.log("your log output", data[0]);
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  if (!isClient) return null; // Wait until we're on the client

  return (
    <Box sx={{ maxWidth: 700, margin: 1 }}>
      {/* Main Image */}

      {selectedImage && (
        <Card sx={{ marginBottom: 2 }}>
          <GlassMagnifier
            imageSrc={`${
              router.asPath.includes("wholesale")
                ? `${link}/${selectedImage}`
                : selectedImage
            }`}
            imageAlt="Selected Image"
            largeImageSrc={`${
              router.asPath.includes("wholesale")
                ? `${link}/${selectedImage}`
                : selectedImage
            }`}
          />
        </Card>
      )}

      {/* Swiper Thumbnails */}
      <Swiper
        spaceBetween={10}
        slidesPerView="4"
        freeMode={true}
        watchSlidesProgress={true}
        className="thumbsSwiper"
        style={{ paddingBottom: "10px" }}
      >
        {parsedData?.map((image, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                cursor: "pointer",
                border:
                  selectedImage === image
                    ? "2px solid #9A0E20"
                    : "2px solid transparent",
              }}
              onClick={() => handleImageClick(image)}
            >
              <CardMedia
                component="img"
                image={`${
                  router.asPath.includes("wholesale")
                    ? `${link}/${image}`
                    : `${image}`
                }`}
                alt={`Thumbnail ${index + 1}`}
              />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ThumbsLoopGallery;
