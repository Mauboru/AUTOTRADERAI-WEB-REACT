import api from './api';

export const analise = async (dados) => {
    return await api.post('/analise', dados);
};  

export const getSaldo = async () => {
    return await api.get('/saldo');
};  

export const executar = async (dados) => {
    return await api.post('/executar', dados);
};  

export const listarAcoes = async () => {
    return await api.get('/acoes');
  };
  