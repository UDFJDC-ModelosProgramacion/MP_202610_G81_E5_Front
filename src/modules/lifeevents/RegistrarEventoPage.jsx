import React, { useState } from 'react';
import { MdArrowBack, MdCheck, MdAttachFile, MdChevronRight } from 'react-icons/md';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import './RegistrarEvento.css';
import pawIcon from '../../assets/paw-icon.png';
import { createLifeEvent } from '../../services/LifeEventService'; 
import { useNavigate } from 'react-router-dom';

const RegistrarEventoPage = () => {
  // Ahora guardamos los IDs (que son numéricos en tu Base de Datos)
  const [tipoEventoId, setTipoEventoId] = useState('1'); 
  const [mascotaId, setMascotaId] = useState('1');
  const [fecha, setFecha] = useState('2026-04-12'); 
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();

  // Estos datos eventualmente los traerás con un GET desde Spring Boot
  const opcionesEvento = [
    { value: '1', label: 'Adopción' },
    { value: '2', label: 'Vacunación' },
    { value: '3', label: 'Chequeo Médico' },
  ];

  const opcionesMascota = [
    { value: '1', label: 'Fido' },
    { value: '2', label: 'Luna' },
  ];

  const handleGuardar = async () => {
    // 1. Construimos el JSON EXACTAMENTE como lo espera la entidad Java
    const payload = {
      description: descripcion,
      date: fecha, 
      pet: { id: parseInt(mascotaId) },
      type: { id: parseInt(tipoEventoId) },
      veterinarian: { id: 1 } // IMPORTANTE: Tu backend exige que no sea null
    };

    try {
      console.log('Enviando a Spring Boot:', payload);
      const response = await createLifeEvent(payload);
      alert('¡Evento creado con éxito! ID: ' + response.id);
      // Aquí podrías limpiar el formulario o redirigir al usuario
    } catch (error) {
      alert('Hubo un error al guardar. Revisa la consola.');
    }
    
  };

  return (
    <div className="page-container">
      <div className="event-card">
        {/* CABECERA */}
        <div className="card-header">
          <MdArrowBack className="header-icon" onClick={() => navigate('/')}/>
          <h2>Registrar Evento</h2>
          <MdCheck className="header-icon" />
        </div>

        {/* CUERPO */}
        <div className="card-body">
          <div className="paw-icon-container">
            <img src={pawIcon} alt="Huella" className="paw-icon" />
          </div>
          <h3>Registrar Evento</h3>

          <form onSubmit={(e) => e.preventDefault()}>
            <Select
              label="Tipo de Evento"
              required
              options={opcionesEvento}
              value={tipoEventoId}
              onChange={(e) => setTipoEventoId(e.target.value)}
            />

            <Input
              label="Fecha"
              required
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />

            <Select
              label="Mascota"
              required
              options={opcionesMascota}
              value={mascotaId}
              onChange={(e) => setMascotaId(e.target.value)}
            />

            <Input
              label="Descripción"
              required
              value={descripcion}
              placeholder="Ej: Fido llegó a nuestro hogar"
              onChange={(e) => setDescripcion(e.target.value)}
            />

            <div className="file-upload-container">
              <div className="file-upload-left">
                <MdAttachFile style={{fontSize: '20px', transform: 'rotate(45deg)'}}/>
                <span>Subir foto o documento</span>
              </div>
              <MdChevronRight style={{color: '#aaa', fontSize: '24px'}}/>
            </div>

            <Button onClick={handleGuardar}>Guardar</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarEventoPage;