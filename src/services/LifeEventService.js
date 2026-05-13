import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
});

// 1. Obtener todas las mascotas
export const getPets = async () => {
  const response = await api.get('/pets');
  return response.data;
};

// 2. Obtener tipos de eventos
export const getTypeLifeEvents = async () => {
  const response = await api.get('/type-life-events');
  return response.data;
};

// 3. Crear el evento
export const createLifeEvent = async (payload) => {
  const response = await api.post('/life-events', payload);
  return response.data;
};

// --- ESTA ES LA FUNCIÓN QUE FALTABA ---
// 4. Obtener eventos de una mascota específica
export const getPetLifeEvents = async (petId) => {
  // Esta ruta debe coincidir con la de tu controlador unificado: /pets/{id}/life-events
  const response = await api.get(`/pets/${petId}/life-events`);
  return response.data;
};