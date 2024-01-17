import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { cards } from "../../data";
import { IGame } from "../gameTypes";


interface IGameState {
    gamesList: IGame[];
    currentGame: null | IGame;
    addGameLoading: boolean;
    searchedGames: IGame[];
    sortOption: string;
  };

const initialState: IGameState = {
    gamesList: [],
    currentGame: null,
    addGameLoading: false,
    searchedGames: [],
    sortOption: ''
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
        },
        setSortSettings: (state, action: PayloadAction<string>) => {
            state.sortOption = action.payload;
        }
    }
})

export const {setGames, setCurrentGame, setSearchedGames, setSortSettings} = gamesSlice.actions