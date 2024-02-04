import { createPortal } from 'react-dom';
import style from './Modal.module.scss';
import { Button } from '../../UI/Button/Button';
import { IModalProps } from './ModalTypes';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { config } from '../../utils/config';
import { IoMdClose } from 'react-icons/io';

const modalRoot = document.querySelector('#modal') as HTMLElement;
console.log(modalRoot);

export const Modal = ({
  header,
  text,
  handleClose,
  handleConfirm,
  isScreenSlider,
  screens,
  initialSlide,
}: IModalProps) => {
  const onSwiperClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const targetElement = e.target as HTMLElement;

    if (
      !targetElement.closest('.swiper')
    ) {
      handleClose();
    }
  };

  return createPortal(
    <div className={style.modal} onClick={(e) => onSwiperClick(e)}>
      {isScreenSlider ? (
        <div className={style.modal__screenContainer}>
          <button className={style.modal__close}>
            <IoMdClose size={'100%'} />
          </button>
          <Swiper
            spaceBetween={100}
            slidesPerView={1}
            slidesPerGroup={1}
            modules={[Pagination, Navigation, A11y]}
            loop={true}
            pagination={{ clickable: true }}
            navigation={true}
            initialSlide={initialSlide}
            className={'swiper'}>
            {screens?.map((screen, index) => (
              <SwiperSlide key={index} className={style.modal__slide}>
                <img className={style.modal__screen} src={config.baseUrl + '/' + screen} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className={style.modal__container}>
          <h2 className={style.modal__header}>{header}</h2>
          <p>{text}</p>
          <div className={style.modal__nav}>
            <div className={style.modal__buttonContainer}>
              <Button type={'button'} mode={'secondary'} isDisabled={false} onClick={handleClose}>
                Нет
              </Button>
            </div>
            <div className={style.modal__buttonContainer}>
              <Button type={'button'} mode={'primary'} isDisabled={false} onClick={handleConfirm}>
                Да
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>,
    modalRoot,
  );
};
