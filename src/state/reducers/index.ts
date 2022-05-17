import { combineReducers } from "redux";
import repositoriesReducer from "./repositoriesReducer";
import flavorTextReducer from "./flavorTextReducer";

const reducers = combineReducers({
  repositories: repositoriesReducer,
  flavorText: flavorTextReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
