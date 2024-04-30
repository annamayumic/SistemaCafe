const  Sequelize = require("sequelize");
const connection = require("./database");

const Clientes = connection.define("clientes",{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  numero:{
    type: Sequelize.INTEGER,
    primaryKey:true,
    allowNull: false
  }
});


Clientes.sync({force:false}).then(()=>{});
module.exports = Clientes;