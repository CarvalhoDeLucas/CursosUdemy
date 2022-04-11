const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const hds = exphbs.create({
    partialsDir: ['views/partials'],
});

/* Implementar o handlebars */
app.engine('handlebars', hds.engine);
app.set('view engine', 'handlebars');

app.get('/dashboard', (req, res) => {
    const itens = ['Item a', 'Item b', 'Item c']

    res.render('dashboard', {itens});
});

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender Node.Js',
        category: 'JavaScript',
        body: 'Este artigo vai te ajudar a aprender Node.Js ...',
        comments: 4,
    };

    res.render('blogpost', { post })
});

app.get('/blog', (req, res) => {
    const posts = [
        {
            title: 'Aprendendo Node.js',
            category: 'JavaScript',
            body: 'Teste',
            comments: 4,
        },
        {
            title: 'Aprendendo PHP',
            category: 'PHP',
            body: 'Teste',
            comments: 4,
        },
        {
            title: 'Aprendendo Java',
            category: 'Java',
            body: 'Teste',
            comments: 4,
        },
    ];

    res.render('blog', { posts });
});

app.get('/', (req, res) => {
    const user = {
        name: 'Lucas',
        surname: 'Carvalho',
        age: 20
    };

    const palavra = 'Teste';

    const auth = true;

    const approved = false;

    res.render('home', { user: user, palavra, auth, approved });
});

app.listen(3000, () => {
    console.log("App rodando!");
})