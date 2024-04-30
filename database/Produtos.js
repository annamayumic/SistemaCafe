const  Sequelize = require("sequelize");
const connection = require("./database");

const Produtos = connection.define("produtos",{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  titulo:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  preco:{
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  imagem:{
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
});

//Produtos.sync({force:false}).then(()=>{});
module.exports = Produtos;