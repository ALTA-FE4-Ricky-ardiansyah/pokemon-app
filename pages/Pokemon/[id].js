import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { getPokemons } from "../../service/pokemon";
import Link from "next/link";

export default function Pokemon() {
  const { query, isReady } = useRouter();
  const { myPokemon, setmyPokemon } = useState();

  const [pokemon, setPokemon] = useState({
    name: "",
    img: "/image/Pokeball.png",
    types: [],
  });

  useEffect(() => {
    if (isReady) {
      const url = `https://pokeapi.co/api/v2/pokemon/${query.id}`;
      fetchData(url);
    } else {
      // return 404;
    }
  }, [isReady]);

  const catchPokemon = (id) => {
    const random = Math.floor(Math.random() * 10) + 1;
    if (random <= 5) {
      let pokemonName = prompt(
        "You caught a pokemon!",
        "Insert Your Pokemon Name"
      );
      if (pokemonName == null) {
        alert("You didn't insert a name, Your Pokemon is Go Away");
        return;
      }
      const storage = localStorage.getItem("myPokemon");
      if (storage === "null" || storage.length == 0) {
        const stringify = JSON.stringify([
          { id: pokemon.id, pokemon, name: pokemonName },
        ]);
        console.log(stringify);
        localStorage.setItem("myPokemon", stringify);
        return;
      } else {
        const json = JSON.parse(storage);
        json.push({
          id: pokemon.id,
          pokemon,
          name: pokemonName,
        });
        const stringify = JSON.stringify(json);
        console.log(stringify);
        localStorage.setItem("myPokemon", stringify);
      }
      alert("Hello Pokemon: " + pokemonName);
      return;
    }
    alert("You failed to catch a pokemon");
  };

  async function fetchData(url) {
    await getPokemons(url).then((data) => {
      setPokemon({
        id: data.id,
        name: data.name,
        img: data.sprites?.other?.home?.front_default,
        types: data.types,
        PrimaryType: data.types[0].type.name,
        height: data.height,
        weight: data.weight,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        sAttack: data.stats[3].base_stat,
        sDefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
        moves: data.moves,
      });
    });
  }

  return (
    <div className={`h-screen ${pokemon.PrimaryType} overflow-hidden`}>
      <div className="p-8 ">
        <div className="flex justify-between px-2">
          <div className="flex justify-start items-center">
            <Link href={"/"}>
              <img className="w-auto h-5 mr-4" src="/image/back.png" alt="" />
            </Link>
            <h1 className="text-white text-xl uppercase font-sans font-semibold">
              {pokemon.name}
            </h1>
          </div>
          <h5 className="text-white text-sm">#{pokemon.id}</h5>
        </div>
        <div className="Relative">
          <img className="ab rounded-t-lg" src={pokemon.img} alt="" />
          <img
            className="absolute top-0 right-0 max-w-md max-h-max max-w-screen-xl"
            src="/image/Pokeball-white.png"
            alt=""
          />
        </div>
      </div>

      {/* pokemon name */}
      <div className="bg-slate-50  p-6 pt-20 mx-2 rounded-lg -mt-28">
        <h3
          className={`${pokemon.PrimaryType}-txt uppercase text-center font-sans font-black text-xl`}
        >
          {pokemon.name}
        </h3>
        <div className="flex justify-center">
          <h5
            className={`mt-1 w-10 py-1  ${pokemon.PrimaryType} rounded-full text-xs text-white text-center flex justify-center`}
          >
            {pokemon.PrimaryType}
          </h5>
        </div>
        <div className="mt-10 flex justify-center"></div>
        <h1
          className={`${pokemon.PrimaryType}-txt font-bold text-center font-extrabold uppercase mb-3`}
        >
          <div className="flex mb-10">
            <div className="flex-auto">
              <div className="flex justify-center font-normal flex-nowrap">
                <img
                  className="ab rounded-t-lg mr-2"
                  src="/image/timbangan.png"
                  alt=""
                />
                <p className="text-black font-normal lowercase">
                  {pokemon.weight} kg
                </p>
              </div>
              <p className="font-light text-black text-xs mt-2">weight</p>
            </div>
            <div className="flex-auto">
              <div className="flex justify-center font-normal flex-nowrap">
                <img
                  className="ab rounded-t-lg mr-2"
                  src="/image/garisan.png"
                  alt=""
                />
                <p className="text-black font-normal lowercase">
                  {pokemon.height} m
                </p>
              </div>
              <p className="font-light text-black text-xs mt-2">height</p>
            </div>
            <div className="flex-auto">
              <div className="flex justify-center font-normal flex-nowrap">
                <p className="text-black font-normal">{[pokemon.weight]}</p>
              </div>
              <p className="font-light text-black text-xs mt-2">moves</p>
            </div>
          </div>
          {/* stats */}
          Base Stats
        </h1>
        <div className="w-80 mb-8">
          <table className="table-auto w-screen">
            <tbody className="">
              <tr>
                <td className={`${pokemon.PrimaryType}-txt font-bold`}>HP</td>
                <td className="w-15">{pokemon.hp}</td>
                <td>
                  <div className="w-48 bg-gray-200 h-1">
                    <hr
                      className={`h-1 ${pokemon.PrimaryType}`}
                      width={`${pokemon.hp}%`}
                    ></hr>
                  </div>
                </td>
              </tr>
              <tr>
                <td className={`${pokemon.PrimaryType}-txt font-bold`}>ATK</td>
                <td className="w-15">{pokemon.attack}</td>
                <td>
                  <div className="w-48 bg-gray-200 h-1">
                    <hr
                      className={`h-1 ${pokemon.PrimaryType}`}
                      width={`${pokemon.attack}%`}
                    ></hr>
                  </div>
                </td>
              </tr>
              <tr>
                <td className={`${pokemon.PrimaryType}-txt font-bold`}>DEF</td>
                <td className="w-15">{pokemon.defense}</td>
                <td>
                  <div className="w-48 bg-gray-200 h-1">
                    <hr
                      className={`h-1 ${pokemon.PrimaryType}`}
                      width={`${pokemon.hp}%`}
                    ></hr>
                  </div>
                </td>
              </tr>
              <tr>
                <td className={`${pokemon.PrimaryType}-txt font-bold`}>SATK</td>
                <td className="w-15">{pokemon.sAttack}</td>
                <td>
                  <div className="w-48 bg-gray-200 h-1">
                    <hr
                      className={`h-1 ${pokemon.PrimaryType}`}
                      width={`${pokemon.sAttack}%`}
                    ></hr>
                  </div>
                </td>
              </tr>
              <tr>
                <td className={`${pokemon.PrimaryType}-txt font-bold`}>SDEF</td>
                <td className="w-15">{pokemon.sDefense}</td>
                <td>
                  <div className="w-48 bg-gray-200 h-1">
                    <hr
                      className={`h-1 ${pokemon.PrimaryType}`}
                      width={`${pokemon.sDefense}%`}
                    ></hr>
                  </div>
                </td>
              </tr>
              <tr>
                <td className={`${pokemon.PrimaryType}-txt font-bold`}> SPD</td>
                <td className="w-15">{pokemon.speed}</td>
                <td>
                  <div className="w-48 bg-gray-200 h-1">
                    <hr
                      className={`h-1 ${pokemon.PrimaryType}`}
                      width={`${pokemon.speed}%`}
                    ></hr>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="mx-auto mt-5 px-6 py-2.5 bg-red-600 text-white text-xs rounded-full"
          onClick={() => {
            catchPokemon(pokemon.id);
          }}
        >
          catch {pokemon.name}
        </button>
      </div>
    </div>
  );
}
