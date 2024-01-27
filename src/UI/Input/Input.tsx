import style from './Input.module.scss';
import classNames from 'classnames';
import { IInput } from './InputTypes';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const Input = ({
  type,
  mode,
  onChange,
  validation,
  id,
  labelText,
  checked,
  visible,
  onButtonClick,
}: IInput) => {
  return (
    <div className={classNames(style.container, style[`container_${mode}`])}>
      {labelText && <label htmlFor={id}>{labelText}</label>}

      <input
        {...validation}
        id={id}
        type={type}
        className={classNames(style.input, style[mode])}
        onChange={onChange}
        checked={checked}
      />
      {onButtonClick && (
        <button type="button" className={style.input__check} onClick={onButtonClick}>
          {visible ? <FaEyeSlash size={'100%'} /> : <FaEye size={'100%'} />}
        </button>
      )}
    </div>
  );
};
