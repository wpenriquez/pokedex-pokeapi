import React, { useState } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/css/pokemonsearchresult.css";

const PokemonSearchResult: React.FC = () => {
  const path = useLocation().pathname;
  const location = path.split("/")[1];
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [list, setList] = useState({});
  const { searchPokemon } = useActions();
  const { loading, error, data } = useTypedSelector(
    (state) => state.repositories
  );

  // FUNCTION TO CHANGE BACKGROUND WHEN CHANGING WEBSITE PAGE
  const changeBackground = () => {
    const body = document.querySelector("body");
    if (body) {
      body.className = "";
      body.classList.add(location);
    }
  };

  changeBackground();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    searchPokemon(keyword);
  };

  const inputHandler = (param: string): void => {
    let kw = param.toLowerCase();
    setKeyword(kw);
  };

  return (
    <div>
      <div className="back-pokedex mb-3" onClick={() => navigate("/list")}>
        <button>{"<"} Go back</button>
      </div>
      <h1 className="text-4xl font-bold">Pokemon Search</h1>
      <form
        action=""
        onSubmit={submitHandler}
        className="pokemon-search-form w-fit p-5 rounded my-5"
      >
        <table>
          <thead>
            <tr>
              <td className="font-bold " colSpan={2}>
                Enter exact Pokemon name or ID
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  placeholder="e.g. Pikachu"
                  className="border border-gray-300 rounded px-2"
                  type="text"
                  onChange={(e) => inputHandler(e.target.value)}
                />
              </td>
              <td>
                <button className="border border-gray-300 rounded px-5 bg-white hover:bg-gray-100 active:bg-gray-300">
                  Search
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div>
        {loading && <h2 className="text-2xl">Loading...</h2>}
        {error === "Request failed with status code 404" ? (
          <h2 className="text-2xl">No Pokemon found</h2>
        ) : (
          <h2>{error}</h2>
        )}
        {!loading && !error && (
          <div>
            {Object.keys(data).length !== 0 && data.id && (
              <h2 className="text-3xl capitalize font-bold">
                #{data.id} {data.name}
              </h2>
            )}
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
        )}
      </div>
    </div>
  );
};

export default PokemonSearchResult;
