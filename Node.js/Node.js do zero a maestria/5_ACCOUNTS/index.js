// Modulos externos
const inquirer = require('inquirer');
const chalk = require('chalk');

// Modulos internos
const fs = require('fs');

operation();

function operation() {
    //Cria uma lista de escolhas para o usuário
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: [
                'Criar Conta',
                'Consultar Saldo',
                'Depositar',
                'Sacar',
                'Sair',
            ],
        },
    ])
    .then((answer) => {
        const action = answer['action'];
        
        if (action === 'Criar Conta') {
            createAccount();
        } else if (action === 'Consultar Saldo') {
            getAccountBalance();
        } else if (action === 'Depositar') {
            deposit();
        } else if (action === 'Sacar') {
            withdraw();
        } else if (action === 'Sair') {
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'));
            //Encerra a execução do sistema
            process.exit();
        }
    })
    .catch((err) => console.log(err));
}

// Create an account
function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'));
    console.log(chalk.green('Defina as opções da sua conta a seguir'));

    buildAccount();
}

function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digine um nome para a sua conta:'
        },
    ]).then((answer) => {
        const accountName = answer['accountName'];

        console.info(accountName);

        // Confere se o diretório 'accounts' não existe
        if (!fs.existsSync('accounts')) {
            // Cria o diretório 'accounts'
            fs.mkdirSync('accounts');
        }

        // Confere se a conta criada já existe
        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome!'));
            return buildAccount();
        } 
           
        // Cria a conta do usuário, criando uma variável chamada 'balance', onde será salvo o saldo do usuário
        fs.writeFileSync(
            `accounts/${accountName}.json`,
            '{"balance": 0}',
            function (err) {
                console.log(err);
            },
        )

        console.log(chalk.green('Parabéns, a sua conta foi criada!'));
        operation();
    })
    .catch((err) => console.log(err));
}

// Add an amount to user account
function deposit() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName'];

        // Verify if account exists
        if (!checkAccount(accountName)) {
            return deposit();
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja depositar?'
            }
        ])
        .then((answer) => {
            const amount = answer['amount'];

            // Add an amount
            addAmount(accountName, amount);

            operation();
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err)); 
}

function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'));
        return false;
    }

    return true;
}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName);

    if (!amount) {
        console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde!"));
        return deposit();
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

    // Reescreve na conta do usuárop, atualizando o saldo
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err);
        },
    );

    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`));
}

function getAccount(accountName) {
    // Pega os dados da conta, já em 'utf8' para caso tenha algum caracter especial ou acentuação e expecificando que é só para leitura => 'r'
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8', 
        flag: 'r'
    });

    // Retonar os dados em JSON, para facilitar a obtenção da variável responsável pelo saldo 
    return JSON.parse(accountJSON);
}

// Show accont balance
function getAccountBalance() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua consta?',
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        // Confere se a conta existe
        if (!checkAccount(accountName)) {
            return getAccountBalance();
        }

        const accountData = getAccount(accountName);

        console.log(chalk.bgBlue.black(`O saldo da sua consta é de R$${accountData.balance}`));
        operation();
    })
    .catch((err) => console.log(err));
}

// Withdraw an amount from user account
function withdraw() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua consta?',
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName'];

        if(!checkAccount(accountName)) {
            withdraw();
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja sacar?',
            }
        ])
        .then((answer) => {
            const amount = answer['amount'];
            
            removeAmount(accountName, amount);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName);

    if (!amount) {
        console.log(chalk.bgRed.black('Acorreu um erro, tente novamente mais tarde!'));
        return withdraw();
    }

    if (accountData.balance < amount) {
        console.log(chalk.bgRed.black('Valor indisponível!'));
        return withdraw();
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err);
        },
    );

    console.log(chalk.green(`Foi realizado um saque de R$${amount} da sua consta!`));
    operation();
}