import { FilterParameters } from '../../components/FilterParameters/FilterParameters';
import GamePreview from '../../components/GamePreview/GamePreview';
import MainCatalog from '../../components/MainCatalog/MainCatalog';
import { Sort } from '../../components/Sort/Sort';
import style from './CatalogPage.module.scss';

export const CatalogPage = () => {
  return (
    <div className={style.page}>
      <h1 className={style.page__header}>Каталог</h1>
      <div className={style.page__container}>
        <GamePreview />

        <div className={style.page__sort}>

          <Sort />

          <MainCatalog />
        </div>

        <FilterParameters />
      </div>
    </div>
  );
};
