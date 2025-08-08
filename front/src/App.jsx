import { useState, useEffect } from 'react';
import CharacterCard from './components/CharacterCard.jsx';
import CharacterForm from './components/CharacterForm.jsx';

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [name, setName] = useState('');
  const [realName, setRealName] = useState('');
  const [universe, setUniverse] = useState('');
  const [editId, setEditId] = useState(null);

  function loadCharacters() {
    console.log('On charge les personnages');
    fetch('http://localhost:3001/characters')
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          setCharacters(data);
        });
  }

  useEffect(function() {
    loadCharacters();
  }, []);

  function submitCharacter() {
    const character = {
      name: name,
      realName: realName,
      universe: universe
    };

    if (editId) {
      console.log('On modifie ID:', editId);
      fetch('http://localhost:3001/characters/' + editId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(character)
      })
          .then(function(response) {
            return response.json();
          })
          .then(function(updatedCharacter) {
            console.log('Personnage mis à jour:', updatedCharacter);
            const newCharacters = [];
            for (let i = 0; i < characters.length; i++) {
              if (characters[i].id == editId) {
                newCharacters.push(updatedCharacter);
              } else {
                newCharacters.push(characters[i]);
              }
            }
            setCharacters(newCharacters);
            setEditId(null);
            setName('');
            setRealName('');
            setUniverse('');
          });
    } else {
      console.log('On ajoute un personnage');
      fetch('http://localhost:3001/characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(character)
      })
          .then(function(response) {
            return response.json();
          })
          .then(function(newCharacter) {
            console.log('Nouveau personnage:', newCharacter);
            const newCharacters = [];
            for (let i = 0; i < characters.length; i++) {
              newCharacters.push(characters[i]);
            }
            newCharacters.push(newCharacter);
            setCharacters(newCharacters);
            setName('');
            setRealName('');
            setUniverse('');
          });
    }
  }

  function deleteCharacter(id) {
    console.log('On supprime ID:', id);
    fetch('http://localhost:3001/characters/' + id, {
      method: 'DELETE'
    })
        .then(function() {
          const newCharacters = [];
          for (let i = 0; i < characters.length; i++) {
            if (characters[i].id != id) {
              newCharacters.push(characters[i]);
            }
          }
          setCharacters(newCharacters);
        });
  }

  function editCharacter(id) {
    console.log('On édite ID:', id);
    for (let i = 0; i < characters.length; i++) {
      if (characters[i].id == id) {
        setName(characters[i].name);
        setRealName(characters[i].realName);
        setUniverse(characters[i].universe);
        setEditId(id);
        return;
      }
    }
  }

  function cancelEdit() {
    setName('');
    setRealName('');
    setUniverse('');
    setEditId(null);
  }

  return (
      <div className="bg-blue-100 p-6">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">Personnages Marvel</h1>
        <CharacterForm
            onSubmit={submitCharacter}
            name={name}
            setName={setName}
            realName={realName}
            setRealName={setRealName}
            universe={universe}
            setUniverse={setUniverse}
            editId={editId}
            cancelEdit={cancelEdit}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {characters.map(function(character) {
            return (
                <CharacterCard
                    key={character.id}
                    character={character}
                    onEdit={editCharacter}
                    onDelete={deleteCharacter}
                />
            );
          })}
        </div>
      </div>
  );
}