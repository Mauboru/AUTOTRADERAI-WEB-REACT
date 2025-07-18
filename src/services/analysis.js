import api from './api';

export const getStocks = async () => {
    return await api.get('/analysis/getStocks');
};