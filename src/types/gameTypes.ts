export interface IGame {
  id: number;
  name: string;
  price: number;
  discount: number;
  img: string;
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
  quantity: number;
}

export interface ICategorAndGenreType {
  id: number;
  description: string;
}


export interface IPublisher{
  id: number;
  name: string;
}




export interface IOrder {
    id: number;
    userId: number;
    orderDate: Date;
    order_basket_games: IOrderGame [];
    totalAmount: number;
}


export interface IOrderGame {
    id: number;
    quantity: number;
    orderId: number;
    gameId: number;
    game: IGame;
    key: string;
}