import React, { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import personService from "./services/persons";

function App() {
  // Notification
  const [newNotifcation, setNewNotification] = useState(null);
  const [isSuccess, setIsSuccess] = useState(true);

  // List of people
  const [persons, setPersons] = useState([]);

  // Form data
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    const eventHandler = (res) => {
      setPersons(res);
    };

    personService.getPeople().then(eventHandler);
  }, []);

  // onSubmit
  const addPerson = (e) => {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const filteredPerson = persons.filter((person) => person.name === newName);

    // found duplicate
    if (filteredPerson.length > 0) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      const personId = filteredPerson[0].id;

      // update person
      if (confirm) {
        personService
          .updatePerson(personId, personObject)
          .then((res) => {
            setPersons(
              persons.map((person) => (person.id === personId ? res : person))
            );
            showNotification(`Updated ${newName}`, true);
          })
          .catch((error) => {
            if (error.response === undefined) {
              showNotification(
                `Error updating. User ${newName} may have been deleted.`
              );
            } else {
              showNotification(`${error.response.data.error}`, false);
            }
          });
      }
    }
    // not duplicate
    else {
      personService
        .addPerson(personObject)
        .then((res) => {
          setPersons(persons.concat(res));
          showNotification(`Added ${newName}`, true);
        })
        .catch((error) => {
          showNotification(`${error.response.data.error}`, false);
        });
    }

    setNewName("");
    setNewNumber("");
  };

  const showNotification = (message, isSuccess) => {
    setNewNotification(message);
    setIsSuccess(isSuccess);

    // Show Notification
    setTimeout(() => {
      setNewNotification(null);
    }, 4000);
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

      <Notification message={newNotifcation} isSuccess={isSuccess} />

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

      <Persons
        persons={persons}
        setPersons={setPersons}
        filter={newSearch}
        showNotification={showNotification}
      />
    </div>
  );
}

export default App;
