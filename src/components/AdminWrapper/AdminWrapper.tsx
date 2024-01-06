import style from './AdminWrapper.module.scss';
import { IAdminWrapper } from './AdminWrapperTypes';

export const AdminWrapper = ({ children }: IAdminWrapper) => {
  return <div className={style.admWrapper}>{children}</div>;
};
