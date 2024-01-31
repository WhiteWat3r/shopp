import { createPortal } from 'react-dom';
import style from './Modal.module.scss';
import { Button } from '../../UI/Button/Button';
import { IModalProps } from './ModalTypes';

const modalRoot = document.querySelector('#modal') as HTMLElement;
console.log(modalRoot);

export const Modal = ({ header, text, handleClose,  handleConfirm}:IModalProps ) => {
  return createPortal(
    <div className={style.modal}>
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
    </div>,
    modalRoot,
  );
};
