import axios from 'axios';

const API_URL = '/api/pets';

export const createPet = async (petData) => {
    try {
        const response = await axios.post(API_URL, petData);
        return response.data;
    } catch (error) {
        console.error('Error al registrar mascota:', error.response?.data || error.message);
        throw error;
    }
};

export const getPetsByOwner = async (ownerId) => {
    try {
        const response = await axios.get(`${API_URL}/owner/${ownerId}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener mascotas:', error.response?.data || error.message);
        throw error;
    }
};

export const getPetById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener mascota:', error.response?.data || error.message);
        throw error;
    }
};
