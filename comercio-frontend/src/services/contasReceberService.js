import axios from "axios";

const API_URL = "http://localhost:4321/contas-a-receber";

export const getContasReceber = async (token) => {
  return await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
