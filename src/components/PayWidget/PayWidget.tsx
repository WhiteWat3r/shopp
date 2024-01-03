import { AiFillCreditCard } from 'react-icons/ai';
import style from './PayWidget.module.scss';
import { SiQiwi, SiWebmoney } from 'react-icons/si';
import { BsFillPhoneFill, BsPaypal } from 'react-icons/bs';
import { PayForm } from '../PayForm/PayForm';

export const PayWidget = () => {


  return (
    <div className={style.payBlock}>
      <div className={style.cardDetails}>
        <h2 className={style.cardDetailsHeader}>Детали оплаты</h2>
        <p className={style.paymentMethodsHeader}>Способ</p>

        <ul className={style.paymentMethods}>
          <li>
            <AiFillCreditCard size={40} />
          </li>
          <li>
            <SiQiwi size={40} />
          </li>
          <li>
            <BsPaypal size={40} />
          </li>
          <li>
            <SiWebmoney size={40} />
          </li>
          <li>
            <BsFillPhoneFill size={40} />
          </li>
        </ul>

<PayForm />
      </div>
    </div>
  );
};
