const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

/* Implementar o handlebars */
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    const user = {
        name: 'Lucas',
        surname: 'Carvalho',
        age: 20
    };

    const palavra = 'Teste';

    res.render('home', { user: user, palavra });
});

app.listen(3000, () => {
    console.log("App rodando!");
})