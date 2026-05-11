import React, { useState } from 'react';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import '../lifeevents/RegistrarEvento.css'; 
import pawIcon from '../../assets/paw-icon.png';
import { createShelterEvent } from '../../services/ShelterEventService';
import { useNavigate } from 'react-router-dom';

const CrearEventoRefugioPage = () => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [tipo, setTipo] = useState('');
  const [refugioId, setRefugioId] = useState('1');
  const navigate = useNavigate();

  const handleGuardar = async () => {
    const selectedDate = new Date(fecha);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        alert('Error: La fecha no puede estar en el pasado.');
        return;
    }

    const payload = {
      name: nombre,
      date: fecha,
      type: tipo,
      shelterId: parseInt(refugioId)
    };

    try {
      await createShelterEvent(payload);
      alert('¡Evento de refugio creado con éxito!');
      navigate('/');
    } catch (error) {
      alert('Hubo un error al crear el evento.');
    }
  };

  return (
    <div className="page-container">
      <div className="event-card">
        <div className="card-header">
          <MdArrowBack className="header-icon" onClick={() => navigate('/')} />
          <h2>Evento Refugio</h2>
          <MdCheck className="header-icon" />
        </div>

        <div className="card-body">
          <div className="paw-icon-container">
            <img src={pawIcon} alt="Huella" className="paw-icon" />
          </div>
          <h3>Crear Evento</h3>

          <form onSubmit={(e) => e.preventDefault()}>
            <Input label="Nombre del Evento" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <Input label="Fecha programada" required type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            <Input label="Tipo de Evento" required placeholder="Ej. Jornada de Adopción" value={tipo} onChange={(e) => setTipo(e.target.value)} />
            <Input label="ID del Refugio" required type="number" value={refugioId} onChange={(e) => setRefugioId(e.target.value)} />

            <Button onClick={handleGuardar}>Guardar Evento</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearEventoRefugioPage;