import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Typography, Stack } from "@mui/material";
import instance from "../pages/api/api_instance";
import static_category_list from "../public/data/static_category_list.json";
import { useRouter } from "next/router";

function ProgressPaginationSwipersider({ setTabId }) {
  const [categories, setCategories] = useState([]);
  const router = useRouter(); // Initialize useRouter
  console.log(categories, "categories");

  const fetchingData = async () => {
    try {
      const res = await instance.get("/category-list");
      if (router?.asPath.includes("/wholesale")) {
        setCategories(res?.data?.data);
        console.log("inside else");
      } else {
        setCategories(static_category_list);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, [router]);

  // // Use categories for wholesale, static_category_list for others
  // let conditionalProducts = router?.asPath.includes("/wholesale")
  //   ? categories // Use fetched categories for wholesale
  //   : static_category_list; // Use static data for non-wholesale

  const fallbackImage = "https://via.placeholder.com/200";

  return (
    <Swiper
      modules={[Pagination, Scrollbar, Navigation]}
      spaceBetween={20}
      slidesPerView={6}
      navigation={true}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 15,
        },
      }}
    >
      {/* Map over the categories */}
      {categories?.map((category) => (
        <React.Fragment key={category.id}>
          {/* Map over the children of each category */}
          {category.children?.map((child) => (
            <SwiperSlide key={child.id} onClick={() => setTabId(child.id)}>
              <Stack direction={"column"} spacing={1} alignItems="left">
                {/* Display child category name */}
                <Typography
                  sx={{ cursor: "pointer" }}
                  className="Medium"
                  fontSize={18}
                  color={"#fffff"}
                  textTransform={"uppercase"}
                  style={{
                    textAlign: "left",
                    background: "none",
                    marginTop: "10px",
                  }}
                >
                  {child.category_name || "No Category Name"}
                </Typography>
              </Stack>
            </SwiperSlide>
          ))}
        </React.Fragment>
      ))}
    </Swiper>
  );
}

export default ProgressPaginationSwipersider;
