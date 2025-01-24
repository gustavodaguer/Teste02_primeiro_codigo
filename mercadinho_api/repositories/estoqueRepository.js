const Estoque = require("../models/Estoque");

const estoqueRepository = {
  create: (data) => Estoque.create(data),
  findAll: () => Estoque.findAll(),
  findById: (codigo_barras) => Estoque.findByPk(codigo_barras),
  update: (codigo_barras, data) =>
    Estoque.update(data, { where: { codigo_barras } }),
  delete: (codigo_barras) => Estoque.destroy({ where: { codigo_barras } }),
};

module.exports = estoqueRepository;
