import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card";

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    (async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
      const results = res.data.results;
      // console.log("res: ", res.data.results);
      const detailedPromises = results.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          url: details.data.sprites.front_default,
          abilities: details.data.abilities
            .map((ability) => ability.ability.name)
            .join(", "),
          types: details.data.types.map((type) => type.type.name).join(", "),
        };
      });

      // Wait for all detailed data to be fetched
      const detailedData = await Promise.all(detailedPromises);
      setData(detailedData);
    })();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="overflow-hidden mt-6 w-11/12 md:w-1/2 p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex flex-wrap gap-4 mx-4">
        {filteredData.map((item, index) => {
          return <Card item={item} key={index} />;
        })}
      </div>
    </div>
  );
}

export default App;
