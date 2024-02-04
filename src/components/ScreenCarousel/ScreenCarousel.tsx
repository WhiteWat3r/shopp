import { config } from '../../utils/config';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';

import './ScreenCarousel.scss';
import { IScreenCarousel } from './ScreenCarouselTypes';

export const ScreenCarousel = ({ screenshots, openPopup}: IScreenCarousel) => {
  return (
    <div className={'carousel'}>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        modules={[Pagination, Autoplay, Navigation, A11y]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        // grabCursor={true}
        pagination={{ clickable: true }}
        navigation={true}
        className={'carousel__screenshots'}>
        {screenshots.map((screen, index) => (
          <SwiperSlide
            key={index}
            // onClick={(e) => handleSetScreen(e)}
            //   className={'carousel__screen'}
            onClick={() => openPopup(index)}
          >
            <img
              src={config.baseUrl + '/' + screen}
              alt={'скриншот'}
              className={'carousel__screen'}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
