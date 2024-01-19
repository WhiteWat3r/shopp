import { ICategorAndGenreType } from '../types/gameTypes';
import { genres } from './constants';

export const formatRussianGenres = (gameGenres: ICategorAndGenreType[]) => {
  return genres
    .filter((genre) => gameGenres?.some((gameGenre) => genre.description === gameGenre.description))
    .map((genre) => genre.translation)
    .slice(0, 3)
    .join(', ');
};
