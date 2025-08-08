import React from 'react';

export default function CharacterCard(props) {
    const character = props.character;
    const onEdit = props.onEdit;
    const onDelete = props.onDelete;

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold text-blue-600">{character.name}</h3>
            <p>Nom réel: {character.realName}</p>
            <p>Univers: {character.universe}</p>
            <div className="mt-2 flex space-x-2">
                <button
                    onClick={function() {
                        console.log('On veut éditer:', character.id);
                        onEdit(character.id);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                    Modifier
                </button>
                <button
                    onClick={function() { onDelete(character.id); }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                    Supprimer
                </button>
            </div>
        </div>
    );
}