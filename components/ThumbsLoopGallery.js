import { useState, useEffect } from "react";
import { Box, Card, CardMedia, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
const ThumbsLoopGallery = ({ data, link }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [parsedData, setParsedData] = useState([]);

  // Parse the data array
  useEffect(() => {
    if (data && typeof data[0] === "string") {
      try {
        const parsed = JSON.parse(data[0]);
        setParsedData(parsed);
        setSelectedImage(parsed[0]); // Set the first image as default
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    }
  }, [data]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", textAlign: "center" }}>
      {/* Main Image */}
      {selectedImage && (
        <Card sx={{ marginBottom: 2 }}>
          <CardMedia
            component="img"
            image={`${link}/${selectedImage}`}
            alt="Selected Image"
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
        style={{ paddingBottom: "10px", }}
      >
        {parsedData?.map((image, index) => (
         
            <SwiperSlide key={index}  >
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
                  image={`${link}/${image}`}
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
