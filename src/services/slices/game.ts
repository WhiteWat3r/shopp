import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { cards } from "../../data";
import { IGame } from "../gameTypes";


interface IGameState {
    gamesList: IGame[];
    currentGame: null | IGame;
    addGameLoading: boolean;
  };

const initialState: IGameState = {
    gamesList: cards,
    currentGame: null,
    addGameLoading: false,
  };


export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setCurrentGame: ( state, action: PayloadAction<IGame>) => {
            state.currentGame = action.payload;
        },
        setGames: (state, action: PayloadAction<IGame[]>) => {
            state.gamesList = action.payload;
        }
    }
})

export const {setGames, setCurrentGame} = gamesSlice.actions