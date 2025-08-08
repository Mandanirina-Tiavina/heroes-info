import React from 'react';

export default function CharacterForm(props) {
    const onSubmit = props.onSubmit;
    const name = props.name;
    const setName = props.setName;
    const realName = props.realName;
    const setRealName = props.setRealName;
    const universe = props.universe;
    const setUniverse = props.setUniverse;
    const editId = props.editId;
    const cancelEdit = props.cancelEdit;

    function handleChangeName(event) {
        setName(event.target.value);
    }

    function handleChangeRealName(event) {
        setRealName(event.target.value);
    }

    function handleChangeUniverse(event) {
        setUniverse(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log('On soumet le formulaire');
        onSubmit();
    }

    return (
        <div className="bg-white p-4 rounded-lg mb-6">
            <h2 className="text-2xl text-blue-600 mb-4">
                {editId ? 'Modifier Personnage' : 'Nouveau Personnage'}
            </h2>
            <div className="space-y-3">
                <input
                    type="text"
                    value={name}
                    onChange={handleChangeName}
                    placeholder="Nom du personnage"
                    className="w-full p-2 border border-blue-300 rounded"
                />
                <input
                    type="text"
                    value={realName}
                    onChange={handleChangeRealName}
                    placeholder="Nom réel"
                    className="w-full p-2 border border-blue-300 rounded"
                />
                <input
                    type="text"
                    value={universe}
                    onChange={handleChangeUniverse}
                    placeholder="Univers"
                    className="w-full p-2 border border-blue-300 rounded"
                />
                <div className="flex space-x-2">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        {editId ? 'Mettre à jour' : 'Ajouter'}
                    </button>
                    {editId && (
                        <button
                            onClick={cancelEdit}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Annuler
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}