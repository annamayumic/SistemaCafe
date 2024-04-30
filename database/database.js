const Sequelize = require('sequelize');
const connection  = new Sequelize('produtoscafe','root', '123456',{
  host: 'localhost', //nome do servidor
  dialect: 'mysql',//qual tipo de banco esta usando
  define: {
    timestamps: false,
  }
}) //root=> nome do usuario e '123456' => senha

module.exports = connection;