import axios from 'axios';

const API_URL = 'http://localhost:8080/api/life-events';

export const createLifeEvent = async (eventData) => {
    try {
        const response = await axios.post(API_URL, eventData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el evento:", error.response?.data || error.message);
        throw error;
    }
};