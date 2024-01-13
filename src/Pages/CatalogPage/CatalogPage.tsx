import { FilterParameters } from '../../components/FilterParameters/FilterParameters';
import GamePreview from '../../components/GamePreview/GamePreview';
import MainCatalog from '../../components/MainCatalog/MainCatalog';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import style from './CatalogPage.module.scss';

export const CatalogPage = () => {
  return (
    <div className={style.page}>
      <GamePreview />
      <MainCatalog />

      <FilterParameters />
    </div>
  );
};
