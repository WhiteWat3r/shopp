export const SET_CURRENT_GAME = 'SET_CURRENT_GAME'

export const ADD_GAMES_START = 'ADD_GAMES_START'
export const ADD_GAMES_SUCCESS = 'ADD_GAMES_SUCCESS'
export const ADD_GAMES_FAIL = 'ADD_GAMES_FAIL'

export const setCurrentGame = (game: any) => {
    return {
        type: SET_CURRENT_GAME,
        payload: game
    }
}
export const addGamesStart = () => {
    return {
        type: ADD_GAMES_START
    }
}

export const addGamesSuccess = (games: any) => {
    return {
        type: ADD_GAMES_SUCCESS,
        payload: games
    }
}

export const addGamesFail = () => {
    return {
        type: ADD_GAMES_FAIL
    }
}