import React, { useEffect, useState } from "react";
import { getCountPokemon, getPokemons } from "../../service/pokemon";

export default function PokemonCard(props) {
  const { url, name, showCount } = props;
  const [pokemon, setPokemon] = useState({
    name: "",
    img: "/image/Pokeball.png",
    types: [],
  });

  useEffect(() => {
    getPokemons(url).then((data) => {
      setPokemon({
        id: data.id,
        name: name,
        img: data.sprites?.other?.home?.front_default,
        type: data.types[0].type.name,
      });
    });
  }, []);
  return (
    <>
      <div className="flex justify-center mx-2">
        <div
          className={`rounded-2xl shadow-md border-4 bg-white max-w-sm ${pokemon.type}-border`}
        >
          <div className="flex justify-between px-2">
            <div>{`#${pokemon.id}`}</div>
            {showCount ? <div>{getCountPokemon(pokemon.id)}</div> : ""}
          </div>
          <img className="rounded-t-lg" src={pokemon.img} alt="" />
          <div className={`p-3 ${pokemon.type}`}>
            <h5 className="text-white text-xl font-medium mb-2 text-center">
              {pokemon.name}
            </h5>
            {/* <button type="button">catch</button> */}
            <a className="text-white" href={`/Pokemon/${pokemon.id}`}>
              detail
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
