import { SEARCH } from "./types"

const initialState = {
    searchParams: '',
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH:
            return {
                ...state,
                searchParams: action.text,
            }
        default:
            return state;
    }
}