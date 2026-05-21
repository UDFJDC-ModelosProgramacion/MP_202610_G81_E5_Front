import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCohabitationTrialById,
  getCohabitationTrials,
  updateCohabitationTrial,
} from '../../services/TrialCohabitationService';
import "./UpdateCohabitationTrial.css";

const STATUS_OPTIONS = [
  { value: "activo",     label: "Activo" },
  { value: "inactivo",   label: "Inactivo" },
  { value: "finalizado", label: "Finalizado" },
  { value: "cancelado",  label: "Cancelado" },
];

const EMPTY_FORM = { 
  startDate: "", 
  endDate: "", 
  status: "activo", 
  veterinarianId: "", 
  adoptionProcessId: "" 
};

export default function UpdateCohabitationTrial() {
  const navigate = useNavigate();
  const { id } = useParams();
  const toastRef = useRef(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [trials, setTrials] = useState([]);
  const [selectedId, setSelectedId] = useState(id ?? "");

  const showToast = (msg, type = "ok") => {
    const el = toastRef.current;
    if (!el) return;
    el.textContent = msg;
    el.className = `uc-toast uc-toast--show uc-toast--${type}`;
    setTimeout(() => { el.className = "uc-toast"; }, 3000);
  };

  // Carga los datos de un Trial específico y llena el formulario
  const loadTrialData = useCallback(async (trialId) => {
    if (!trialId) return;
    setLoading(true);
    try {
      const data = await getCohabitationTrialById(trialId);
      setForm({
        startDate: data.startDate ?? "",
        endDate: data.endDate ?? "",
        status: data.status ?? "activo",
        veterinarianId: data.veterinarian?.id ?? "",
        adoptionProcessId: data.adoptionProcess?.id ?? "",
      });
    } catch (err) {
      showToast(`No se pudo cargar la prueba #${trialId}: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Carga inicial de la lista completa de pruebas
  const loadInitialTrials = useCallback(async () => {
    try {
      const data = await getCohabitationTrials();
      setTrials(data);
      
      // Si hay un ID en la URL lo prioritiza, si no, toma el primero de la lista
      if (id) {
        setSelectedId(String(id));
        await loadTrialData(id);
      } else if (data.length > 0) {
        setSelectedId(String(data[0].id));
        await loadTrialData(data[0].id);
      }
    } catch (err) {
      // No bloqueamos la renderización si falla la API; permitimos el llenado manual
      console.error("Error al listar pruebas de convivencia:", err.message);
    }
  }, [id, loadTrialData]);

  useEffect(() => {
    loadInitialTrials();
  }, [loadInitialTrials]);

  const handleSelectTrialChange = async (e) => {
    const targetId = e.target.value;
    setSelectedId(targetId);
    setErrors({});
    if (targetId) {
      await loadTrialData(targetId);
    } else {
      setForm(EMPTY_FORM);
    }
  };

  const handleInputChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateForm = () => {
    const errs = {};
    if (!form.startDate) errs.startDate = "La fecha de inicio es requerida";
    if (!form.endDate) errs.endDate = "La fecha de fin es requerida";
    if (form.endDate && form.startDate && form.endDate < form.startDate) {
      errs.endDate = "La fecha de fin no puede ser anterior a la de inicio";
    }
    if (!form.veterinarianId) errs.veterinarianId = "El ID del veterinario es requerido";
    if (!form.adoptionProcessId) errs.adoptionProcessId = "El ID del proceso es requerido";
    return errs;
  };

  const handleSaveSubmit = async () => {
    const validationErrs = validateForm();
    if (Object.keys(validationErrs).length > 0) {
      setErrors(validationErrs);
      return;
    }

    // Si el usuario borró el selector o no hay id, usa el de la URL o el formulario
    const currentId = selectedId || id;
    if (!currentId) {
      showToast("⚠️ Debes tener o ingresar un ID de prueba válido para actualizar.", "error");
      return;
    }

    setSaving(true);
    try {
      await updateCohabitationTrial(currentId, {
        startDate: form.startDate,
        endDate: form.endDate,
        status: form.status,
        veterinarian: { id: Number(form.veterinarianId) },
        adoptionProcess: { id: Number(form.adoptionProcessId) },
      });
      showToast("✅ Cambios guardados correctamente", "ok");
      setTimeout(() => navigate("/cohabitation-monitor"), 1500);
    } catch (err) {
      showToast(`Error al guardar: ${err.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="uc-page-layout">
      {/* ── Navbar Superior Blanco Integrado ── */}
      <nav className="uc-top-navbar">
        <div className="uc-nav-left">
          <div className="uc-menu-burger">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="uc-nav-brand">PawHub</span>
        </div>
        <div className="uc-nav-right">
          <div className="uc-user-avatar">DM</div>
        </div>
      </nav>

      <div className="uc-main-container">
        {/* ── Banner de Título de Borde a Borde ── */}
        <header className="uc-content-banner">
          <div className="uc-badge-category">Mascotas</div>
          <h1 className="uc-main-title">Actualizar Convivencia 🐾</h1>
          <p className="uc-main-subtitle">Añade o modifica los parámetros de los co-hábitats en el sistema.</p>
        </header>

        {/* ── Bloque Principal del Formulario ── */}
        <main className="uc-form-card">
          {/* Botón de regreso */}
          <div className="uc-navigation-row">
            <button className="uc-circular-back-btn" onClick={() => navigate(-1)} title="Volver">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
          </div>

          {/* Selector de Prueba Activa (Opcional si se quiere rellenar manual) */}
          <div className="uc-grid-layout" style={{ marginBottom: "16px" }}>
            <div className="uc-input-wrapper uc-input-wrapper--full">
              <label className="uc-input-label">Prueba de convivencia vinculada (Historial)</label>
              <select value={selectedId} onChange={handleSelectTrialChange} className="uc-styled-input">
                <option value="">-- Rellenar manualmente / Nueva prueba --</option>
                {trials.map((t) => (
                  <option key={t.id} value={t.id}>
                    Prueba #{t.id} — Estado: {t.status} (Proc: #{t.adoptionProcess?.id ?? "—"})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading && (
            <div className="uc-loading-overlay-bar">
              <p>🔄 Sincronizando datos del servidor...</p>
            </div>
          )}

          {/* Grid de Inputs con la Estructura de la captura de Pantalla */}
          <div className="uc-grid-layout">
            
            {/* Input Veterinario */}
            <div className={`uc-input-wrapper ${errors.veterinarianId ? 'uc-input-wrapper--has-error' : ''}`}>
              <label className="uc-input-label" htmlFor="veterinarianId">ID Veterinario Asignado *</label>
              <input
                id="veterinarianId"
                type="number"
                min="1"
                placeholder="Ingresa el ID del veterinario"
                value={form.veterinarianId}
                onChange={handleInputChange("veterinarianId")}
                className="uc-styled-input"
              />
              {errors.veterinarianId && <span className="uc-validation-message">{errors.veterinarianId}</span>}
            </div>

            {/* Selector Estado */}
            <div className="uc-input-wrapper">
              <label className="uc-input-label" htmlFor="status">Estado / Resultado de Convivencia *</label>
              <select
                id="status"
                value={form.status}
                onChange={handleInputChange("status")}
                className="uc-styled-input"
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Input Proceso de Adopción */}
            <div className={`uc-input-wrapper ${errors.adoptionProcessId ? 'uc-input-wrapper--has-error' : ''}`}>
              <label className="uc-input-label" htmlFor="adoptionProcessId">ID Proceso de Adopción *</label>
              <input
                id="adoptionProcessId"
                type="number"
                min="1"
                placeholder="Ingresa el ID del proceso"
                value={form.adoptionProcessId}
                onChange={handleInputChange("adoptionProcessId")}
                className="uc-styled-input"
              />
              {errors.adoptionProcessId && <span className="uc-validation-message">{errors.adoptionProcessId}</span>}
            </div>

            {/* Input Fecha de Inicio */}
            <div className={`uc-input-wrapper ${errors.startDate ? 'uc-input-wrapper--has-error' : ''}`}>
              <label className="uc-input-label" htmlFor="startDate">Fecha de Inicio *</label>
              <input
                id="startDate"
                type="date"
                value={form.startDate}
                onChange={handleInputChange("startDate")}
                className="uc-styled-input"
              />
              {errors.startDate && <span className="uc-validation-message">{errors.startDate}</span>}
            </div>

            {/* Input Fecha de Fin */}
            <div className={`uc-input-wrapper ${errors.endDate ? 'uc-input-wrapper--has-error' : ''}`}>
              <label className="uc-input-label" htmlFor="endDate">Fecha de Fin *</label>
              <input
                id="endDate"
                type="date"
                value={form.endDate}
                onChange={handleInputChange("endDate")}
                className="uc-styled-input"
              />
              {errors.endDate && <span className="uc-validation-message">{errors.endDate}</span>}
            </div>

          </div>

          {/* ── Gran Botón de Envío Inferior ── */}
          <div className="uc-action-footer">
            <button 
              className="uc-primary-submit-btn" 
              onClick={handleSaveSubmit} 
              disabled={saving}
            >
              {saving ? "Guardando cambios..." : "Registrar Mascota / Guardar Cambios"}
            </button>
          </div>

        </main>
      </div>

      {/* Alertas dinámicas */}
      <div ref={toastRef} className="uc-toast" />
    </div>
  );
}