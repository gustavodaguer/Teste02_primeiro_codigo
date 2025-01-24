import axios from "axios";

const API_URL = "http://localhost:4321/clientes";

export const getClientes = async (token) => {
  return await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createCliente = async (cliente, token) => {
  return await axios.post(API_URL, cliente, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateCliente = async (cpf, cliente, token) => {
  return await axios.put(`${API_URL}/${cpf}`, cliente, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteCliente = async (cpf, token) => {
  return await axios.delete(`${API_URL}/${cpf}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
