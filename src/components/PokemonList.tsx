import React, { useState, useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/css/pokemonsearchresult.css";

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
    <div>
      <header>
        <h1 className="text-4xl font-bold mb-5">Pokedex</h1>
      </header>
      <section className="relative">
        <div className="content-container relative">
          {loading && <h2 className="text-2xl">Loading...</h2>}
          {error === "Request failed with status code 404" ? (
            <h2 className="text-2xl">No Pokemon found</h2>
          ) : (
            <h2>{error}</h2>
          )}
          {!loading && !error && data && (
            <div className="inner-content">
              <button
                className="border border-black rounded-lg py-1 px-2 bg-white active:bg-gray-300 active:text-white mb-5"
                onClick={() => navigate("/search")}
              >
                Manual Search
              </button>
              <ul>
                {data.results &&
                  data.results.map((val: any, index: number) => (
                    <li
                      key={index}
                      onClick={() => showPokemon(val.url)}
                      className="capitalize"
                    >
                      {val.name}
                    </li>
                  ))}
              </ul>
              {data.results && (
                <div className="page-nav flex justify-between">
                  <button
                    className="prev mt-5 font-bold disabled:invisible"
                    onClick={() => setPage(data.previous)}
                    disabled={data.previous === null && true}
                  >{`< Prev`}</button>
                  <button
                    className="next mt-5 font-bold"
                    onClick={() => setPage(data.next)}
                    disabled={data.next === null && true}
                  >{`Next >`}</button>
                </div>
              )}
            </div>
          )}
        </div>
        {data.id && (
          <div className="display-pokemon fixed bg-white  h-[94%] border left-5 top-5 p-5 w-[89.4%] rounded-lg flex flex-col justify-center overflow-y-scroll">
            <div className="content mt-64">
              <div className="close-btn my-5 fixed text-2xl bg-red-500 text-white w-10 h-10 rounded-full text-center leading-10 left-2 -top-2 z-30">
                <button onClick={() => getPokemonList(page)}>X</button>
              </div>
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
