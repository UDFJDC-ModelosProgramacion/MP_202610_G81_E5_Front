import axios from 'axios';

// Ajusta la URL base si mapeaste el proxy en Vite. 
// Si usas el proxy de PawHub para /api, déjalo como '/api/veterinarians'
const API_URL = '/api/veterinarians';

/**
 * Registra un nuevo veterinario enviando el DTO al backend.
 * @param {Object} veterinarianData - { licenseNumber, specialty, availability, shelterId }
 */
export const createVeterinarian = async (veterinarianData) => {
    try {
        const response = await axios.post(API_URL, veterinarianData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        // Captura el mensaje detallado de error enviado por las excepciones de Spring Boot
        const message = error.response?.data?.message || 'Error al conectar con el servidor';
        throw new Error(message);
    }
};

/**
 * Opcional: Obtener todos los veterinarios si los necesitas más adelante
 */
export const getVeterinarians = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Error al obtener la lista de veterinarios';
        throw new Error(message);
    }
};