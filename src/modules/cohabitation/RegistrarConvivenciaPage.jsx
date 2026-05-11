import React, { useState } from 'react';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import '../lifeevents/RegistrarEvento.css'; 
import pawIcon from '../../assets/paw-icon.png';
import { createTrialCohabitation } from '../../services/TrialCohabitationService';
import { useNavigate } from 'react-router-dom';

const RegistrarConvivenciaPage = () => {
  const [procesoId, setProcesoId] = useState('1');
  const [veterinarioId, setVeterinarioId] = useState('1');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [estado, setEstado] = useState('En curso');
  const navigate = useNavigate();

  const opcionesEstado = [
    { value: 'En curso', label: 'En curso' },
    { value: 'Aprobado', label: 'Aprobado' },
    { value: 'Rechazado', label: 'Rechazado' },
  ];

  const handleGuardar = async () => {
    if (new Date(fechaFin) < new Date(fechaInicio)) {
        alert('Error: La fecha de fin no puede ser anterior a la de inicio.');
        return;
    }

    const payload = {
      startDate: fechaInicio,
      endDate: fechaFin,
      status: estado,
      processId: parseInt(procesoId),
      veterinarianId: parseInt(veterinarioId)
    };

    try {
      await createTrialCohabitation(payload);
      alert('¡Convivencia registrada exitosamente!');
      navigate('/');
    } catch (error) {
      alert('Hubo un error al registrar la convivencia.');
    }
  };

  return (
    <div className="page-container">
      <div className="event-card">
        <div className="card-header">
          <MdArrowBack className="header-icon" onClick={() => navigate('/')} />
          <h2>Convivencia</h2>
          <MdCheck className="header-icon" />
        </div>

        <div className="card-body">
          <div className="paw-icon-container">
            <img src={pawIcon} alt="Huella" className="paw-icon" />
          </div>
          <h3>Registrar Convivencia</h3>

          <form onSubmit={(e) => e.preventDefault()}>
            <Input label="Proceso de Adopción (ID)" required type="number" value={procesoId} onChange={(e) => setProcesoId(e.target.value)} />
            <Input label="Veterinario asignado (ID)" required type="number" value={veterinarioId} onChange={(e) => setVeterinarioId(e.target.value)} />
            <Input label="Fecha de Inicio" required type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
            <Input label="Fecha de Fin Proyectada" required type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
            <Select label="Estado / Resultado" required options={opcionesEstado} value={estado} onChange={(e) => setEstado(e.target.value)} />

            <Button onClick={handleGuardar}>Registrar Prueba</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarConvivenciaPage;