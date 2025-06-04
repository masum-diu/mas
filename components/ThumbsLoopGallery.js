import { useState, useEffect } from "react";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { GlassMagnifier } from "react-image-magnifiers";
import "swiper/css";

const ThumbsLoopGallery = ({ images, selectedColorId, setSelectedColorId }) => {
  const [groupedImages, setGroupedImages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  // Group images by color_id on load
  useEffect(() => {
    if (images?.length) {
      const grouped = images.reduce((acc, item) => {
        const colorId = item.color_id;
        if (!acc[colorId]) acc[colorId] = [];
        acc[colorId].push(item.image);
        return acc;
      }, {});

      setGroupedImages(grouped);

      // Set default color ID and first image
      const firstColorId = Object.keys(grouped)[0];
      setSelectedColorId(firstColorId);
    }
  }, [images]);

  // Update selectedImage when selectedColorId changes
  useEffect(() => {
    if (selectedColorId && groupedImages[selectedColorId]) {
      setSelectedImage(groupedImages[selectedColorId][0]);
    }
  }, [selectedColorId, groupedImages]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  if (!selectedColorId || !groupedImages[selectedColorId]) return null;

  return (
    <Box sx={{ maxWidth: 700, margin: 1 }}>
      {/* Main Image */}
      {selectedImage && (
        <Card sx={{ marginBottom: 2 }}>
          <GlassMagnifier
            imageSrc={selectedImage}
            imageAlt="Selected Image"
            largeImageSrc={selectedImage} // Make sure this is a high-res image
            magnifierSize="40%" // Increase this for a bigger glass
            magnifierBorderSize={2}
            square={false} // Optional: set to true for square magnifier
          />
        </Card>
      )}

      {/* Swiper Thumbnails */}
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        className="thumbsSwiper"
        style={{ paddingBottom: "10px" }}
      >
        {groupedImages[selectedColorId].map((img, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                cursor: "pointer",
                border:
                  selectedImage === img
                    ? "2px solid #9A0E20"
                    : "2px solid transparent",
              }}
              onClick={() => handleImageClick(img)}
            >
              <CardMedia
                component="img"
                image={img}
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
