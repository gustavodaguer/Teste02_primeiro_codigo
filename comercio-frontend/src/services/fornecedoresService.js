import axios from "axios";

const API_URL = "http://localhost:4321/fornecedores";

export const getFornecedores = async (token) => {
  return await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createFornecedor = async (fornecedor, token) => {
  return await axios.post(API_URL, fornecedor, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
