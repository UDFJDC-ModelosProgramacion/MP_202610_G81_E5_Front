import React, { useState, useEffect } from 'react';
import { MdArrowBack, MdCheck, MdAttachFile, MdChevronRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import { createLifeEvent, getPets, getTypeLifeEvents } from '../../services/LifeEventService'; 
import './RegistrarEvento.css';
import pawIcon from '../../assets/paw-icon.png';

const RegistrarEventoPage = () => {
  const [tipoEventoId, setTipoEventoId] = useState('');
  const [mascotaId, setMascotaId] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]); 
  const [descripcion, setDescripcion] = useState('');
  
  // Estados para cargar datos del Back
  const [opcionesEvento, setOpcionesEvento] = useState([]);
  const [opcionesMascota, setOpcionesMascota] = useState([]);
  
  const navigate = useNavigate();

  // 1. CARGAR DATOS AL INICIAR
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const pets = await getPets();
        const types = await getTypeLifeEvents();

        // Mapeamos al formato que espera tu componente <Select />
        setOpcionesMascota(pets.map(p => ({ value: p.id.toString(), label: p.name })));
        setOpcionesEvento(types.map(t => ({ value: t.id.toString(), label: t.name })));

        // Pre-seleccionar el primero si existen
        if (pets.length > 0) setMascotaId(pets[0].id.toString());
        if (types.length > 0) setTipoEventoId(types[0].id.toString());
      } catch (error) {
        console.error("Error cargando catálogos:", error);
      }
    };
    cargarDatos();
  }, []);

  const handleGuardar = async () => {
    if (!descripcion || !mascotaId || !tipoEventoId) {
        alert("Por favor completa todos los campos obligatorios");
        return;
    }

    // 2. CONSTRUIR PAYLOAD PARA SPRING BOOT
    const payload = {
      description: descripcion,
      date: fecha, 
      pet: { id: parseInt(mascotaId) },
      type: { id: parseInt(tipoEventoId) },
      // IMPORTANTE: El Service de Java valida que Veterinarian no sea null.
      // Aquí enviamos el ID 1 por defecto (debe existir un veterinario con ID 1 en tu DB).
      veterinarian: { id: 1 } 
    };

    try {
      const response = await createLifeEvent(payload);
      alert('¡Evento registrado exitosamente en la base de datos!');
      navigate('/mascotas'); // O la ruta que prefieras
    } catch (error) {
      console.error('Error al guardar:', error.response?.data || error.message);
      alert('Error: ' + (error.response?.data?.message || 'No se pudo conectar con el servidor'));
    }
  };

  return (
    <div className="page-container">
      <div className="event-card">
        <div className="card-header">
          <MdArrowBack className="header-icon" onClick={() => navigate(-1)}/>
          <h2>Registrar Evento</h2>
          <MdCheck className="header-icon" onClick={handleGuardar} />
        </div>

        <div className="card-body">
          <div className="paw-icon-container">
            <img src={pawIcon} alt="Huella" className="paw-icon" />
          </div>
          <h3>Nueva Actividad</h3>

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
              placeholder="Ej: Vacunación anual completada"
              onChange={(e) => setDescripcion(e.target.value)}
            />

            <div className="file-upload-container">
              <div className="file-upload-left">
                <MdAttachFile style={{fontSize: '20px', transform: 'rotate(45deg)'}}/>
                <span>Subir soporte (PDF/Foto)</span>
              </div>
              <MdChevronRight style={{color: '#aaa', fontSize: '24px'}}/>
            </div>

            <Button onClick={handleGuardar}>Guardar en Historial</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarEventoPage;