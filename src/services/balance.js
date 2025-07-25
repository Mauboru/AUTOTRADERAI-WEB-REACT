import api from './api';

export const getBalance = async () => {
    return await api.get('/balance/index');
};