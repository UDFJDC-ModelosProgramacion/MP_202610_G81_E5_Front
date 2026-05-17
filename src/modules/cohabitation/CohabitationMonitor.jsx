import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCohabitationTrials,
  calcRemainingDays,
  calcProgress,
} from "../../services/TrialCohabitationService";
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
    ? "ch-countdown__number ch-countdown__number--done"
    : isUrgent
    ? "ch-countdown__number ch-countdown__number--urgent"
    : "ch-countdown__number";

  const barClass = isDone
    ? "ch-progress-bar ch-progress-bar--done"
    : isUrgent
    ? "ch-progress-bar ch-progress-bar--urgent"
    : "ch-progress-bar";

  return (
    <div className="ch-countdown">
      <div className={numClass}>
        {remaining === null ? "—" : isDone ? "✓" : remaining}
      </div>
      <div className="ch-countdown__label">
        {remaining === null
          ? "Sin fecha de fin"
          : isDone
          ? "Período finalizado"
          : `día${remaining === 1 ? "" : "s"} restante${remaining === 1 ? "" : "s"}`}
      </div>

      {startDate && endDate && (
        <>
          <div className="ch-progress-wrap">
            <div className={barClass} style={{ width: `${progress}%` }} />
          </div>
          <div className="ch-progress-labels">
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
  // Las observaciones vienen del adoptionProcess vinculado al trial.
  // Se construyen desde los campos disponibles del veterinario y proceso.
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
    <div className="ch-feed">
      {observations.length === 0 ? (
        <p className="ch-feed-empty">Sin observaciones registradas.</p>
      ) : (
        observations.map((obs) => (
          <div key={obs.id} className="ch-feed-item">
            <div className="ch-feed-item__avatar">{obs.icon}</div>
            <div className="ch-feed-item__body">
              <div>
                <span className="ch-feed-item__author">{obs.author}</span>
                <span className="ch-feed-item__role">{obs.role}</span>
              </div>
              <p className="ch-feed-item__text">{obs.text}</p>
              <div className="ch-feed-item__date">{fmt(obs.date)}</div>
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
    <div className="ch-page">
      {/* Top Bar */}
      <nav className="ch-topbar">
        <button className="ch-topbar__btn" onClick={() => navigate(-1)}>←</button>
        <span className="ch-topbar__title">Co-Hábitat</span>
        <button className="ch-topbar__btn" onClick={loadData} disabled={loading}>🔄</button>
      </nav>

      {loading ? (
        <div className="ch-state">
          <div className="ch-spinner" />
          <p className="ch-state__text">Cargando co-hábitats…</p>
        </div>
      ) : error ? (
        <div className="ch-state">
          <div className="ch-state__icon">⚠️</div>
          <p className="ch-state__title">Error de conexión</p>
          <p className="ch-state__text">{error}</p>
        </div>
      ) : (
        <div className="ch-body">
          {/* Ícono + título */}
          <div className="ch-icon-wrap">
            <div className="ch-icon-circle">🐾</div>
          </div>
          <h1 className="ch-section-title">Monitor de Co-Hábitat</h1>

          {/* Selector de trial */}
          {trials.length > 1 && (
            <div className="ch-card">
              <div className="ch-card__title">Seleccionar prueba</div>
              <div className="ch-field ch-field--select">
                <label className="ch-field__label">Prueba de convivencia *</label>
                <select
                  value={selected?.id ?? ""}
                  onChange={(e) => {
                    const t = trials.find((x) => String(x.id) === e.target.value);
                    if (t) setSelected(t);
                  }}
                >
                  {trials.map((t) => (
                    <option key={t.id} value={t.id}>
                      #{t.id} — {t.status ?? "Sin estado"} · Proceso #{t.adoptionProcess?.id ?? "—"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {selected ? (
            <>
              {/* ── 1. DateRangePicker ── */}
              <div className="ch-card">
                <div className="ch-card__title">📅 Período de convivencia</div>
                <div className="ch-date-row">
                  <div className="ch-field">
                    <label className="ch-field__label">Fecha de inicio *</label>
                    <input
                      type="date"
                      value={selected.startDate ?? ""}
                      disabled={isReadOnly}
                      readOnly={isReadOnly}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="ch-field">
                    <label className="ch-field__label">Fecha de fin *</label>
                    <input
                      type="date"
                      value={selected.endDate ?? ""}
                      disabled={isReadOnly}
                      readOnly={isReadOnly}
                      onChange={() => {}}
                    />
                  </div>
                </div>
                {isReadOnly && (
                  <p className="ch-readonly-note">
                    🔒 Las fechas son de solo lectura porque el estado no es <strong>activo</strong>.
                  </p>
                )}
              </div>

              {/* ── 2. Cuenta regresiva ── */}
              <div className="ch-card">
                <div className="ch-card__title">⏳ Cuenta regresiva</div>
                <Countdown startDate={selected.startDate} endDate={selected.endDate} />
              </div>

              {/* ── Info general ── */}
              <div className="ch-card">
                <div className="ch-card__title">📋 Información general</div>
                <div className="ch-info-grid">
                  <div className="ch-info-item">
                    <span className="ch-info-item__label">Estado</span>
                    <span className="ch-info-item__value">
                      <span className={`ch-badge ch-badge--${badgeKey(selected.status)}`}>
                        {selected.status ?? "—"}
                      </span>
                    </span>
                  </div>
                  <div className="ch-info-item">
                    <span className="ch-info-item__label">Proceso adopción</span>
                    <span className="ch-info-item__value">#{processId}</span>
                  </div>
                  <div className="ch-info-item">
                    <span className="ch-info-item__label">Veterinario</span>
                    <span className="ch-info-item__value">{vetName}</span>
                  </div>
                  <div className="ch-info-item">
                    <span className="ch-info-item__label">ID prueba</span>
                    <span className="ch-info-item__value">#{selected.id ?? "—"}</span>
                  </div>
                </div>
              </div>

              {/* ── 3. Feed de observaciones ── */}
              <div className="ch-card">
                <div className="ch-card__title">💬 Observaciones</div>
                <ObservationFeed trial={selected} />
              </div>
            </>
          ) : (
            <div className="ch-state">
              <div className="ch-state__icon">📭</div>
              <p className="ch-state__title">Sin pruebas registradas</p>
              <p className="ch-state__text">No hay co-hábitats disponibles en el sistema.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}