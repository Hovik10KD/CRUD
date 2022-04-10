import { SORT_TYPE } from "./types";

const initialState = {
    sortType: 'Date',
}

export const sortReducer = (state = initialState, action) => {
    switch (action.type) {
        case SORT_TYPE:
            return {
                ...state,
                sortType: action.data,
            }
        default:
            return state;
    }
}