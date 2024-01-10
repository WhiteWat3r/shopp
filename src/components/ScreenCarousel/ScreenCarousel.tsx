import { config } from '../../utils/request';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';

import './ScreenCarousel.scss';
import 'swiper/scss';
import 'swiper/scss/pagination';

export const ScreenCarousel = ({ screenshots, setCurrentImg }) => {
  const swiper = useSwiper();

  console.log(swiper);

  return (
      <div className={'carousel'}>


        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          modules={[Pagination, Autoplay, Navigation, A11y]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          grabCursor={true}
          pagination={{ clickable: true }}
          navigation={true}
          className={'carousel__screenshots'}
          onSwiper={(swiper) => console.log(swiper)}
        //   onSlideChange={() => console.log('slide change')}
        >

{/* <button
          className={`${style.carousel__button} ${style.carousel__button_left}`}
          onClick={() => swiper.slidePrev()}>
          <IoMdArrowDropleft size={35} />
        </button> */}



          {screenshots.map((screen, index) => (
            <SwiperSlide
              key={index}
              // onClick={(e) => handleSetScreen(e)}
            //   className={'carousel__screen'}

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
