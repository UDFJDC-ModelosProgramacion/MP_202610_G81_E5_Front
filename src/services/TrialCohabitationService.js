import axios from 'axios';

const API_URL = 'http://localhost:8080/api/trial-cohabitations';

export const createTrialCohabitation = async (cohabitationData) => {
    try {
        const response = await axios.post(API_URL, cohabitationData);
        return response.data;
    } catch (error) {
        console.error("Error al registrar convivencia:", error.response?.data || error.message);
        throw error;
    }
};