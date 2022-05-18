import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action, FlavorTextAction } from "../actions";

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

export const displayFlavorText = (pokemon: string) => {
  return async (dispatch: Dispatch<FlavorTextAction>) => {
    let pokemonName: string;
    if (pokemon === "") {
      dispatch({
        type: ActionType.POKEMON_FLAVORTEXT_RESET,
      });
    } else {
      if (pokemon.indexOf("-") > 0) {
        pokemonName = pokemon.substring(0, pokemon.indexOf("-"));
      } else {
        pokemonName = pokemon;
      }
      dispatch({
        type: ActionType.POKEMON_FLAVORTEXT_LOADING,
      });

      try {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
        );

        const pokemonFlavorText = data.flavor_text_entries.find((val: any) => {
          return val.language.name === "en";
        });

        dispatch({
          type: ActionType.POKEMON_FLAVORTEXT_LOADED,
          payload: pokemonFlavorText,
        });
      } catch (err: any) {
        dispatch({
          type: ActionType.POKEMON_FLAVORTEXT_ERROR,
          payload: err.message,
        });
      }
    }
  };
};
