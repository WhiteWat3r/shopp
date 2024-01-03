import { IGame } from "../../services/gameTypes";

export interface IBasketItem {
    basketGame: {
        game:IGame;
        id: number;
        gameId: number;
        quantity: number
    };
}