const http = require("http");
const fs = require("fs");

const fecthPokemonData = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./pokedex.json", (err, data) => {
      if (err) {
        reject(err);
      } else resolve(JSON.parse(data));
    });
  });
};

const handleRequest = async (req, res) => {
  const pokemonData = await fecthPokemonData();
  const pokemonSearch = decodeURI(req.url.substring(1));

  //   console.log(pokemonName);
  //   console.log(pokemonData);

  const nameData = pokemonData.find(
    (pokemon) =>
      pokemon.name.english === pokemonSearch ||
      pokemon.name.japanese === pokemonSearch ||
      pokemon.name.chinese === pokemonSearch ||
      pokemon.name.french === pokemonSearch ||
      pokemon.id.toString === pokemonSearch
  );
  //   console.log("hola", nameData);
  if (nameData) {
    const response = {
      type: nameData.type,
      ...nameData.base,
    };
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify(response, null, 4));
  } else {
    res.writeHead(404, { "Content-type": "text/plain" });
    res.end(
      "Importante que para un mismo objeto/pokemon, podemos acceder a sus datos tanto por id como por todos los nombres"
    );
  }
};

const server = http.createServer(handleRequest);
server.listen(3000, () => {
  console.log("Escuchando el servidor");
});
