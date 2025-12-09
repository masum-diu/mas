import { useState, useEffect } from "react";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { GlassMagnifier } from "react-image-magnifiers";
import "swiper/css";

const ThumbsLoopGallery = ({ images, selectedColorId, setSelectedColorId,discount_amount
 }) => {
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
    {/* Main Image */}
{selectedImage && (
  <Card
    sx={{
      marginBottom: 2,
      position: "relative",
      overflow: "visible", // ensure absolutely positioned children are visible
    }}
  >
    {/* Absolute text with high zIndex and a visible color */}
   <Typography
  variant="body1"
  sx={{
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 20,
    background: "linear-gradient(145deg, #B3132C, #262168)",
    color: "#fff",
    width: "95px",
    height: "95px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "18px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    pointerEvents: "none",
    boxShadow: "0px 10px 20px rgba(0,0,0,0.25)",

    // ✨ EXCLUSIVE ANIMATION HERE
    animation: "floatSpin 3s ease-in-out infinite",

    "@keyframes floatSpin": {
      "0%": {
        transform: "translateY(0px) rotate(0deg)",
        boxShadow: "0 0 10px rgba(178, 19, 44, 0.6)",
      },
      "50%": {
        transform: "translateY(-8px) rotate(5deg)",
        boxShadow: "0 0 20px rgba(178, 19, 44, 0.9)",
      },
      "100%": {
        transform: "translateY(0px) rotate(0deg)",
        boxShadow: "0 0 10px rgba(178, 19, 44, 0.6)",
      },
    },
  }}
>
  {discount_amount ? `${discount_amount}` : "No Discount"}
</Typography>


    <GlassMagnifier
      imageSrc={selectedImage}
      imageAlt="Selected Image"
      largeImageSrc={selectedImage}
      magnifierSize="40%"
      magnifierBorderSize={2}
      square={false}
      // optionally ensure the magnifier doesn't create its own stacking context:
      // style={{ position: 'relative', zIndex: 1 }}
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
