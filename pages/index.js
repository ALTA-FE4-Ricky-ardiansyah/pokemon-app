import React, { useState, useEffect } from "react";
import { getPokemons } from "../service/pokemon";
import PokemonCard from "./components/PokemonCard";
import Link from "next/link";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons("https://pokeapi.co/api/v2/pokemon/?limit=10").then((data) => {
      setPokemons(data);
    });
  }, []);
  return (
    <div>
      PokemonList
      <Link href={"/MyPokemonList"}>
        <div>MyPokemonList</div>
      </Link>
      <div className="m-3">
        {Object.entries(pokemons)[3] &&
          Object.entries(pokemons)[3][1].map((pokemon, index) => {
            return (
              <PokemonCard
                key={index}
                name={pokemon.name}
                url={pokemon.url}
                showCount={true}
              />
            );
          })}
      </div>
    </div>
  );
}
