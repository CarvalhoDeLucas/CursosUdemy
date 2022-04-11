const x = 10;

//Checar se x é um número
if (!Number.isInteger(x)) {
    throw new Error('O  valor x não é um número!');
}

console.log('Continuando o código...');