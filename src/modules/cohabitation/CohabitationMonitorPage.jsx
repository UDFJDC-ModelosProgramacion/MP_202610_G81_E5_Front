import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCohabitationTrials,
  calcRemainingDays,
  calcProgress,
} from '../../services/TrialCohabitationService';
import "./CohabitationMonitor.css";

/* ── Helpers ── */
const fmt = (date) =>
  date
    ? new Date(date).toLocaleDateString("es-CO", {
        day: "2-digit", month: "short", year: "numeric",
      })
    : "—";

const badgeKey = (status) => {
  if (!status) return "default";
  const s = status.toLowerCase();
  if (s === "activo")     return "activo";
  if (s === "inactivo")   return "inactivo";
  if (s === "finalizado") return "finalizado";
  if (s === "cancelado")  return "cancelado";
  return "default";
};

/* ── Cuenta regresiva ── */
function Countdown({ startDate, endDate }) {
  const remaining = calcRemainingDays(endDate);
  const progress  = calcProgress(startDate, endDate);

  const isDone   = remaining !== null && remaining <= 0;
  const isUrgent = remaining !== null && remaining > 0 && remaining <= 5;

  const numClass = isDone
    ? "ph-countdown__number ph-countdown__number--done"
    : isUrgent
    ? "ph-countdown__number ph-countdown__number--urgent"
    : "ph-countdown__number";

  const barClass = isDone
    ? "ph-progress-bar ph-progress-bar--done"
    : isUrgent
    ? "ph-progress-bar ph-progress-bar--urgent"
    : "ph-progress-bar";

  return (
    <div className="ph-countdown">
      <div className={numClass}>
        {remaining === null ? "—" : isDone ? "✓" : remaining}
      </div>
      <div className="ph-countdown__label">
        {remaining === null
          ? "Sin fecha de fin"
          : isDone
          ? "Período finalizado"
          : `día${remaining === 1 ? "" : "s"} restante${remaining === 1 ? "" : "s"}`}
      </div>

      {startDate && endDate && (
        <>
          <div className="ph-progress-wrap">
            <div className={barClass} style={{ width: `${progress}%` }} />
          </div>
          <div className="ph-progress-labels">
            <span>{fmt(startDate)}</span>
            <span>{progress}%</span>
            <span>{fmt(endDate)}</span>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Feed de observaciones ── */
function ObservationFeed({ trial }) {
  const observations = [];

  if (trial.veterinarian) {
    const vetName = [trial.veterinarian.name, trial.veterinarian.lastName]
      .filter(Boolean).join(" ");
    observations.push({
      id:     "vet-1",
      author: vetName || "Veterinario",
      role:   "Veterinario",
      icon:   "🩺",
      text:   `Revisión del período de convivencia. Estado actual: ${trial.status ?? "—"}.`,
      date:   trial.startDate,
    });
  }

  if (trial.adoptionProcess) {
    const proc = trial.adoptionProcess;
    const adopterName = proc.adopter
      ? [proc.adopter.name, proc.adopter.lastName].filter(Boolean).join(" ")
      : "Adoptante";
    observations.push({
      id:     "adopter-1",
      author: adopterName,
      role:   "Adoptante",
      icon:   "👤",
      text:   `Proceso de adopción #${proc.id ?? "—"} vinculado a esta prueba de convivencia.`,
      date:   trial.endDate,
    });
  }

  return (
    <div className="ph-feed">
      {observations.length === 0 ? (
        <p className="ph-feed-empty">Sin observaciones registradas.</p>
      ) : (
        observations.map((obs) => (
          <div key={obs.id} className="ph-feed-item">
            <div className="ph-feed-item__avatar">{obs.icon}</div>
            <div className="ph-feed-item__body">
              <div>
                <span className="ph-feed-item__author">{obs.author}</span>
                <span className="ph-feed-item__role">{obs.role}</span>
              </div>
              <p className="ph-feed-item__text">{obs.text}</p>
              <div className="ph-feed-item__date">{fmt(obs.date)}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* ── Componente principal ── */
export default function CohabitationMonitor() {
  const navigate = useNavigate();

  const [trials,   setTrials]   = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCohabitationTrials();
      setTrials(data);
      if (data.length > 0) setSelected(data[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const isReadOnly = selected?.status?.toLowerCase() !== "activo";

  const vetName = selected?.veterinarian
    ? [selected.veterinarian.name, selected.veterinarian.lastName].filter(Boolean).join(" ")
    : "—";

  const processId = selected?.adoptionProcess?.id ?? "—";

  return (
    <div className="ph-layout">
      {/* Navbar Superior Claro e integrado */}
      <nav className="ph-navbar">
        <div className="ph-navbar__left">
          <div className="ph-navbar__menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="ph-navbar__brand">🐾 PawHub</span>
        </div>
        <div className="ph-navbar__right">
          <div className="ph-navbar__avatar">DM</div>
        </div>
      </nav>

      <div className="ph-container">
        {/* Banner de Título de Borde a Borde (Grande como la captura) */}
        <header className="ph-banner-header">
          <div className="ph-tag">Co-Hábitat</div>
          <h1 className="ph-title">Monitor de Co-Hábitat 🔍</h1>
          <p className="ph-subtitle">Visualiza y controla el estado de las pruebas de convivencia activas.</p>
        </header>

        {/* Bloque de Contenido / Formulario */}
        <main className="ph-card">
          <div className="ph-back-nav">
            <button className="ph-back-btn" onClick={() => navigate(-1)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </button>
          </div>

          {loading ? (
            <div className="ph-state">
              <div className="ph-spinner" />
              <p className="ph-state__text">Cargando co-hábitats…</p>
            </div>
          ) : error ? (
            <div className="ph-state">
              <p className="ph-state__title">⚠️ Error de conexión</p>
              <p className="ph-state__text">{error}</p>
            </div>
          ) : (
            <div className="ph-form-grid">
              {trials.length > 1 && (
                <div className="ph-field ph-field--full">
                  <select
                    value={selected?.id ?? ""}
                    onChange={(e) => {
                      const t = trials.find((x) => String(x.id) === e.target.value);
                      if (t) setSelected(t);
                    }}
                  >
                    {trials.map((t) => (
                      <option key={t.id} value={t.id}>
                        Prueba #{t.id} — {t.status ?? "Sin estado"} · Proceso #{t.adoptionProcess?.id ?? "—"}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selected ? (
                <>
                  <div className="ph-field">
                    <input type="date" value={selected.startDate ?? ""} readOnly disabled placeholder="Fecha de inicio" />
                  </div>

                  <div className="ph-field">
                    <input type="date" value={selected.endDate ?? ""} readOnly disabled placeholder="Fecha de fin" />
                  </div>

                  <div className="ph-field">
                    <div className={`ph-input-mock ph-badge--${badgeKey(selected.status)}`}>
                      {selected.status ? `Estado: ${selected.status}` : "—"}
                    </div>
                  </div>

                  <div className="ph-field">
                    <div className="ph-input-mock">Proceso de Adopción: #{processId}</div>
                  </div>

                  <div className="ph-field">
                    <div className="ph-input-mock">Veterinario: {vetName}</div>
                  </div>

                  <div className="ph-field">
                    <div className="ph-input-mock">ID Prueba: #{selected.id ?? "—"}</div>
                  </div>

                  <div className="ph-field ph-field--full">
                    <span className="ph-field__static-label">⏳ Progreso y cuenta regresiva</span>
                    <div className="ph-input-mock ph-input-mock--auto-height">
                      <Countdown startDate={selected.startDate} endDate={selected.endDate} />
                    </div>
                  </div>

                  <div className="ph-field ph-field--full">
                    <span className="ph-field__static-label">💬 Observaciones del Proceso</span>
                    <div className="ph-input-mock ph-input-mock--auto-height">
                      <ObservationFeed trial={selected} />
                    </div>
                  </div>
                </>
              ) : (
                <div className="ph-state ph-field--full">
                  <p className="ph-state__text">No hay co-hábitats disponibles en el sistema.</p>
                </div>
              )}

              <div className="ph-field ph-field--full ph-actions">
                <button className="ph-btn-submit" onClick={loadData} disabled={loading}>
                  Refrescar Información
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}