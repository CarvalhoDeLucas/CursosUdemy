const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

/* Implementar o handlebars */
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

app.get('/', (req, res) => {
    const user = {
        name: 'Lucas',
        surname: 'Carvalho',
        age: 20
    };

    const palavra = 'Teste';

    const auth = false;

    const approved = false;

    res.render('home', { user: user, palavra, auth, approved });
});

app.listen(3000, () => {
    console.log("App rodando!");
})