import React, { useState } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useLocation } from "react-router-dom";
import "../styles/css/pokemonsearchresult.css";

const PokemonDisplay: React.FC = () => {
  const path = useLocation().pathname;
  const location = path.split("/")[1];
  const { getPokemonList, displayPokemon } = useActions();
  const { loading, error, data } = useTypedSelector(
    (state) => state.repositories
  );

  console.log(data);
  return (
    <div>
      {loading && <h2 className="text-2xl">Loading...</h2>}
      {error === "Request failed with status code 404" ? (
        <h2 className="text-2xl">No Pokemon found</h2>
      ) : (
        <h2>{error}</h2>
      )}
      {!loading && !error && data && (
        <div className="content">
          <div className="name-id">
            <h1 className="capitalize text-3xl font-bold">
              #{data.id} {data.name}
            </h1>
          </div>
          <div className="sprites">
            {data.sprites && (
              // SPRITES CONTAINER
              <div className="sprites flex flex-col md:flex-row my-5">
                {/* NORMAL SPRITE */}
                {(data.sprites.front_default || data.sprites.back_default) && (
                  <div className="normal-sprite border border-gray-500 p-5 rounded text-center mb-5 md:mb-0">
                    <h3 className="text-xl">Normal</h3>
                    <br />
                    <div className="sprite-container flex justify-evenly">
                      {data.sprites.front_default && (
                        <div className="sprite_front border border-gray-500 bg-white">
                          <img
                            src={data.sprites.front_default}
                            alt={`${data.name}_front`}
                          />
                        </div>
                      )}
                      {data.sprites.back_default && (
                        <div className="sprite_back border border-gray-500 bg-white">
                          <img
                            src={data.sprites.back_default}
                            alt={`${data.name}_back`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* SHINY SPRITE */}
                {(data.sprites.front_shiny || data.sprites.back_shiny) && (
                  <div className="shiny-sprite border border-gray-500 p-5 rounded text-center">
                    <h3 className="text-xl">Shiny</h3>
                    <br />
                    <div className="sprite-container flex justify-evenly">
                      {data.sprites.front_shiny && (
                        <div className="sprite-front border border-gray-500 bg-white">
                          {data.sprites && (
                            <img
                              src={data.sprites.front_shiny}
                              alt={`${data.name}_front_shiny`}
                            />
                          )}
                        </div>
                      )}
                      {data.sprites.back_shiny && (
                        <div className="sprite_back border border-gray-500 bg-white">
                          {data.sprites && (
                            <img
                              src={data.sprites.back_shiny}
                              alt={`${data.name}_back_shiny`}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDisplay;
