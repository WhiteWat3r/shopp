import style from './Input.module.scss';
import classNames from 'classnames';
import { IInput } from './InputTypes';

export const Input = ({ type, mode, onChange, validation, id, labelText, checked }: IInput) => {
  return (
    <div className={classNames(style.container, style[`container_${mode}`])}>
      <label htmlFor={id}>{labelText}</label>
      <input {...validation} id={id} type={type} className={classNames(style.input, style[mode])} onChange={onChange} checked={checked}/>
    </div>
  );
};
