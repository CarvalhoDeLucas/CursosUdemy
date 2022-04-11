const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodesequelize', 'root', '60757692', {
    host: 'localhost',
    dialect: 'mysql',
});

//try {
//    sequelize.authenticate();
//    console.log('Conectamos com sucesso com o Sequelize!'); 
//} catch (err) {
//    console.log('Não foi possivél conectar: ', err);
//}

module.exports = sequelize;