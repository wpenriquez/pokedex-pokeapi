import { ActionType } from "../action-types";

interface PokemonSearch {
  type: ActionType.SEARCH_POKEMON;
}

interface PokemonSearchSuccess {
  type: ActionType.SEARCH_POKEMON_SUCCESS;
  payload: {};
}

interface PokemonSearchError {
  type: ActionType.SEARCH_POKEMON_ERROR;
  payload: string;
}

export type Action = PokemonSearch | PokemonSearchSuccess | PokemonSearchError;
