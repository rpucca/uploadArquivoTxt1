//arquivo gerado automaticamente com o comando documentado em read.md
//npx sequelize-cli model:generate --name Users --attributes cpf:string,nome:string,email:string,endereco:string

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    cpf: DataTypes.STRING,
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    endereco: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};