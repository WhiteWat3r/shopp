import classNames from 'classnames';
import style from './Message.module.scss';
import { IMesasageProps } from './MessageTypes';
import { timeFormat } from '../../utils/formatAndCheckDate';

export const Message = ({ message, type }: IMesasageProps) => {
  const { russianDate, time } = timeFormat(message.createdAt);

  const { russianDate: currentDate } = timeFormat(new Date());

  // console.log(type);

  // const finishTime =

  return (
    <li
      className={classNames(
        style.message,
        message.isAdminMessage
          ? type === 'user'
            ? style.message_from_admin
            : style.message_from_user
          : type === 'admin'
          ? style.message_from_admin
          : style.message_from_user,
      )}>
      <p className={style.message__content}>{message?.content}</p>
      <span className={style.message__time}>
        {russianDate === currentDate ? 'Сегодня' : russianDate} {time}
      </span>
    </li>
  );
};
