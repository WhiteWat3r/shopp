import { iButton } from './ButtonTypes';
import classNames from 'classnames';
import style from './Button.module.scss';

export const Button = ({ onClick, type = 'button', children, mode, isDisabled }: iButton) => {
  
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      className={classNames(
        style.button,
        style[mode],
        isDisabled ? style[`${mode}_inactive`] : '',
      )}>
      {children}
    </button>
  );
};
