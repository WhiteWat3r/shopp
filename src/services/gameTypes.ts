export interface IGame {
  id: number;
  name: string;
  price: number;
  discount: number;
  img: string;
  categoriess: string[];
  categories: ICategorAndGenreType[];
  platformId: number;
  info: string;
  screenshots: string[];
  regions: string;
  publisher: { name: string };
  platform: { name: string };
  supported_languages: string;
  release_date: string;
  categoryIds: number[];
  language: string;
  releaseDate: string;
  preOrderStatus: boolean;
  dlcStatus: boolean;
  soonStatus: boolean;
  steamApi: number;
  genres: ICategorAndGenreType[];
  isFree: boolean;
  imgUrl: string;
  availability: boolean;
  pcRequirements: {[key: string]: string};
}

export interface ICategorAndGenreType {
  id: number;
  description: string;
}
