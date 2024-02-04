import { IGame } from "../../types/gameTypes";
import { IhandleCartAction } from "../../utils/hooks/useCartActions";

export interface IQuantitySelectorButtonProps {
    countInBasket: number;
    linkToLoad: () => void;
    handleCartAction: IhandleCartAction;
    game:IGame;
}