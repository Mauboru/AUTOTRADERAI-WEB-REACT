import api from './api';

export const getTip = async () => {
    return await api.get('/gemini/getTip');
};