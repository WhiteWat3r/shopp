import { IMainContent } from './MainContentTypes';
import style from './MainContent.module.scss';
import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

export const MainContent = ({ children }: IMainContent) => {
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);


  return <div className={style.main}>{children}</div>;
};
