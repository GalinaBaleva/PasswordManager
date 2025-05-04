import express from 'express';
import cors from 'cors';
import uniqid from 'uniqid';
import { encryptPass, dectyptPass } from './crypto.js';
import { readFileSync, writeFileSync } from 'fs';

const { PORT, MANAGER_PASS } = process.env;

const app = express();
app.listen(PORT, console.log(`http://localhost:/${PORT}`));

app.use(cors());
app.use(express.json());


const dataReading = () => {
    const data = readFileSync('./data/password.json');
    const parsedData = JSON.parse(data);

    return parsedData;
}

const dataWrite = (data) => {
    const writeData = writeFileSync('./data/password.json', JSON.stringify(data, null, 2));

    return writeData;
}

const cleaner = (data) => {
    const { passwort, ...cleanData } = data;
    const decryptedPass = dectyptPass(passwort)

    console.log(decryptedPass);

    const newPass = decryptedPass
        .split('')
        .map(c => '*')
        .join('');

    cleanData.passwort = newPass;

    return cleanData;
}

app.post('/login', (req, res) => {
    const { managerpass } = req.body;
    try {
        if (managerpass !== MANAGER_PASS) {
            throw new Error('Kennwort stimmt nicht überein!')
        }

        res.status(200).send({message: 'Erfolgreich eingeloggt!'});
    } catch (err) {
        res.status(500).send({ error: err.message })
    }

});

app.get('/passwords', (req, res) => {
    const data = dataReading();

    const cleanJSON = data.map(j => cleaner(j));
    res.status(200).send(JSON.stringify(cleanJSON));
});

app.post('/passwords', (req, res) => {
    const { passwort, ...data } = req.body;
    const hashedPasswort = encryptPass(passwort);
    data.passwort = hashedPasswort;
    const id = uniqid();
    data.id = id;

    const arrJson = dataReading();

    arrJson.push(data);
    try {
        dataWrite(arrJson);

        res.status(200).send({message: 'Neues Passwort ist angelegt!'});
    } catch (err) {
        res.status(500).send({ error: err });

    }
});

app.get('/passwords/delete/:id', (req, res) => {
    const { id } = req.params;

    const data = dataReading();
    const filtered = data.filter(a => a.id !== id);

    dataWrite(filtered);
    res.status(200).send({message: 'Deleted!'});
});

app.post('/passwords/:id', (req, res) => {
    const { id } = req.params;

    try {
        const data = dataReading();
        const filtered = data.filter(d => d.id === id);
        
        if (filtered.length === 0) {
            throw new Error('Etwas ist schiefgegangen!');
        }
        const pass = dectyptPass(filtered[0].passwort);

        res.status(200).send({message: pass});

    } catch (err) {
        res.status(500).send({error: err.message});
    }
});