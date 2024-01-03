import style from './HomePage.module.scss';
import {Slider} from '../../components/Slider/Slider.jsx';
import GamePreview from '../../components/GamePreview/GamePreview.jsx';
import MainCatalog from '../../components/MainCatalog/MainCatalog.jsx';
import LastSaleItem from '../../components/LastSaleItem/LastSaleItem.jsx';

function HomePage() {
  return (
    <div>
      <div className={style.sliderBlock}>
        <Slider />
        <div className={style.lastSale}>
          <div className={style.lastSaleHeader}>
            <h3 className={style.header}>Продажи</h3>
          </div>{' '}
          <ul className={style.lastSaleList + ' custom-scroll'}>
            <LastSaleItem />
          </ul>
        </div>
      </div>
      <section className={style.pageContent}>
        <GamePreview />
        <MainCatalog />
      </section>
    </div>
  );
}

export default HomePage;
