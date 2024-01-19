import { IGame } from "./gameTypes";

export interface IBasketGame {
    game: IGame;
    basketId: number;
    id: number;
    gameId: number;
    quantity: number;
}