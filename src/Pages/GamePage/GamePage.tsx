import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import steam from '../../assets/steam.png';
import DescriptionTab from '../../components/DescriptionTab/DescriptionTab';
import SpecsTab from '../../components/SpecsTab/SpecsTab';
import RequirementsTab from '../../components/RequirementsTab/RequirementsTab';

import style from './GamePage.module.scss';
import Loader from '../../components/Loader/Loader.tsx';
import LastSaleItem from '../../components/LastSaleItem/LastSaleItem';
import { addGameToCart } from '../../utils/api';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { IGame } from '../../services/gameTypes';
import { FaPenAlt } from "react-icons/fa";
import { cards } from '../../data.ts';

function GamePage() {
  const [activeTab, setActiveTab] = useState('description');




  const userRole = useAppSelector(store => store.user?.user?.role)


  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const dispatch = useAppDispatch();

  const { gameId } = useParams();
  
  const games = useAppSelector((store) => store.games.gamesList) || [];

  const game = games.find((item: IGame) => {
    if (gameId !== undefined) {
      return item.id === parseInt(gameId);
    }
  }) || cards[0];

  // console.log(game.screenshots);
  console.log(game, 'game');
  



  const finishPrice = game.price - (game.price * game.discount) / 100;




  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return <DescriptionTab game={game} />;
      case 'specs':
        return <SpecsTab game={game} />;
      case 'requirements':
        return <RequirementsTab game={game} />;
      default:
        return null;
    }
  };

  const handleAddToCart = () => {
    dispatch(addGameToCart(game.id));
  };

  return (
    <section className={style.section}>
      {!game ? (
        <Loader />
      ) : (
        <div className={style.card}>

        <div className={style.card__header}>
          <h1 className={style.name}>{game.name}</h1>

          {userRole === 'ADMIN' && <Link className={style.card__adminLink} to={`/admin/game/${game.id}`}><FaPenAlt size={23}/>
</Link>}
          </div>

          <div className={style.content}>
            <img src={game.img} alt="" className={style.poster} />
            <div className={style.info}>
              <p className={style.inStock}>Есть в наличии</p>

              <div className={style.priceBlock}>
                <h3 className={style.cost}>{Math.round(finishPrice)} ₽</h3>
                <p className={style.discount}>-{game.discount}%</p>/
                <p className={style.oldPrice}>{game.price}</p>
              </div>

              <div className={style.infoItem}>
                <p className={style.parameters}>Активация: </p>{' '}
                <img src={steam} alt="" className={style.logo} />
              </div>

              <div className={style.infoItem}>
                <p className={style.parameters}>Язык: Русский</p>
              </div>

              <div className={style.infoItem}>
                <p className={style.parameters}>Дата выхода: </p> <p>28.03.2001</p>
              </div>

              <div className={style.buttons}>
                <button className={style.addDesired}>В список желаемого</button>

                <button className={style.buyButton} onClick={handleAddToCart}>
                  Купить
                </button>
              </div>
            </div>
          </div>

          {game.screenshots && (
            <ul className={style.gameScreenshots + ' custom-scroll'}>
              <li className={style.gameScreen}>
                <img className={style.screen} src={game.img} alt={game.name} />
              </li>
              {game.screenshots.map((screen: string, index: number) => (
                <li className={style.gameScreen} key={index}>
                  <img className={style.screen} src={screen} alt={game} />
                </li>
              ))}
            </ul>
          )}

          <ul className={style.navTab}>
            <li>
              <button
                className={activeTab === 'description' ? style.activeButton : style.inactiveButton}
                onClick={() => handleTabClick('description')}>
                Описание
              </button>
            </li>
            <li>
              <button
                className={activeTab === 'specs' ? style.activeButton : style.inactiveButton}
                onClick={() => handleTabClick('specs')}>
                Категории
              </button>
            </li>
            <li>
              <button
                className={activeTab === 'requirements' ? style.activeButton : style.inactiveButton}
                onClick={() => handleTabClick('requirements')}>
                Системки
              </button>
            </li>
          </ul>
          <div className={style.container}>{renderContent()}</div>
          <div className={style.similar}>
            <p className={style.similarHeader}>Похожие игры</p>
            <ul className={style.similarList}>
              <LastSaleItem />
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

export default GamePage;
