import React, { useState } from 'react';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import '../events/RegistrarEvento.css'; // Usamos el mismo CSS base
import pawIcon from '../../assets/paw-icon.png';
import { createAdoptionRequest } from '../../services/AdoptionRequestService';
import { useNavigate } from 'react-router-dom';

const SolicitarAdopcionPage = () => {
  const [mascotaId, setMascotaId] = useState('1');
  const [tipoVivienda, setTipoVivienda] = useState('Casa');
  const [tieneMascotas, setTieneMascotas] = useState('false');
  const navigate = useNavigate();

  const opcionesMascota = [
    { value: '1', label: 'Fido (ID: 1)' },
    { value: '2', label: 'Luna (ID: 2)' },
  ];

  const opcionesVivienda = [
    { value: 'Casa', label: 'Casa' },
    { value: 'Apartamento', label: 'Apartamento' },
    { value: 'Finca', label: 'Finca' },
  ];

  const opcionesMascotas = [
    { value: 'true', label: 'Sí' },
    { value: 'false', label: 'No' },
  ];

  const handleGuardar = async () => {
    const payload = {
      housingType: tipoVivienda,
      hasOtherPets: tieneMascotas === 'true',
      petId: parseInt(mascotaId)
    };

    try {
      await createAdoptionRequest(payload);
      alert('¡Solicitud enviada con éxito!');
      navigate('/');
    } catch (error) {
      alert('Hubo un error al guardar la solicitud.');
    }
  };

  return (
    <div className="page-container">
      <div className="event-card">
        <div className="card-header">
          <MdArrowBack className="header-icon" onClick={() => navigate('/')} />
          <h2>Solicitud</h2>
          <MdCheck className="header-icon" />
        </div>

        <div className="card-body">
          <div className="paw-icon-container">
            <img src={pawIcon} alt="Huella" className="paw-icon" />
          </div>
          <h3>Solicitar Adopción</h3>

          <form onSubmit={(e) => e.preventDefault()}>
            <Select
              label="Mascota"
              required
              options={opcionesMascota}
              value={mascotaId}
              onChange={(e) => setMascotaId(e.target.value)}
            />
            <Select
              label="Tipo de Vivienda"
              required
              options={opcionesVivienda}
              value={tipoVivienda}
              onChange={(e) => setTipoVivienda(e.target.value)}
            />
            <Select
              label="¿Tiene otras mascotas?"
              required
              options={opcionesMascotas}
              value={tieneMascotas}
              onChange={(e) => setTieneMascotas(e.target.value)}
            />

            <Button onClick={handleGuardar}>Enviar Solicitud</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SolicitarAdopcionPage;