import React, { useState, useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../assets/pokedex_icons/search-outline.svg";
import { ReactComponent as ReturnIcon } from "../assets/pokedex_icons/return-down-back-outline.svg";
import { ReactComponent as BackIcon } from "../assets/pokedex_icons/back.svg";
import { ReactComponent as NextIcon } from "../assets/pokedex_icons/next.svg";
import { ReactComponent as CloseIcon } from "../assets/pokedex_icons/close.svg";
import "../styles/css/pokemonlist.css";

const PokemonList: React.FC = () => {
  const path = useLocation().pathname;
  const location = path.split("/")[1];
  const navigate = useNavigate();
  const { getPokemonList, displayPokemon } = useActions();
  const { loading, error, data } = useTypedSelector(
    (state) => state.repositories
  );
  const [page, setPage] = useState(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10"
  );

  useEffect(() => {
    getPokemonList(page);
  }, [page]);

  // FUNCTION TO CHANGE BACKGROUND WHEN CHANGING WEBSITE PAGE
  const changeBackground = () => {
    const body = document.querySelector("body");
    if (body) {
      body.className = "";
      body.classList.add(location);
    }
  };

  changeBackground();

  const showPokemon = (link: string): void => {
    displayPokemon(link);
    // navigate("/pokemon");
  };

  return (
    <div className="pokemonlist p-5">
      {/* TITLE HEADER */}
      <header>
        <h1 className="pokedex-title text-4xl font-extrabold mb-5 text-center text-transparent bg-clip-text bg-gradient-to-b from-red-700 to-red-300">
          POKÉDEX
        </h1>
      </header>
      {/* SECTION */}
      <section className="relative">
        {/* CONTENT CONTAINER */}
        <div className="content-container relative">
          {/* LOADING CONTENT */}
          {loading && <h2 className="text-2xl">Loading...</h2>}
          {/* ERROR ON CONTENT */}
          {error === "Request failed with status code 404" ? (
            <h2 className="text-2xl">No Pokemon found</h2>
          ) : (
            <h2>{error}</h2>
          )}
          {/* MAPPING DATA TO CONTENT */}
          {!loading && !error && data && (
            <div className="inner-content">
              {/* POKEDEX TOP NAV ICONS */}
              <div className="pokedex-nav flex justify-around mb-5">
                <button
                  className="manual-search rounded-full p-2 bg-black active:bg-gray-500 active:text-white text-gray-300 relative"
                  onClick={() => navigate("/search")}
                >
                  <SearchIcon className="w-10 h-10" />
                </button>
                <button
                  className="back rounded-full p-2 bg-black active:bg-gray-500 active:text-white  text-cyan-500 relative"
                  onClick={() => navigate("/")}
                >
                  <ReturnIcon className="w-10 h-10" />
                </button>
              </div>
              {/* LIST OF POKEMON */}
              <div className="pokemon-list w-full h-[27rem] overflow-y-scroll">
                <ul>
                  {data.results &&
                    data.results.map((val: any, index: number) => (
                      <li
                        key={index}
                        onClick={() => showPokemon(val.url)}
                        className="pokedex-item capitalize"
                      >
                        {val.name}
                      </li>
                    ))}
                </ul>
              </div>
              {/* POKEDEX BOTTOM NAV ICONS */}
              {data.results && (
                <div className="page-nav fixed  text-gray-300  flex justify-between w-full left-0 bottom-5">
                  <button
                    className="prev bg-black rounded-full w-20 pr-3 relative -left-5 disabled:invisible"
                    onClick={() => setPage(data.previous)}
                    disabled={data.previous === null && true}
                  >
                    <BackIcon className="w-12 h-12 float-right" />
                  </button>
                  <button
                    className="next bg-black rounded-full w-20 pl-3 relative -right-5 disabled:invisible"
                    onClick={() => setPage(data.next)}
                    disabled={data.next === null && true}
                  >
                    <NextIcon className="w-12 h-12 float-left" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {data.id && (
          // SELECTED POKEMON CONTENT CONTAINER
          <div className="display-pokemon fixed bg-white  h-[94%] border left-5 top-5 p-5 w-[89.4%] rounded-lg flex flex-col justify-center overflow-y-scroll">
            <div className="content mt-64">
              {/* CLOSE BUTTON */}
              <div className="close-btn fixed bg-black text-red-500 w-10 h-10 rounded-full text-center leading-10 left-2 top-2 z-30">
                <button onClick={() => getPokemonList(page)}>
                  <CloseIcon className="w-10 h-10" />
                </button>
              </div>
              {/* POKEMON NAME AND ID */}
              <div className="name-id">
                <h1 className="capitalize text-3xl font-bold h-auto">
                  #{data.id} {data.name}
                </h1>
              </div>
              <div className="sprites">
                {data.sprites && (
                  // SPRITES CONTAINER
                  <div className="sprites flex flex-col md:flex-row my-5">
                    {/* NORMAL SPRITE */}
                    {(data.sprites.front_default ||
                      data.sprites.back_default) && (
                      <div className="normal-sprite border border-gray-500 p-5 rounded text-center mb-5 md:mb-0">
                        <h3 className="text-xl">Normal</h3>
                        <br />
                        <div className="sprite-container flex justify-evenly">
                          {/* FRONT */}
                          {data.sprites.front_default && (
                            <div className="sprite_front border border-gray-500 bg-white">
                              <img
                                src={data.sprites.front_default}
                                alt={`${data.name}_front`}
                              />
                            </div>
                          )}
                          {/* BACK */}
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
                          {/* FRONT */}
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
                          {/* BACK */}
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
              <div className="desc">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Mollitia enim nisi ad explicabo, possimus sunt sapiente
                  temporibus saepe quibusdam ex culpa repellendus sint, quas
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Mollitia enim nisi ad explicabo, possimus sunt sapiente
                  temporibus saepe quibusdam ex culpa repellendus sint,
                  quasLorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Mollitia enim nisi ad explicabo, possimus sunt sapiente
                  temporibus saepe quibusdam ex culpa repellendus sint, quas
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default PokemonList;
