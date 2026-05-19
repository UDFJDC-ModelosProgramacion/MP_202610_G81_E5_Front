import axios from 'axios';

const API_URL = '/api/events';

export const createShelterEvent = async (eventData) => {
    try {
        const response = await axios.post(API_URL, eventData);
        return response.data;
    } catch (error) {
        console.error("Error al crear evento de refugio:", error.response?.data || error.message);
        throw error;
    }
};