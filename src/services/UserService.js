import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error al registrar usuario:', error.response?.data || error.message);
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuario:', error.response?.data || error.message);
        throw error;
    }
};
