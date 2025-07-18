import api from './api';

export const getSaldo = async () => {
    return await api.get('/balance/index');
};