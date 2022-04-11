const express = require('express');
const router = express.Router();

const path = require('path');

router.use(express.json());

const basePath = path.join(__dirname, '../templetes');

router.post('/userInfo', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;

    console.log(`${name} tem ${age} anos!`);
    res.sendFile(`${basePath}/home.html`)
})

module.exports = router;