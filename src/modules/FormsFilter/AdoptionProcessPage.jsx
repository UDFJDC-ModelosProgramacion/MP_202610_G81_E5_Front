import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdoptionProcesses,
  filterAdoptionProcesses,
  getProcessStats,
} from "../../services/adoptionProcessService";
import "./AdoptionProcessPage.css";

const STATUS_OPTIONS = [
  { value: "ALL",       label: "Todos los estados" },
  { value: "PENDING",   label: "Pendiente" },
  { value: "IN_REVIEW", label: "En revisión" },
  { value: "APPROVED",  label: "Aprobado" },
  { value: "REJECTED",  label: "Rechazado" },
];

const STATUS_LABELS = {
  PENDING:   "Pendiente",
  IN_REVIEW: "En revisión",
  APPROVED:  "Aprobado",
  REJECTED:  "Rechazado",
};

const EMPTY_FILTERS = {
  search: "", petName: "", status: "ALL", dateFrom: "", dateTo: "",
};

function StatusBadge({ status }) {
  const key = STATUS_LABELS[status] ? status : "UNKNOWN";
  return (
    <span className={`ap-badge ap-badge--${key}`}>
      {STATUS_LABELS[status] ?? status ?? "—"}
    </span>
  );
}

function ProcessCard({ process: p, index }) {
  const adopterName =
    [p.adopter?.name, p.adopter?.lastName].filter(Boolean).join(" ") || "—";
  const petName    = p.pet?.name ?? "—";
  const petSpecies = p.pet?.species ? ` · ${p.pet.species}` : "";
  const vetName    =
    [p.veterinarian?.name, p.veterinarian?.lastName].filter(Boolean).join(" ") || "—";
  const reqId = p.request?.id ?? "—";
  const formattedDate = p.requestDate
    ? new Date(p.requestDate).toLocaleDateString("es-CO", {
        day: "2-digit", month: "short", year: "numeric",
      })
    : "—";

  return (
    <div className="ap-process-card" style={{ animationDelay: `${index * 40}ms` }}>
      <div className="ap-process-card__header">
        <div>
          <div className="ap-process-card__name">{adopterName}</div>
          <div className="ap-process-card__id">Solicitud #{reqId}</div>
        </div>
        <StatusBadge status={p.status} />
      </div>
      <div className="ap-process-card__info">
        <div className="ap-info-item">
          <span className="ap-info-item__label">Mascota</span>
          <span className="ap-info-item__value">{petName}{petSpecies}</span>
        </div>
        <div className="ap-info-item">
          <span className="ap-info-item__label">Veterinario</span>
          <span className="ap-info-item__value">{vetName}</span>
        </div>
        <div className="ap-info-item">
          <span className="ap-info-item__label">Fecha solicitud</span>
          <span className="ap-info-item__value">{formattedDate}</span>
        </div>
        <div className="ap-info-item">
          <span className="ap-info-item__label">Email adoptante</span>
          <span className="ap-info-item__value" style={{ fontSize: ".78rem" }}>
            {p.adopter?.email ?? "—"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AdoptionProcessPage() {
  const navigate = useNavigate();
  const [all,      setAll]      = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters,  setFilters]  = useState(EMPTY_FILTERS);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdoptionProcesses();
      setAll(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);
  useEffect(() => {
    setFiltered(filterAdoptionProcesses(all, filters));
  }, [all, filters]);

  const handleChange = (field) => (e) =>
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));

  const applyFilters = () => {
    setFiltered(filterAdoptionProcesses(all, filters));
  };

  return (
    <div className="ap-page">
      {/* Top Bar */}
      <nav className="ap-topbar">
        <button className="ap-topbar__btn" onClick={() => navigate(-1)}>←</button>
        <span className="ap-topbar__title">Procesos de Adopción</span>
        <button className="ap-topbar__btn" onClick={loadData} disabled={loading}>✓</button>
      </nav>

      <div className="ap-body">
        {/* Ícono */}
        <div className="ap-icon-wrap">
          <div className="ap-icon-circle">🐾</div>
        </div>

        <h1 className="ap-section-title">Filtrar Procesos</h1>

        {/* Nombre adoptante */}
        <div className="ap-field">
          <label className="ap-field__label">Nombre del adoptante <span>*</span></label>
          <input
            type="text"
            placeholder="Buscar por nombre…"
            value={filters.search}
            onChange={handleChange("search")}
          />
        </div>

        {/* Nombre mascota */}
        <div className="ap-field">
          <label className="ap-field__label">Nombre de la mascota <span>*</span></label>
          <input
            type="text"
            placeholder="Buscar mascota…"
            value={filters.petName}
            onChange={handleChange("petName")}
          />
        </div>

        {/* Rango fechas */}
        <div className="ap-date-row">
          <div className="ap-field">
            <label className="ap-field__label">Fecha desde <span>*</span></label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={handleChange("dateFrom")}
            />
          </div>
          <div className="ap-field">
            <label className="ap-field__label">Fecha hasta <span>*</span></label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={handleChange("dateTo")}
            />
          </div>
        </div>

        {/* Estado */}
        <div className="ap-field ap-field--select">
          <label className="ap-field__label">Estado / Resultado <span>*</span></label>
          <select value={filters.status} onChange={handleChange("status")}>
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Botón filtrar */}
        <button className="ap-btn-primary" onClick={applyFilters} disabled={loading}>
          Filtrar Procesos
        </button>

        <hr className="ap-divider" />

        {/* Resultados */}
        {loading ? (
          <div className="ap-state">
            <div className="ap-spinner" />
            <p className="ap-state__text">Cargando procesos…</p>
          </div>
        ) : error ? (
          <div className="ap-state">
            <div className="ap-state__icon">⚠️</div>
            <p className="ap-state__title">Error de conexión</p>
            <p className="ap-state__text">{error}</p>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <p className="ap-results-label">
                <strong>{filtered.length}</strong> de <strong>{all.length}</strong> procesos
              </p>
              <button className="ap-btn-clear" onClick={() => setFilters(EMPTY_FILTERS)}>
                Limpiar filtros
              </button>
            </div>

            {filtered.length === 0 ? (
              <div className="ap-state">
                <div className="ap-state__icon">🔍</div>
                <p className="ap-state__title">Sin resultados</p>
                <p className="ap-state__text">Ningún proceso coincide con los filtros aplicados.</p>
              </div>
            ) : (
              <div className="ap-list">
                {filtered.map((p, i) => (
                  <ProcessCard key={p.id ?? i} process={p} index={i} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}