const BASE_URL = "http://localhost:8080/api";

/**
 * Obtiene todos los co-hábitats desde la API.
 * @returns {Promise<Array>}
 */
export async function getCohabitationTrials() {
  const response = await fetch(`${BASE_URL}/cohabitation-trials`);
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
  const response = await fetch(`${BASE_URL}/cohabitation-trials/${id}`);
  if (!response.ok) {
    throw new Error(`Error al obtener el co-hábitat #${id}: ${response.status}`);
  }
  return response.json();
}

/**
 * Actualiza las fechas de un co-hábitat (solo si status === "activo").
 * @param {number} id
 * @param {{ startDate: string, endDate: string }} payload
 * @returns {Promise<Object>}
 */
export async function updateCohabitationDates(id, payload) {
  const response = await fetch(`${BASE_URL}/cohabitation-trials/${id}`, {
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
 * Calcula los días restantes desde hoy hasta endDate.
 * Retorna 0 si ya venció.
 * @param {string} endDate  formato "YYYY-MM-DD"
 * @returns {number}
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

export const createTrialCohabitation = async (cohabitationData) => {
    try {
        const response = await axios.post(API_URL, cohabitationData);
        return response.data;
    } catch (error) {
        console.error("Error al registrar convivencia:", error.response?.data || error.message);
        throw error;
    }
};