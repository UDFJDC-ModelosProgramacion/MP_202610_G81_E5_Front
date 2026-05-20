const BASE_URL = '/api';
export async function getAdoptionProcesses() {
  const response = await fetch(`${BASE_URL}/adoption-processes`);
  if (!response.ok) {
    throw new Error(`Error al obtener los procesos de adopción: ${response.status}`);
  }
  return response.json();
}

export function filterAdoptionProcesses(processes, filters = {}) {
  return processes.filter((p) => {
    // Filtro por estado
    if (filters.status && filters.status !== "ALL") {
      if (p.status !== filters.status) return false;
    }

    // Filtro por nombre del adoptante
    if (filters.search) {
      const term = filters.search.toLowerCase();
      const adopterName = `${p.adopter?.name ?? ""} ${p.adopter?.lastName ?? ""}`.toLowerCase();
      if (!adopterName.includes(term)) return false;
    }

    // Filtro por nombre de la mascota
    if (filters.petName) {
      const term = filters.petName.toLowerCase();
      const name = (p.pet?.name ?? "").toLowerCase();
      if (!name.includes(term)) return false;
    }

    // Filtro por fecha desde
    if (filters.dateFrom) {
      if (!p.requestDate || p.requestDate < filters.dateFrom) return false;
    }

    // Filtro por fecha hasta
    if (filters.dateTo) {
      if (!p.requestDate || p.requestDate > filters.dateTo) return false;
    }

    return true;
  });
}

export function getProcessStats(processes) {
  const total = processes.length;

  const byStatus = processes.reduce((acc, p) => {
    const s = p.status ?? "UNKNOWN";
    acc[s] = (acc[s] ?? 0) + 1;
    return acc;
  }, {});

  return { total, byStatus };
}