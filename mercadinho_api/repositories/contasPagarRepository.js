const ContasPagar = require("../models/ContasPagar");

const contasPagarRepository = {
  create: (data) => ContasPagar.create(data),
  findAll: () => ContasPagar.findAll(),
  findById: (id) => ContasPagar.findByPk(id),
  update: (id, data) => ContasPagar.update(data, { where: { id } }),
  delete: (id) => ContasPagar.destroy({ where: { id } }),
};

module.exports = contasPagarRepository;
