import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.scss'
import PokemonEntry from "./components/PokemonEntry";
import NewPokemonForm from "./components/NewPokemonForm";
import FilterForm from "./components/FilterForm";


function App() {

  const [pokemons, setPokemons] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  useEffect(() => {
    axios.get('pokemons.json').then(res => setPokemons(res.data));
  }, []);

  const handlePokemonDeletion = (id) => {
    setPokemons(pokemons.filter(pokemon => pokemon.id !== id));
  };

  const handlePokemonAddition = (pokemon) => {
    setPokemons([...pokemons, pokemon]);
  };

  const handleListFilter = (name) => {
    setNameFilter(name);
  };

  const handlePokemonSort = (direction) => {
    setSortDirection(direction);
  };

  const handlePokemonRating = (id, rating) => {
    setPokemons(pokemons.map(pokemon => pokemon.id === id ? Object.assign(pokemon, {rating}) : pokemon));
  };

  let pokemonList = pokemons.filter(pokemon => pokemon.name.toLowerCase().startsWith(nameFilter.toLowerCase()));

  pokemonList.sort((a, b) => {
    return sortDirection === 'ascending' ? b.name > a.name : a.name > b.name;
  });

  pokemonList = pokemonList.map(pokemon => {
    return <PokemonEntry key={pokemon.id} pokemon={pokemon} onDelete={handlePokemonDeletion}
                         onRate={handlePokemonRating}/>
  });

  return (
      <div className="container">
        <h2 className="app-title">Pokemon collection</h2>
        <div className="forms-wrapper">
          <NewPokemonForm onAddPokemon={handlePokemonAddition}/>
          <FilterForm onFilter={handleListFilter} onSort={handlePokemonSort}/>
        </div>
        {pokemonList}
      </div>
  );
}

export default App;
