import React, { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { createTypeLifeEvent } from '../../services/LifeEventService';
import './RegistrarTipoEvento.css';

const RegistrarTipoEventoPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGuardar = async () => {
    if (!name.trim()) {
      alert('Por favor, ingresa el nombre del tipo de evento');
      return;
    }

    const payload = {
      name: name.trim()
    };

    try {
      setLoading(true);
      await createTypeLifeEvent(payload);
      alert('¡Tipo de Evento de Vida registrado con éxito!');
      navigate('/home');
    } catch (error) {
      alert('Error al guardar: Posiblemente ya existe un tipo con ese nombre');
      console.error(error);
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
            <div className="tag">Configuración del Sistema</div>
            <h1>Registrar Tipo de Evento 🏷️</h1>
            <p>Crea nuevas categorías de eventos médicos o de comportamiento (ej: Cirugía, Vacuna).</p>
          </div>
        </div>

        <div className="formCard">
          <div className="cardTop">
            <MdArrowBack className="topIcon" onClick={() => navigate('/home')} />
          </div>

          <div className="formGrid" style={{ gridTemplateColumns: '1fr' }}>
            <input
              placeholder="Nombre de la categoría del evento (ej: Control de Peso)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <button 
            className="saveButton" 
            onClick={handleGuardar} 
            disabled={loading}
            style={{ marginTop: '10px' }}
          >
            {loading ? 'Guardando...' : 'Registrar Tipo de Evento'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrarTipoEventoPage;