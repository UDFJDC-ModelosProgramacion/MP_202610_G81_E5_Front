// ─── src/services/TrialCohabitationService.js ───
import axios from 'axios';

const BASE_URL = "/api"; 

/**
 * Registra una nueva convivencia (Usando Axios).
 */
export const createTrialCohabitation = async (cohabitationData) => {
    try {
        const response = await axios.post(`${BASE_URL}/cohabitations-trials`, cohabitationData);
        return response.data;
    } catch (error) {
        console.error("Error al registrar convivencia:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Obtiene todos los co-hábitats desde la API.
 * @returns {Promise<Array>}
 */
export async function getCohabitationTrials() {
  const response = await fetch(`${BASE_URL}/cohabitations-trials`);
  if (!response.ok) {
    throw new Error(`Error al obtener los co-hábitats: ${response.status}`);
  }
  return response.json();
}

/**
 * Obtiene un co-hábitat por ID.
 * @param {number} id
 * @returns {Promise<Object>}
 */
export async function getCohabitationTrialById(id) {
  const response = await fetch(`${BASE_URL}/cohabitations-trials/${id}`);
  if (!response.ok) {
    throw new Error(`Error al obtener el co-hábitat #${id}: ${response.status}`);
  }
  return response.json();
}

/**
 * Actualiza las fechas de un co-hábitat (PATCH).
 * @param {number} id
 * @param {{ startDate: string, endDate: string }} payload
 * @returns {Promise<Object>}
 */
export async function updateCohabitationDates(id, payload) {
  const response = await fetch(`${BASE_URL}/cohabitations-trials/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message ?? `Error al actualizar: ${response.status}`);
  }
  return response.json();
}

/**
 * Actualiza una prueba de convivencia por completo (PUT).
 */
export async function updateCohabitationTrial(id, payload) {
  const response = await fetch(`${BASE_URL}/cohabitations-trials/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message ?? `Error al actualizar: ${response.status}`);
  }
  return response.json();
}

/**
 * Elimina un co-hábitat del sistema.
 */
export async function deleteCohabitationTrial(id) {
  const response = await fetch(`${BASE_URL}/cohabitations-trials/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`Error al eliminar: ${response.status}`);
}

/**
 * Calcula los días restantes desde hoy hasta endDate.
 * Retorna un número positivo, negativo o cero si ya venció.
 */
export function calcRemainingDays(endDate) {
  if (!endDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);
  const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  return diff;
}

/**
 * Calcula el porcentaje de progreso entre startDate y endDate.
 * @param {string} startDate
 * @param {string} endDate
 * @returns {number} 0-100
 */
export function calcProgress(startDate, endDate) {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate).getTime();
  const end   = new Date(endDate).getTime();
  const today = new Date().getTime();
  if (today <= start) return 0;
  if (today >= end)   return 100;
  return Math.round(((today - start) / (end - start)) * 100);
}