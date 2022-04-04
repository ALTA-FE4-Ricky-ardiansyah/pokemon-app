import React, { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard";

export default function MyPokemonList() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const storage = localStorage.getItem("myPokemon");
    if (storage === "null" || storage.length == 0) {
      return;
    } else {
      const json = JSON.parse(storage);
      setPokemons(json);
      console.log(json);
    }
  }, []);
  if (pokemons.length == 0) {
    return <div>You dont have any pokemon</div>;
  }
  return (
    <div>
      MyPokemonList
      <div className="m-3">
        {pokemons.map((value, index) => {
          return (
            <PokemonCard
              key={index}
              url={`https://pokeapi.co/api/v2/pokemon/${value.id}`}
              name={value.pokemon.name}
              showCount={false}
            />
          );
        })}
      </div>
    </div>
  );
}
