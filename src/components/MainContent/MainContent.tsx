import { IMainContent } from './MainContentTypes';
import style from './MainContent.module.scss';

export const MainContent = ({ children }: IMainContent) => {


  return <div className={style.main}>{children}</div>;
};
