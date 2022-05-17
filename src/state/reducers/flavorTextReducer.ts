import { ActionType } from "../action-types";
import { FlavorTextAction } from "../actions";

interface FlavorTextState {
  flavorTextLoading: boolean;
  flavorTextError: string | null;
  flavorText: any;
}

const initialState = {
  flavorTextLoading: false,
  flavorTextError: null,
  flavorText: {},
};

const reducer = (
  state: FlavorTextState = initialState,
  action: FlavorTextAction
): FlavorTextState => {
  switch (action.type) {
    case ActionType.POKEMON_FLAVORTEXT_LOADING:
      return { flavorTextLoading: true, flavorTextError: null, flavorText: {} };
    case ActionType.POKEMON_FLAVORTEXT_LOADED:
      return {
        flavorTextLoading: false,
        flavorTextError: null,
        flavorText: action.payload,
      };
    case ActionType.POKEMON_FLAVORTEXT_ERROR:
      return {
        flavorTextLoading: false,
        flavorTextError: action.payload,
        flavorText: {},
      };
    case ActionType.POKEMON_FLAVORTEXT_RESET:
      return {
        flavorTextLoading: false,
        flavorTextError: null,
        flavorText: {},
      };
    default:
      return state;
  }
};

export default reducer;
