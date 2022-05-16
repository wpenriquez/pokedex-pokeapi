import { ActionType } from "../action-types";
import { Action } from "../actions";

interface RepositoriesState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState = {
  loading: false,
  error: null,
  data: {},
};

const reducer = (
  state: RepositoriesState = initialState,
  action: Action
): RepositoriesState => {
  switch (action.type) {
    case ActionType.SEARCH_POKEMON:
      return { loading: true, error: null, data: {} };
    case ActionType.SEARCH_POKEMON_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionType.SEARCH_POKEMON_ERROR:
      return { loading: false, error: action.payload, data: {} };
    default:
      return state;
  }
};

export default reducer;
