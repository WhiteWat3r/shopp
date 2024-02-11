import { FilterForm } from '../components/FilterParameters/FilterParameters';
import { IGame } from '../types/gameTypes';
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

const platformsAndPublishersFilter = (array: string[], startArray: IGame[], type: string) => {
  // console.log('массив платформ', array);
  // console.log('массив игр', startArray);
  // console.log('Тип (платформа или издатель)', type);

  return array
    .map((param) =>
      startArray.filter((game) => game[type as 'publisher' | 'platform'].name === param),
    )
    .flat();
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
    res = res.filter((game) => game.price >= filterParams.startCount!);
  }

  if (filterParams.endCount) {
    res = res.filter((game) => game.price <= filterParams.endCount!);
  }

  if (filterParams?.platforms?.length > 0) {
    const filteredArray = platformsAndPublishersFilter(filterParams.platforms, res, 'platform');
    res = [...filteredArray];
  }

  if (filterParams?.publishers?.length > 0) {
    const filteredArray = platformsAndPublishersFilter(filterParams.publishers, res, 'publisher');
    res = [...filteredArray];
  }

  if (filterParams?.genres?.length > 0) {
    const filteredArray = res.filter((game) => {
      const genresArray = game.genres.filter((genre) =>
        filterParams.genres.includes(genre.description),
      );
      // console.log('genresArray', genresArray);

      return genresArray.length > 0 ? true : false;
    });

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
      case 'discount':
        return res.sort((a, b) => b.discount - a.discount);
      case 'popular':
        return res;
      default:
        return res;
    }
  } else return res;
};
