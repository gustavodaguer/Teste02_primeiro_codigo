const pedidoRepository = require("../repositories/pedidoRepository");
const contasPagarService = require("../services/contasPagarService");
const fornecedorRepository = require("../repositories/fornecedorRepository");
const estoqueRepository = require("../repositories/estoqueRepository");

const pedidoService = {
  create: async (data) => {
    const { fornecedor_id, valor_total } = data;

    // Buscar o fornecedor para obter o número de parcelas permitido
    const fornecedor = await fornecedorRepository.findById(fornecedor_id);
    if (!fornecedor) throw new Error("Fornecedor não encontrado");

    const numeroParcelas = fornecedor.numero_parcelas || 1;
    const pedido = await pedidoRepository.create(data);

    // Gerar parcelas na tabela de contas a pagar
    await contasPagarService.createParcelas(
      fornecedor_id,
      valor_total,
      numeroParcelas,
      new Date()
    );

    return pedido;
  },
  getAll: () => pedidoRepository.findAll(),
  getById: (id) => pedidoRepository.findById(id),
  update: async (id, data) => {
    return await pedidoRepository.update(id, data);
  },
  delete: (id) => pedidoRepository.delete(id),

  gerarPedidosAutomaticos: async () => {
    // Busca produtos com estoque abaixo da quantidade mínima
    const produtosBaixoEstoque = await estoqueRepository.findAll({
      where: {
        quantidade_estoque: { [Op.lt]: sequelize.col("quantidade_minima") },
      },
    });

    for (const produto of produtosBaixoEstoque) {
      const fornecedor = await fornecedorRepository.findById(
        produto.fornecedor_id
      );
      if (!fornecedor) continue;

      const valorTotal = produto.preco_custo * produto.quantidade_maxima;
      const pedidoData = {
        fornecedor_id: fornecedor.cnpj,
        telefone: fornecedor.telefone,
        produtos: [
          {
            codigo_barras: produto.codigo_barras,
            quantidade: produto.quantidade_maxima,
          },
        ],
        quantidade: produto.quantidade_maxima,
        preco_custo: produto.preco_custo,
        valor_total: valorTotal,
      };

      // Criar pedido no banco de dados
      await pedidoRepository.create(pedidoData);
    }
  },
};

module.exports = pedidoService;
