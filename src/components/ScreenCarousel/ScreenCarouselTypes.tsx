import { IGame } from "../../types/gameTypes";

export interface IScreenCarousel  {
    screenshots: IGame [];
    openPopup: (index: number) => void;
}