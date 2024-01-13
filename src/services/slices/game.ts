import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { cards } from "../../data";
import { IGame } from "../gameTypes";


interface IGameState {
    gamesList: IGame[];
    currentGame: null | IGame;
    addGameLoading: boolean;
    searchedGames: IGame[];
  };

const initialState: IGameState = {
    gamesList: [],
    currentGame: null,
    addGameLoading: false,
    searchedGames: []
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
        },
        setSearchedGames: (state, action: PayloadAction<IGame[]>) => {
            state.searchedGames = action.payload;
        }
    }
})

export const {setGames, setCurrentGame, setSearchedGames} = gamesSlice.actions