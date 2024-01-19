import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import './Slider.scss';
import 'swiper/scss';
import 'swiper/scss/pagination';
import { useAppSelector } from '../../services/store';
import { config } from '../../utils/config';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IGame } from '../../types/gameTypes';
import { SlideInfo } from '../SlideInfo/SlideInfo';

export const Slider = ({}) => {
  const slides = useAppSelector((store) => store.games?.gamesList?.filter(slide => slide.availability))?.slice(-8);

  const [currentSlide, setCurrentSlide] = useState<IGame>({} as IGame);

  // const handleAddToCart = (e: MouseEvent<HTMLInputElement, MouseEvent>) => {
  //   e.preventDefault();
  // };




  const handleSlideChange = (swiper: any) => {
    if (slides) {
      setCurrentSlide(slides[swiper.realIndex]);
    }
  };



  return (
    <section className="section">
      {slides && (
        <>
          <div className={'slider'}>
            <Swiper
              spaceBetween={40}
              slidesPerView={1}
              slidesPerGroup={1}
              // centeredSlides={true}
              modules={[Pagination, Navigation, Autoplay, A11y]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
              // grabCursor={true}
              pagination={{ clickable: true }}
              navigation={true}
              className={'slider__container'}
              onSlideChange={handleSlideChange}>
              {slides?.map((slide, index) => (
                <SwiperSlide
                  key={index}
                  className={'slider__slide'}
                  //  onMouseEnter={() => handleMouseEnter(slide)}
                >
                  <Link to={`/game/${slide.id}`}>
                    <img className={'slider__img'} src={config.baseUrl + '/' + slide.img} />
                    {/* <div className='asd'> */}
                    <div className={'slider__nameBlock'}>
                      <span className={'slider__platform'}>{slide.platform.name}</span>
                      <span>{slide.name}</span>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <SlideInfo slideInfo={currentSlide} />
        </>
      )}
    </section>
  );
};
