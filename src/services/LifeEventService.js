import axios from 'axios';

const API_URL = '/api';

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

// 3. Obtener todos los veterinarios (Agregada para solucionar tu problema)
export const getVeterinarians = async () => {
  const response = await api.get('/veterinarians');
  return response.data;
};

// 4. Crear el evento de vida
export const createLifeEvent = async (payload) => {
  const response = await api.post('/life-events', payload);
  return response.data;
};

// 5. Crear un nuevo Tipo de Evento de Vida (Agregada para el nuevo formulario)
export const createTypeLifeEvent = async (payload) => {
  const response = await api.post('/type-life-events', payload);
  return response.data;
};

// 6. Obtener eventos de una mascota específica
export const getPetLifeEvents = async (petId) => {
  const response = await api.get(`/life-events/pet/${petId}`);
  return response.data.filter(evento => evento.pet && String(evento.pet.id) === String(petId));
};