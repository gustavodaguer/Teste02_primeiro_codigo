const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Fornecedor = require("./Fornecedor"); // Assumindo que o modelo Fornecedor já está criado

const ContasPagar = sequelize.define("ContasPagar", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fornecedor_id: {
    type: DataTypes.STRING,
    references: {
      model: Fornecedor,
      key: "cnpj",
    },
    allowNull: false,
  },
  data_vencimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  valor_parcela: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

ContasPagar.belongsTo(Fornecedor, {
  foreignKey: "fornecedor_id",
  as: "fornecedor",
});

module.exports = ContasPagar;
