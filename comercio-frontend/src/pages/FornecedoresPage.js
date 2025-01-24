import React, { useState, useEffect, useContext } from "react";
import {
  getFornecedores,
  createFornecedor,
} from "../services/fornecedoresService";
import AuthContext from "../context/AuthContext";

const FornecedoresPage = () => {
  const { authToken } = useContext(AuthContext);
  const [fornecedores, setFornecedores] = useState([]);
  const [newFornecedor, setNewFornecedor] = useState({
    cnpj: "",
    razao_social: "",
    telefone: "",
  });

  const fetchFornecedores = async () => {
    const response = await getFornecedores(authToken);
    setFornecedores(response.data);
  };

  useEffect(() => {
    fetchFornecedores();
  }, [authToken]);

  const handleCreate = async () => {
    await createFornecedor(newFornecedor, authToken);
    fetchFornecedores();
    setNewFornecedor({ cnpj: "", razao_social: "", telefone: "" });
  };

  return (
    <div>
      <h2>Fornecedores</h2>
      <ul>
        {fornecedores.map((fornecedor) => (
          <li key={fornecedor.cnpj}>
            {fornecedor.razao_social} - {fornecedor.telefone}
          </li>
        ))}
      </ul>
      <div>
        <h3>Cadastrar Fornecedor</h3>
        <input
          placeholder="CNPJ"
          value={newFornecedor.cnpj}
          onChange={(e) =>
            setNewFornecedor({ ...newFornecedor, cnpj: e.target.value })
          }
        />
        <input
          placeholder="Razão Social"
          value={newFornecedor.razao_social}
          onChange={(e) =>
            setNewFornecedor({ ...newFornecedor, razao_social: e.target.value })
          }
        />
        <input
          placeholder="Telefone"
          value={newFornecedor.telefone}
          onChange={(e) =>
            setNewFornecedor({ ...newFornecedor, telefone: e.target.value })
          }
        />
        <button onClick={handleCreate}>Cadastrar</button>
      </div>
    </div>
  );
};

export default FornecedoresPage;
