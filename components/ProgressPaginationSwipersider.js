import React from 'react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Typography } from '@mui/material';

function ProgressPaginationSwipersider() {
    return (
        <>

            <Swiper
                modules={[Pagination, Scrollbar, Navigation]}
               
                spaceBetween={20}
                slidesPerView={4}
                navigation={true}
                breakpoints={{
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    // when window width is >= 768px
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    // when window width is >= 1024px
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
               
            >
                <SwiperSlide className=''>
                    <img src="/assets/Margin (1).png" alt="" width={"100%"} />
                    <Typography className="Medium" fontSize={18} textTransform={"uppercase"}  >
                        Multicolor round neck t-shirt
                    </Typography>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/Margin.png" alt="" width={"100%"} />
                    <Typography className="Medium" fontSize={18} textTransform={"uppercase"}  >
                        Hoodies
                    </Typography>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/pant.png" alt="" width={"100%"} />
                    <Typography className="Medium" fontSize={18} textTransform={"uppercase"} pt={4} >
                        Shorts
                    </Typography>
                </SwiperSlide>
                <SwiperSlide className=''>
                    <img src="/assets/tank.jpeg" alt="" width={"100%"}  />
                    <Typography className="Medium" fontSize={18} textTransform={"uppercase"} pt={4} >
                        tank tops
                    </Typography>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/as sets/ThermalWear.jpeg" alt="" width={"100%"}  />
                    <Typography className="Medium" fontSize={18} textTransform={"uppercase"}  pt={4} >
                    Thermal Wear
                    </Typography>
                </SwiperSlide>
            </Swiper>
        </>
    );
}

export default ProgressPaginationSwipersider;
