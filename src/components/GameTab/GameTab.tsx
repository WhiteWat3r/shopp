import { useState } from 'react';
import { DescriptionTab } from '../DescriptionTab/DescriptionTab';
import { RequirementsTab } from '../RequirementsTab/RequirementsTab';
import { ActivationTab } from '../SpecsTab/ActivationTab';
import style from './GameTab.module.scss';
import { ITab } from '../DescriptionTab/DescriptionTabTypes';
import classNames from 'classnames';

export const GameTab = ({ game }: ITab) => {
  const [activeTab, setActiveTab] = useState('description');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return <DescriptionTab game={game} />;
      case 'activation':
        return <ActivationTab game={game} />;
      case 'requirements':
        return <RequirementsTab game={game} />;
      default:
        return null;
    }
  };

  return (
    <>
      <ul className={style.navTab}>
        <li className={style.navTab__item}>
          <button
            className={classNames(style.navTab__button, activeTab === 'description' && style.navTab__button_active)}
            onClick={() => handleTabClick('description')}>
            Описание
          </button>
        </li>
        <li className={style.navTab__item}>
          <button
            className={classNames(style.navTab__button, activeTab === 'activation' && style.navTab__button_active)}
            onClick={() => handleTabClick('activation')}>
            Категории
          </button>
        </li>
        <li className={style.navTab__item}>
          <button
            className={classNames(style.navTab__button, activeTab === 'requirements' && style.navTab__button_active)}
            onClick={() => handleTabClick('requirements')}>
            Системные требования
          </button>
        </li>
      </ul>
      {renderContent()}
    </>
  );
};
