const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title;
    const pageqty = req.body.pageqty;

    const sql = `INSERT INTO books (title, pageqty) VALUEs ('${title}', ${pageqty})`;

    con.query(sql, function(err) {
        if (err) {
            console.log(err);
            return;
        }

        res.redirect('/')
    });
});

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '60757692',
    database: 'nodemysql',
});

con.connect(function (err) {
    if(err) {
        console.log(err);
    }

    console.log('Conectou ao MySQL!');

    app.listen(3000);
})