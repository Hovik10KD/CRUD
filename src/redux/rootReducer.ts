import { combineReducers } from "redux";
import { searchReducer } from "./searchReducer";
import { sortReducer } from "./sortReducer";
import { tasksReducer } from "./tasksReducer";

export const rootReducer = combineReducers({
    tasksReducer,
    searchReducer,
    sortReducer,
});

export type RootState = ReturnType<typeof rootReducer>