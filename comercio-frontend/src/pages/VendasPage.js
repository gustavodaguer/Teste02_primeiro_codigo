import React, { useState, useEffect, useContext } from "react";
import { getVendas, createVenda } from "../services/vendasService";
import AuthContext from "../context/AuthContext";

const VendasPage = () => {
  const { authToken } = useContext(AuthContext);
  const [vendas, setVendas] = useState([]);
  const [newVenda, setNewVenda] = useState({
    cliente_id: "",
    endereco_entrega: "",
    produtos: [],
    valor_total: 0,
    tipo_pagamento: "a_vista",
  });

  const fetchVendas = async () => {
    const response = await getVendas(authToken);
    setVendas(response.data);
  };

  useEffect(() => {
    fetchVendas();
  }, [authToken]);

  const handleCreate = async () => {
    await createVenda(newVenda, authToken);
    fetchVendas();
    setNewVenda({
      cliente_id: "",
      endereco_entrega: "",
      produtos: [],
      valor_total: 0,
      tipo_pagamento: "a_vista",
    });
  };

  return (
    <div>
      <h2>Vendas</h2>
      <ul>
        {vendas.map((venda) => (
          <li key={venda.id}>
            {venda.cliente_id} - {venda.valor_total} - {venda.tipo_pagamento}
          </li>
        ))}
      </ul>
      <div>
        <h3>Cadastrar Venda</h3>
        <input
          placeholder="Cliente CPF"
          value={newVenda.cliente_id}
          onChange={(e) =>
            setNewVenda({ ...newVenda, cliente_id: e.target.value })
          }
        />
        <input
          placeholder="Endereço Entrega"
          value={newVenda.endereco_entrega}
          onChange={(e) =>
            setNewVenda({ ...newVenda, endereco_entrega: e.target.value })
          }
        />
        <input
          placeholder="Valor Total"
          type="number"
          value={newVenda.valor_total}
          onChange={(e) =>
            setNewVenda({ ...newVenda, valor_total: e.target.value })
          }
        />
        <select
          value={newVenda.tipo_pagamento}
          onChange={(e) =>
            setNewVenda({ ...newVenda, tipo_pagamento: e.target.value })
          }
        >
          <option value="a_vista">À Vista</option>
          <option value="a_prazo">A Prazo</option>
        </select>
        <button onClick={handleCreate}>Cadastrar</button>
      </div>
    </div>
  );
};

export default VendasPage;
