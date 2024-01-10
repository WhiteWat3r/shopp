import style from './HomePage.module.scss';
import {Slider} from '../../components/Slider/Slider.jsx';
import GamePreview from '../../components/GamePreview/GamePreview.jsx';
import MainCatalog from '../../components/MainCatalog/MainCatalog.jsx';
import LastSaleItem from '../../components/LastSaleItem/LastSaleItem.jsx';
import { Popular } from '../../components/Popular/Popular.js';

function HomePage() {
  return (
    <>
      <section className={style.sliderBlock}>
        <Slider />
        <div className={style.lastSale}>
          <div className={style.lastSaleHeader}>
            <h3 className={style.header}>Продажи</h3>
          </div>{' '}
          <ul className={style.lastSaleList + ' custom-scroll'}>
            <LastSaleItem />
          </ul>
        </div>
      </section>

<Popular />
      <section className={style.pageContent}>
        <GamePreview />
        <MainCatalog />
      </section>
      
    </>
  );
}

export default HomePage;
