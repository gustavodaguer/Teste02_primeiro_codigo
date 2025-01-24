const vendasRepository = require("../repositories/vendasRepository");
const clienteRepository = require("../repositories/clienteRepository");
const estoqueRepository = require("../repositories/estoqueRepository");

const vendasService = {
  create: async (data) => {
    const { cliente_id, produtos, tipo_pagamento, valor_total, parcelas } =
      data;

    // Verificar o crédito do cliente se o pagamento for a prazo
    if (tipo_pagamento === "a_prazo") {
      if (tipo_pagamento === "a_prazo" || (parcelas && parcelas > 1)) {
        await contasReceberService.createParcelas(
          cliente_id,
          valor_total,
          parcelas || 1
        );
      }
      const cliente = await clienteRepository.findById(cliente_id);
      if (!cliente) throw new Error("Cliente não encontrado");

      const valorTotal = data.valor_total;
      if (valorTotal > cliente.credito) {
        throw new Error("O valor total excede o limite de crédito do cliente.");
      }

      // Definir prazo de pagamento (exemplo: 30 dias)
      data.data_vencimento = new Date();
      data.data_vencimento.setDate(data.data_vencimento.getDate() + 30);
    }

    // Abater produtos vendidos do estoque
    for (const produto of produtos) {
      const { codigo_barras, quantidade } = produto;
      const itemEstoque = await estoqueRepository.findById(codigo_barras);

      if (!itemEstoque) {
        throw new Error(
          `Produto com código ${codigo_barras} não encontrado no estoque`
        );
      }

      if (itemEstoque.quantidade_estoque < quantidade) {
        throw new Error(
          `Estoque insuficiente para o produto ${itemEstoque.nome_produto}`
        );
      }

      // Atualizar quantidade no estoque
      await estoqueRepository.update(codigo_barras, {
        quantidade_estoque: itemEstoque.quantidade_estoque - quantidade,
      });
    }

    return await vendasRepository.create(data);
  },
  getAll: () => vendasRepository.findAll(),
  getById: (id) => vendasRepository.findById(id),
  update: async (id, data) => {
    // Opcional: Verificação adicional em uma atualização
    return await vendasRepository.update(id, data);
  },
  delete: (id) => vendasRepository.delete(id),
};

module.exports = vendasService;
