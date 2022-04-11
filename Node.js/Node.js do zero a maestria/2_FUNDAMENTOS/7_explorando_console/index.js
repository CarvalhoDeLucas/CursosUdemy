//Mais de um argumento
const x = 10;
const y = 'Lucas';
const z = [1, 2];

console.log(x, y, z);

//Contagem de impressões
console.count(`O valode de x é ${x}, constagem`);
console.count(`O valode de x é ${x}, constagem`);
console.count(`O valode de x é ${x}, constagem`);
console.count(`O valode de x é ${x}, constagem`);

//Variavel entre string
console.log('O nomde é %s, ele é programador.', y);

//Limpa o console
setTimeout(() => {
    console.clear();
}, 2000);