const vendasService = require("../services/vendasService");

const vendasController = {
  create: async (req, res) => {
    try {
      const venda = await vendasService.create(req.body);
      res.status(201).json(venda);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getAll: async (req, res) => {
    const vendas = await vendasService.getAll();
    res.json(vendas);
  },
  getById: async (req, res) => {
    const venda = await vendasService.getById(req.params.id);
    if (!venda) {
      return res.status(404).json({ message: "Venda não encontrada" });
    }
    res.json(venda);
  },
  update: async (req, res) => {
    try {
      await vendasService.update(req.params.id, req.body);
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    await vendasService.delete(req.params.id);
    res.sendStatus(204);
  },
};

module.exports = vendasController;
