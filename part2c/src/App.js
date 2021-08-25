import React, { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";

function App() {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    if (newSearch.length > 0) {
      const api = axios.get(
        `https://restcountries.eu/rest/v2/name/${newSearch}`
      );
      api.then((res) => {
        setCountries(res.data);
      });
    }
  }, [newSearch]);

  const onSearchChange = (e) => {
    setNewSearch(e.target.value);
  };

  return (
    <>
      <Filter value={newSearch} onChange={onSearchChange} />

      {countries.length > 100 && "Too many searches, specify another filter"}

      {countries.length > 1 &&
        countries.length <= 10 &&
        countries.map((country, index) => <p key={index}>{country.name}</p>)}

      {countries.length === 1 && (
        <div>
          <h1>{countries[0].name}</h1>
          <p>capital: {countries[0].capital}</p>
          <p>population: {countries[0].population}</p>
          <h2>languages</h2>
          <ul>
            {countries[0].languages.map((language, index) => (
              <li key={index}>{language.name}</li>
            ))}
          </ul>
          <img src={countries[0].flag} alt="flag" width="100" height="100" />
        </div>
      )}
    </>
  );
}

export default App;
