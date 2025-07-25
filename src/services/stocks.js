import api from './api';

export const getMyStocks = async () => {
    return await api.get('/stocks/index');
};

export const buyStock = async (data) => {
    return await api.post('/stocks/create', data);
};