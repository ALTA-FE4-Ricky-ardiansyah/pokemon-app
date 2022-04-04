export const getPokemons = (url) => {
  return fetch(url).then((response) => response.json());
};

export const getCountPokemon = (id) => {
  const storage = localStorage.getItem("myPokemon");
  if (storage === "null") {
    return 0;
  }
  const json = JSON.parse(storage);
  if (json.length === 0) {
    return 0;
  }
  console.log(json);
  let result = Object.values(
    json.reduce((a, { id }) => {
      let key = id;
      a[key] = a[key] || { id, count: 0 };
      a[key].count++;
      return a;
    }, {})
  );
  result = result.filter((p) => p.id === id);
  return result.length > 0 ? result[0].count : 0;
};
