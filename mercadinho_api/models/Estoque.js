const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Estoque = sequelize.define("Estoque", {
  codigo_barras: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      is: /^[0-9]+$/, // Somente números para o código de barras
    },
  },
  nome_produto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unidade_medida: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidade_estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  preco_custo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  preco_venda: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  promocao: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  quantidade_minima: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  quantidade_maxima: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  fornecedor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Estoque;
