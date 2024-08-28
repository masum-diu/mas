import React from 'react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function ProgressPaginationSwiper() {
    return (
        <>

            <Swiper
                modules={[Pagination, Scrollbar, Navigation]}
                pagination={{
                    type: 'progressbar',
                }}
                spaceBetween={50}
                slidesPerView={1}
                navigation={true}
                // loop={true}
                style={{ width: '100%', height: '600px' }}
            >
                <SwiperSlide className=''>
                    <div style={{ width: '100%', height: '100%', }}>
                        <img src="/assets/Section (1).png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ width: '100%', height: '100%', }}>
                        <img src="/assets/Section (1).png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ width: '100%', height: '100%', }}>
                        <img src="/assets/Section (1).png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </SwiperSlide>

            </Swiper>
        </>
    );
}

export default ProgressPaginationSwiper;
