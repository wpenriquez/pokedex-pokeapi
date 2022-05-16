import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";

export const searchPokemon = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SEARCH_POKEMON,
    });

    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${term}`
      );

      const pokemon = data;

      dispatch({
        type: ActionType.SEARCH_POKEMON_SUCCESS,
        payload: pokemon,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.SEARCH_POKEMON_ERROR,
        payload: err.message,
      });
    }
  };
};

export const getPokemonList = (page: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SEARCH_POKEMON,
    });

    try {
      const { data } = await axios.get(page);

      const pokemon = data;

      dispatch({
        type: ActionType.SEARCH_POKEMON_SUCCESS,
        payload: pokemon,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.SEARCH_POKEMON_ERROR,
        payload: err.message,
      });
    }
  };
};

export const displayPokemon = (link: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SEARCH_POKEMON,
    });

    try {
      const { data } = await axios.get(link);

      const pokemon = data;

      dispatch({
        type: ActionType.SEARCH_POKEMON_SUCCESS,
        payload: pokemon,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.SEARCH_POKEMON_ERROR,
        payload: err.message,
      });
    }
  };
};
