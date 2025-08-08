const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const filePath = './user.json';

app.get('/characters', function(req, res) {
    console.log('On lit les personnages');
    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);
    res.json(json.characters);
});

app.post('/characters', function(req, res) {
    console.log('On ajoute un personnage');
    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);
    const characters = json.characters;
    const newId = characters.length ? characters[characters.length - 1].id + 1 : 1;
    const newCharacter = {
        id: newId,
        name: req.body.name,
        realName: req.body.realName,
        universe: req.body.universe
    };
    characters.push(newCharacter);
    fs.writeFileSync(filePath, JSON.stringify({ characters: characters }, null, 2));
    res.status(201).json(newCharacter);
});

app.get('/characters/:id', function(req, res) {
    console.log('On cherche un personnage');
    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);
    const characters = json.characters;
    for (let i = 0; i < characters.length; i++) {
        if (characters[i].id == req.params.id) {
            res.json(characters[i]);
            return;
        }
    }
    res.status(404).json({ message: 'Pas trouvé' });
});

app.put('/characters/:id', function(req, res) {
    console.log('On modifie un personnage');
    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);
    const characters = json.characters;
    for (let i = 0; i < characters.length; i++) {
        if (characters[i].id == req.params.id) {
            characters[i].name = req.body.name;
            characters[i].realName = req.body.realName;
            characters[i].universe = req.body.universe;
            fs.writeFileSync(filePath, JSON.stringify({ characters: characters }, null, 2));
            res.json(characters[i]);
            return;
        }
    }
    res.status(404).json({ message: 'Pas trouvé' });
});

app.delete('/characters/:id', function(req, res) {
    console.log('On supprime un personnage');
    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);
    const characters = json.characters;
    for (let i = 0; i < characters.length; i++) {
        if (characters[i].id == req.params.id) {
            characters.splice(i, 1);
            fs.writeFileSync(filePath, JSON.stringify({ characters: characters }, null, 2));
            res.status(204).send();
            return;
        }
    }
    res.status(404).json({ message: 'Pas trouvé' });
});

app.listen(port, function() {
    console.log('Serveur démarré sur port 3001');
});