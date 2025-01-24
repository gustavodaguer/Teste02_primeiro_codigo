const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Cliente = require("./Cliente"); // Assumindo que o modelo Cliente já está criado

const Vendas = sequelize.define("Vendas", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cliente_id: {
    type: DataTypes.STRING,
    references: {
      model: Cliente,
      key: "cpf",
    },
    allowNull: false,
  },
  endereco_entrega: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_venda: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  produtos: {
    type: DataTypes.JSONB, // Armazena uma lista de produtos e quantidades como JSON
    allowNull: false,
  },
  valor_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  tipo_pagamento: {
    type: DataTypes.ENUM(
      "Cartão de Crédito",
      "Cartão de Débito",
      "Pix",
      "Loja"
    ),
    allowNull: false,
  },
});

// Definindo associação com Cliente
Vendas.belongsTo(Cliente, { foreignKey: "cliente_id", as: "cliente" });

module.exports = Vendas;
