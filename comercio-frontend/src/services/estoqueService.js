import axios from "axios";

const API_URL = "http://localhost:4321/estoque";

export const getEstoque = async (token) => {
  return await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateEstoque = async (codigo_barras, estoque, token) => {
  return await axios.put(`${API_URL}/${codigo_barras}`, estoque, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
