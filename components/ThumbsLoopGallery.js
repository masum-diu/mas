// import { useState, useEffect } from "react";
// import { Box, Card, CardMedia, Stack } from "@mui/material";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { GlassMagnifier, Magnifier } from "react-image-magnifiers";
// import "swiper/css";
// import { useRouter } from "next/router";

// const ThumbsLoopGallery = ({ data, link, id = 1 }) => {

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [parsedData, setParsedData] = useState([]);
//   const [isClient, setIsClient] = useState(false); // New state to track if we're on the client
//   const router = useRouter();
//   // console.log(router, "data");
//   // Parse the data array
//   useEffect(() => {
//     setIsClient(true); // Once the component is mounted, set isClient to true
//     // console.log("ssdfsdf", data, link);
//     if (data) {
//       try {
//         if (router?.asPath) {
//           const parsed = JSON.parse(data[0]);
//           setParsedData(parsed);
//           setSelectedImage(parsed[0]);
//         } else {
//           setParsedData(data);
//           setSelectedImage(data[0]); // Set the first image as default
//         }
//       } catch (error) {
//         console.error("Error parsing data:", error);
//       }
//     }
//   }, [data]);
//   // console.log("your log output", data[0]);
//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   if (!isClient) return null; // Wait until we're on the client

//   return (
//     <Box sx={{ maxWidth: 700, margin: 1 }}>
//       {/* Main Image */}

//       {selectedImage && (
//         <Card sx={{ marginBottom: 2 }}>
//           <GlassMagnifier
//             imageSrc={`${
//               router.asPath
//                 ? `${link}/${selectedImage}`
//                 : selectedImage
//             }`}
//             imageAlt="Selected Image"
//             largeImageSrc={`${
//               router.asPath
//                 ? `${link}/${selectedImage}`
//                 : selectedImage
//             }`}
//           />
//         </Card>
//       )}

//       {/* Swiper Thumbnails */}
//       <Swiper
//         spaceBetween={10}
//         slidesPerView="4"
//         freeMode={true}
//         watchSlidesProgress={true}
//         className="thumbsSwiper"
//         style={{ paddingBottom: "10px" }}
//       >
//         {parsedData?.map((image, index) => (
//           <SwiperSlide key={index}>
//             <Card
//               sx={{
//                 cursor: "pointer",
//                 border:
//                   selectedImage === image
//                     ? "2px solid #9A0E20"
//                     : "2px solid transparent",
//               }}
//               onClick={() => handleImageClick(image)}
//             >
//               <CardMedia
//                 component="img"
//                 image={`${
//                   router.asPath
//                     ? `${link}/${image}`
//                     : `${image}`
//                 }`}
//                 alt={`Thumbnail ${index + 1}`}
//               />
//             </Card>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </Box>
//   );
// };

// export default ThumbsLoopGallery;

import { useState, useEffect } from "react";
import { Box, Card, CardMedia } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { GlassMagnifier } from "react-image-magnifiers";
import "swiper/css";

const ThumbsLoopGallery = ({ data, link }) => {
  console.log('your log output', data);
  const [selectedImage, setSelectedImage] = useState(null); // Track the selected image
  const [parsedData, setParsedData] = useState([]); // Parsed image data

  // Parse the data array and set the default selected image
  useEffect(() => {
    if (data && data.length > 0) {
      setParsedData(data); // Use the provided data directly
      setSelectedImage(data[0]); // Set the first image as the default
    }
  }, [data]);

  const handleImageClick = (image) => {
    setSelectedImage(image); // Update the selected image when a thumbnail is clicked
  };

  return (
    <Box sx={{ maxWidth: 700, margin: 1 }}>
      {/* Main Image */}
      {selectedImage && (
        <Card sx={{ marginBottom: 2 }}>
          <GlassMagnifier
            imageSrc={selectedImage} 
            imageAlt="Selected Image"
            largeImageSrc={selectedImage} // Magnified version of the image
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
        {parsedData?.map((image, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                cursor: "pointer",
                border:
                  selectedImage === image
                    ? "2px solid #9A0E20" // Highlight the selected thumbnail
                    : "2px solid transparent",
              }}
              onClick={() => handleImageClick(image)} // Handle thumbnail click
            >
              <CardMedia
                component="img"
                image={image} // Display the thumbnail image
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
