import axios from "axios";

const API_URL = "http://localhost:4321/vendas";

export const getVendas = async (token) => {
  return await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createVenda = async (venda, token) => {
  return await axios.post(API_URL, venda, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
