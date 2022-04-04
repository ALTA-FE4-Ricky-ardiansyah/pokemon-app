import React, { useEffect, useState } from "react";
import { getPokemons } from "../../service/pokemon";

export default function CardCoba(props) {
  const [pokemon, setPokemon] = useState({
    name: "",
    img: "/image/Pokeball.png",
    types: [],
  });
  useEffect(() => {
    getPokemons(props.url).then((data) => {
      setPokemon({
        name: props.name,
        img: data.sprites?.other?.home?.front_default,
        type: data.types[0].type.name,
      });
    });
  }, []);
  return (
    <div>
      <img src={pokemon.img} />
      <h3>{pokemon.name}</h3>
      <p>{pokemon.type}</p>
    </div>
  );
}
