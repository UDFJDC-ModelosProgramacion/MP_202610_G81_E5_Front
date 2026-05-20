import React, { useState, useEffect } from 'react';
import { MdArrowBack, MdCheck, MdAttachFile } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import {
  createLifeEvent,
  getPets,
  getTypeLifeEvents,
  getVeterinarians 
} from '../../services/LifeEventService';
import './RegistrarEvento.css';

const RegistrarEventoPage = () => {
  const navigate = useNavigate();

  const [tipoEventoId, setTipoEventoId] = useState('');
  const [mascotaId, setMascotaId] = useState('');
  const [veterinarioId, setVeterinarioId] = useState(''); 

  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [descripcion, setDescripcion] = useState('');

  const [opcionesEvento, setOpcionesEvento] = useState([]);
  const [opcionesMascota, setOpcionesMascota] = useState([]);
  const [opcionesVeterinario, setOpcionesVeterinario] = useState([]); 

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [pets, types, vets] = await Promise.all([
          getPets(),
          getTypeLifeEvents(),
          getVeterinarians() 
        ]);

        setOpcionesMascota(pets.map(p => ({ value: p.id, label: p.name })));
        setOpcionesEvento(types.map(t => ({ value: t.id, label: t.name })));
        
        setOpcionesVeterinario(vets.map(v => ({ 
          value: v.id, 
          label: `Médico Lic. ${v.licenseNumber} (${v.specialty})` 
        })));

        if (pets.length) setMascotaId(String(pets[0].id));
        if (types.length) setTipoEventoId(String(types[0].id));
        if (vets.length) setVeterinarioId(String(vets[0].id));
      } catch (error) {
        console.error("Error cargando datos iniciales:", error);
      }
    };

    cargarDatos();
  }, []);

  const handleGuardar = async () => {
    if (!descripcion || !tipoEventoId || !mascotaId || !veterinarioId) {
      alert('Completa todos los campos, incluyendo el Veterinario');
      return;
    }

    const payload = {
      description: descripcion,
      date: fecha,
      pet: { id: parseInt(mascotaId) },
      type: { id: parseInt(tipoEventoId) },
      veterinarian: { id: parseInt(veterinarioId) } 
    };

    try {
      setLoading(true);
      await createLifeEvent(payload);
      alert('Evento creado correctamente');
      navigate('/home');
    } catch (error) {
      alert('Error al guardar el evento');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <div className="sidebar">
        <button className="menuButton">☰</button>
      </div>

      <div className="content">
        <nav className="navbar">
          <div className="logo">🐾 PawHub</div>
          <div className="profile">DM</div>
        </nav>

        <div className="heroMini">
          <div>
            <div className="tag">Eventos</div>
            <h1>Registrar Evento 📅</h1>
            <p>Añade eventos médicos o actividades relacionadas con mascotas.</p>
          </div>
        </div>

        <div className="formCard">
          <div className="cardTop">
            <MdArrowBack className="topIcon" onClick={() => navigate('/home')} />
            <MdCheck className="topIcon" onClick={handleGuardar} />
          </div>

          <div className="formGrid">
            
            {/* SELECT TIPO DE EVENTO */}
            <div className="formGroup">
              <span className="fieldLabel">Categoría o Tipo de Evento</span>
              <select value={tipoEventoId} onChange={(e) => setTipoEventoId(e.target.value)}>
                {opcionesEvento.map(op => (
                  <option key={op.value} value={op.value}>{op.label}</option>
                ))}
              </select>
            </div>

            {/* INPUT FECHA */}
            <div className="formGroup">
              <span className="fieldLabel">Fecha del Evento</span>
              <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </div>

            {/* SELECT MASCOTA */}
            <div className="formGroup">
              <span className="fieldLabel">Mascota Asociada</span>
              <select value={mascotaId} onChange={(e) => setMascotaId(e.target.value)}>
                {opcionesMascota.map(op => (
                  <option key={op.value} value={op.value}>{op.label}</option>
                ))}
              </select>
            </div>

            {/* SELECT VETERINARIO */}
            <div className="formGroup">
              <span className="fieldLabel">Veterinario a Cargo</span>
              <select value={veterinarioId} onChange={(e) => setVeterinarioId(e.target.value)}>
                {opcionesVeterinario.length === 0 ? (
                  <option value="">No hay veterinarios registrados</option>
                ) : (
                  opcionesVeterinario.map(op => (
                    <option key={op.value} value={op.value}>{op.label}</option>
                  ))
                )}
              </select>
            </div>

            {/* INPUT DESCRIPCIÓN */}
            <div className="formGroup" style={{ gridColumn: '1 / -1' }}>
              <span className="fieldLabel">Detalles y Notas del Evento</span>
              <input
                placeholder="Escribe aquí los detalles del procedimiento o actividad..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

          </div>

          <div className="uploadBox">
            <MdAttachFile /> Subir soporte (PDF / Imagen)
          </div>

          <button className="saveButton" onClick={handleGuardar} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Evento'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrarEventoPage;