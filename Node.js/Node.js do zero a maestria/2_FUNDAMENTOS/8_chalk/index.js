const chalk = require('chalk');

const nota = 5;

if (nota >= 7) {
    console.log(chalk.green.bold('Aprovado'));
} else {
    console.log(chalk.bgRed.black('Reprovado'));
}