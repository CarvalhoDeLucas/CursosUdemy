const minimist = require('minimist');

//Externo
const args = minimist(process.argv.slice(2));

//Interno 
const soma = require('./soma').soma;

const a = parseInt(args['a']);
const b = parseInt(args['b']);

soma(a, b);