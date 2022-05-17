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

interface LoadFlavorText {
  type: ActionType.POKEMON_FLAVORTEXT_LOADING;
}

interface FlavorTextLoaded {
  type: ActionType.POKEMON_FLAVORTEXT_LOADED;
  payload: {};
}

interface FlavorTextError {
  type: ActionType.POKEMON_FLAVORTEXT_ERROR;
  payload: string;
}

interface FlavorTextReset {
  type: ActionType.POKEMON_FLAVORTEXT_RESET;
}

export type Action = PokemonSearch | PokemonSearchSuccess | PokemonSearchError;

export type FlavorTextAction =
  | LoadFlavorText
  | FlavorTextLoaded
  | FlavorTextError
  | FlavorTextReset;
