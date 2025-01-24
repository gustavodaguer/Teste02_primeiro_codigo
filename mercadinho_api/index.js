const express = require("express");
const clienteRoutes = require("./routes/clienteRoutes");
const fornecedorRoutes = require("./routes/fornecedorRoutes");
const estoqueRoutes = require("./routes/estoqueRoutes");
const vendasRoutes = require("./routes/vendasRoutes");
const contasReceberRoutes = require("./routes/contasReceberRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const contasPagarRoutes = require("./routes/contasPagarRoutes");
const sequelize = require("./config/database");

const app = express();
app.use(express.json());

app.use("/clientes", clienteRoutes);
app.use("/fornecedores", fornecedorRoutes);
app.use("/estoque", estoqueRoutes);
app.use("/vendas", vendasRoutes);
app.use("/contas-a-receber", contasReceberRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/contas-a-pagar", contasPagarRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  sequelize
    .authenticate()
    .then(() => {
      console.log("Conectado ao banco de dados");
    })
    .catch((error) => console.log("Erro de conexão:", error));
});
