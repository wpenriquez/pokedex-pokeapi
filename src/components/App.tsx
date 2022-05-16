import { Provider } from "react-redux";
import { store } from "../state";
import { Routes, Route } from "react-router-dom";
import PokemonSearchResult from "./PokemonSearchResult";
import PokemonList from "./PokemonList";
import PokemonDisplay from "./PokemonDisplay";
import Pokedex from "./Pokedex";

const App = () => {
  return (
    <Provider store={store}>
      <div className="p-5">
        <Routes>
          <Route path="/" element={<Pokedex />} />
          <Route path="search" element={<PokemonSearchResult />} />
          <Route path="list" element={<PokemonList />} />
          <Route path="pokemon" element={<PokemonDisplay />} />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
