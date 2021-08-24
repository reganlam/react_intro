import React, { useState, useEffect } from "react";
import axios from "axios";

import Note from "./components/Note";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

function App() {
  // List of people
  const [persons, setPersons] = useState([]);

  // Form data
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    const eventHandler = (res) => {
      setPersons(res.data);
    };

    const promise = axios.get("http://localhost:3001/persons");
    promise.then(eventHandler);
  }, []);
  console.log(`Fetched ${persons.length} people`);

  // onSubmit
  const addPerson = (e) => {
    e.preventDefault();

    // found duplicate
    if (persons.filter((person) => person.name === newName).length > 0) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }
    // not duplicate
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      setPersons(persons.concat(personObject));
    }

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filter={newSearch} />
    </div>
  );
}

export default App;
