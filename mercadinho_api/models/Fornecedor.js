const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Fornecedor = sequelize.define("Fornecedor", {
  cnpj: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      is: /^\d{14}$/, // Exemplo: Validação para 14 dígitos
    },
  },
  razao_social: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  numero_parcelas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 12, // Exemplo: Limite de 1 a 12 parcelas
    },
  },
});

module.exports = Fornecedor;
