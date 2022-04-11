const express = require('express');
const app = express();
const port = 5000;

const path = require('path');
const users = require('./users')

// Ler body 
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// Arquivos estaticos
app.use(express.static('public'));

const basePath = path.join(__dirname, 'templetes');

app.use('/users', users);

app.get('/users', (req, res) => {
    res.sendFile(`${basePath}/users.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
})