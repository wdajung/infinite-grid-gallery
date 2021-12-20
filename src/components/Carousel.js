import SwiperCore, { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { useState } from "react";
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation/navigation.scss"; // Navigation module
import "swiper/modules/pagination/pagination.scss"; // Pagination module
import "./Carousel.css";

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);

export default function Carousel({ photos }) {
    return (
        <>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                keyboard={true}
                className='mySwiper'
                effect={"fade"}
                loop={true}
            >
                {photos.map((photo, index) => (
                    <SwiperSlide key={index} className='shadow'>
                        <div className='img_box'>
                            <img src={photo.download_url} />
                        </div>
                        <div className='desc'>
                            <span>#{photo.id}</span>
                            <span>author: {photo.author}</span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
