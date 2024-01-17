import { FilterForm } from '../components/FilterParameters/FilterParameters';
import { IGame } from '../services/gameTypes';
import { finishPrice } from './finishPrice';
import { formatAndCheckDate } from './formatAndCheckDate';

// const paramsFilter = (array: string[], startArray: IGame[], type: string) => {
//     let res:IGame[] = []

//     array.forEach(platform => {
//          const filterdArray = startArray.filter(game => game[type].name === platform)
//          if (filterdArray.length > 0) {
//             res = [...res, ...filterdArray]
//          }
//      })
//      console.log('res', res);
//      return res
//  }

const paramsFilter = (array: string[], startArray: IGame[], type: string) => {
  return array.map((platform) => startArray.filter((game) => game[type].name === platform)).flat();
};

export const filterAndSortArray = (
  games: IGame[],
  filterParams: FilterForm,
  sortOption: string,
) => {
  //   console.log('filterParams', filterParams);
  // console.log('games', games);

  let res = [...games];

  if (filterParams.name) {
    res = res.filter((game) => game.name.toLowerCase().includes(filterParams.name.toLowerCase()));
  }

  if (filterParams.startCount) {
    res = res.filter((game) => game.price >= filterParams.startCount);
  }

  if (filterParams.endCount) {
    res = res.filter((game) => game.price <= filterParams.endCount);
  }

  if (filterParams?.platforms?.length > 0) {
    console.log(filterParams.platforms);

    const filteredArray = paramsFilter(filterParams.platforms, res, 'platform');
    res = [...filteredArray];
  }

  if (filterParams?.publishers?.length > 0) {
    console.log(filterParams.publishers);
    const filteredArray = paramsFilter(filterParams.publishers, res, 'publisher');
    res = [...filteredArray];
  }

  // console.log(res);

  if (sortOption) {
    switch (sortOption) {
      case 'novelty':
        return res.sort((a, b) => {
          const dateA = a.releaseDate ? new Date(formatAndCheckDate(a.releaseDate)).getTime() : 0;
          const dateB = b.releaseDate ? new Date(formatAndCheckDate(b.releaseDate)).getTime() : 0;

          return dateB - dateA;
        });
      case 'price':
        return res.sort(
          (a, b) => finishPrice(b.price, b.discount) - finishPrice(a.price, a.discount),
        );
      case 'popular':
        return res;
      default:
        return res;
    }
  } else return res;
};
