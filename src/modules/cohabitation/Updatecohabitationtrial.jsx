import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCohabitationTrialById,
  getCohabitationTrials,
  updateCohabitationTrial,
} from "./cohabitationTrialService";
import "./UpdateCohabitationTrial.css";

const STATUS_OPTIONS = [
  { value: "activo",     label: "Activo" },
  { value: "inactivo",   label: "Inactivo" },
  { value: "finalizado", label: "Finalizado" },
  { value: "cancelado",  label: "Cancelado" },
];

const badgeKey = (status) => {
  if (!status) return "default";
  const s = status.toLowerCase();
  return ["activo", "inactivo", "finalizado", "cancelado"].includes(s) ? s : "default";
};

const EMPTY = { startDate: "", endDate: "", status: "activo", veterinarianId: "", adoptionProcessId: "" };

export default function UpdateCohabitationTrial() {
  const navigate   = useNavigate();
  const { id }     = useParams();
  const toastRef   = useRef(null);

  const [form,       setForm]       = useState(EMPTY);
  const [errors,     setErrors]     = useState({});
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [error,      setError]      = useState(null);
  const [trials,     setTrials]     = useState([]);
  const [selectedId, setSelectedId] = useState(id ?? "");

  const showToast = (msg, type = "ok") => {
    const el = toastRef.current;
    if (!el) return;
    el.textContent = msg;
    el.className = `uc-toast uc-toast--show uc-toast--${type}`;
    setTimeout(() => { el.className = "uc-toast"; }, 3000);
  };

  const loadTrial = useCallback(async (trialId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCohabitationTrialById(trialId);
      setForm({
        startDate:         data.startDate         ?? "",
        endDate:           data.endDate           ?? "",
        status:            data.status            ?? "activo",
        veterinarianId:    data.veterinarian?.id  ?? "",
        adoptionProcessId: data.adoptionProcess?.id ?? "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadTrials = useCallback(async () => {
    try {
      const data = await getCohabitationTrials();
      setTrials(data);
      if (!id && data.length > 0) {
        setSelectedId(String(data[0].id));
        await loadTrial(data[0].id);
      } else if (id) {
        await loadTrial(id);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [id, loadTrial]);

  useEffect(() => { loadTrials(); }, [loadTrials]);

  const handleSelectTrial = async (e) => {
    const tid = e.target.value;
    setSelectedId(tid);
    setErrors({});
    await loadTrial(tid);
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.startDate)         e.startDate         = "Campo requerido";
    if (!form.endDate)           e.endDate           = "Campo requerido";
    if (form.endDate && form.startDate && form.endDate < form.startDate)
      e.endDate = "Debe ser posterior a la fecha de inicio";
    if (!form.status)            e.status            = "Campo requerido";
    if (!form.veterinarianId)    e.veterinarianId    = "Campo requerido";
    if (!form.adoptionProcessId) e.adoptionProcessId = "Campo requerido";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSaving(true);
    try {
      await updateCohabitationTrial(selectedId, {
        startDate:       form.startDate,
        endDate:         form.endDate,
        status:          form.status,
        veterinarian:    { id: Number(form.veterinarianId) },
        adoptionProcess: { id: Number(form.adoptionProcessId) },
      });
      showToast("✅ Prueba actualizada correctamente", "ok");
      setTimeout(() => navigate("/cohabitation-monitor"), 1500);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const isReadOnly = form.status?.toLowerCase() !== "activo";

  return (
    <div className="uc-page">
      <nav className="uc-topbar">
        <button className="uc-topbar__btn" onClick={() => navigate(-1)}>←</button>
        <span className="uc-topbar__title">Actualizar Co-Hábitat</span>
        <button className="uc-topbar__btn" onClick={handleSubmit} disabled={saving || loading}>✓</button>
      </nav>

      {loading ? (
        <div className="uc-state">
          <div className="uc-spinner" />
          <p className="uc-state__text">Cargando prueba de convivencia…</p>
        </div>
      ) : error ? (
        <div className="uc-state">
          <div className="uc-state__icon">⚠️</div>
          <p className="uc-state__title">Error</p>
          <p className="uc-state__text">{error}</p>
        </div>
      ) : (
        <div className="uc-body">
          <div className="uc-icon-wrap">
            <div className="uc-icon-circle">🐾</div>
          </div>
          <h1 className="uc-section-title">Actualizar Convivencia</h1>

          {/* Selector de prueba */}
          {trials.length > 0 && (
            <div className="uc-card">
              <div className="uc-card__title">Seleccionar prueba</div>
              <div className="uc-field uc-field--select">
                <label className="uc-field__label" htmlFor="trialSelect">
                  Prueba de convivencia *
                </label>
                <select
                  id="trialSelect"
                  value={selectedId}
                  onChange={handleSelectTrial}
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

          {/* Estado actual */}
          <div className="uc-card">
            <div className="uc-card__title">Estado actual</div>
            <span className={`uc-badge uc-badge--${badgeKey(form.status)}`}>
              {form.status ?? "—"}
            </span>
          </div>

          {/* Fechas */}
          <div className="uc-card">
            <div className="uc-card__title">📅 Período de convivencia</div>
            <div className="uc-date-row">
              <div className="uc-field">
                <label className="uc-field__label" htmlFor="startDate">
                  Fecha de inicio *
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={form.startDate}
                  disabled={isReadOnly}
                  onChange={handleChange("startDate")}
                />
                {errors.startDate && <span className="uc-field__error">{errors.startDate}</span>}
              </div>
              <div className="uc-field">
                <label className="uc-field__label" htmlFor="endDate">
                  Fecha de fin *
                </label>
                <input
                  id="endDate"
                  type="date"
                  value={form.endDate}
                  disabled={isReadOnly}
                  onChange={handleChange("endDate")}
                />
                {errors.endDate && <span className="uc-field__error">{errors.endDate}</span>}
              </div>
            </div>
            {isReadOnly && (
              <p className="uc-readonly-note">
                🔒 Fechas bloqueadas — el estado debe ser <strong>activo</strong> para editarlas.
              </p>
            )}
          </div>

          {/* Datos de la prueba */}
          <div className="uc-card">
            <div className="uc-card__title">📋 Datos de la prueba</div>

            <div className="uc-field uc-field--select">
              <label className="uc-field__label" htmlFor="status">
                Estado / Resultado *
              </label>
              <select
                id="status"
                value={form.status}
                onChange={handleChange("status")}
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              {errors.status && <span className="uc-field__error">{errors.status}</span>}
            </div>

            <div className="uc-field">
              <label className="uc-field__label" htmlFor="veterinarianId">
                Veterinario asignado (ID) *
              </label>
              <input
                id="veterinarianId"
                type="number"
                min="1"
                placeholder="1"
                value={form.veterinarianId}
                onChange={handleChange("veterinarianId")}
              />
              {errors.veterinarianId && <span className="uc-field__error">{errors.veterinarianId}</span>}
            </div>

            <div className="uc-field">
              <label className="uc-field__label" htmlFor="adoptionProcessId">
                Proceso de Adopción (ID) *
              </label>
              <input
                id="adoptionProcessId"
                type="number"
                min="1"
                placeholder="1"
                value={form.adoptionProcessId}
                onChange={handleChange("adoptionProcessId")}
              />
              {errors.adoptionProcessId && <span className="uc-field__error">{errors.adoptionProcessId}</span>}
            </div>
          </div>

          <button className="uc-btn-primary" onClick={handleSubmit} disabled={saving}>
            {saving ? "Guardando…" : "Guardar Cambios"}
          </button>
        </div>
      )}

      <div ref={toastRef} className="uc-toast" />
    </div>
  );
}