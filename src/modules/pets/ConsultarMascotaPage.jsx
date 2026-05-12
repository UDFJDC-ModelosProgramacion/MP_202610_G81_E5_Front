import React, { useState } from 'react';
import { MdArrowBack, MdPets, MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getPetById } from '../../services/PetService';
import './ConsultarMascota.css';

const ConsultarMascotaPage = () => {
  const navigate = useNavigate();
  const [petId, setPetId] = useState('');
  const [mascota, setMascota] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBuscar = async () => {
    if (!petId) {
      setError('Por favor ingresa un ID de mascota');
      return;
    }
    setError('');
    setMascota(null);
    try {
      setLoading(true);
      const data = await getPetById(petId);
      setMascota(data);
    } catch (err) {
      setError('No se encontró ninguna mascota con ese ID');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="event-card">
        <div className="card-header">
          <MdArrowBack className="header-icon" onClick={() => navigate('/')} />
          <h2>Consultar Mascota</h2>
          <MdPets className="header-icon" />
        </div>

        <div className="card-body">
          <div className="search-section">
            <input
              type="number"
              placeholder="ID de la mascota"
              value={petId}
              onChange={(e) => setPetId(e.target.value)}
              className="search-input"
            />
            <button onClick={handleBuscar} className="search-button" disabled={loading}>
              <MdSearch style={{ fontSize: '20px' }} />
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>

          {error && <p className="error-text">{error}</p>}

          {mascota && (
            <div className="mascota-card">
              <div className="mascota-header">
                <MdPets className="mascota-icon" />
                <h3>{mascota.name}</h3>
              </div>
              <div className="mascota-info">
                <div className="info-row">
                  <span className="info-label">Especie:</span>
                  <span className="info-value">{mascota.species?.name || '-'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Raza:</span>
                  <span className="info-value">{mascota.breed || '-'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Fecha de nacimiento:</span>
                  <span className="info-value">{mascota.birthDate || '-'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Peso:</span>
                  <span className="info-value">{mascota.weight ? `${mascota.weight} kg` : '-'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Género:</span>
                  <span className="info-value">{mascota.gender?.name || '-'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Color:</span>
                  <span className="info-value">{mascota.color || '-'}</span>
                </div>
                {mascota.notes && (
                  <div className="info-row">
                    <span className="info-label">Notas:</span>
                    <span className="info-value">{mascota.notes}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultarMascotaPage;
