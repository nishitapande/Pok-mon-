import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card";

function App() {
  const [data, setData] = useState([]);
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
  return (
    <div className="">
      <div className="flex flex-wrap gap-4 mx-4">
        {data.map((item, index) => {
          return <Card item={item} key={index} />;
        })}
      </div>
    </div>
  );
}

export default App;
