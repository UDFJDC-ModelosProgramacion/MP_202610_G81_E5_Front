import React, { useState } from 'react';
import { MdArrowBack, MdCheck, MdPets } from 'react-icons/md';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { createPet } from '../../services/PetService';
import './RegistrarMascota.css';

const RegistrarMascotaPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    species: '1',
    breed: '',
    birthDate: '',
    weight: '',
    gender: '1',
    color: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);

  const especiesOptions = [
    { value: '1', label: 'Perro' },
    { value: '2', label: 'Gato' },
    { value: '3', label: 'Ave' },
    { value: '4', label: 'Conejo' },
    { value: '5', label: 'Otro' },
  ];

  const generoOptions = [
    { value: '1', label: 'Macho' },
    { value: '2', label: 'Hembra' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = async () => {
    const payload = {
      name: formData.name,
      breed: formData.breed,
      birthDate: formData.birthDate,
      weight: parseFloat(formData.weight) || null,
      color: formData.color,
      notes: formData.notes,
      species: { id: parseInt(formData.species) },
      gender: { id: parseInt(formData.gender) }
    };

    try {
      setLoading(true);
      console.log('Enviando mascota a Spring Boot:', payload);
      const response = await createPet(payload);
      alert('¡Mascota registrada con éxito! ID: ' + response.id);
      navigate('/');
    } catch (error) {
      alert('Hubo un error al guardar. Revisa la consola.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="event-card">
        {/* CABECERA */}
        <div className="card-header">
          <MdArrowBack className="header-icon" onClick={() => navigate('/')} />
          <h2>Registrar Mascota</h2>
          <MdCheck className="header-icon" />
        </div>

        {/* CUERPO */}
        <div className="card-body">
          <div className="paw-icon-container">
            <MdPets className="paw-icon-svg" />
          </div>
          <h3>Nueva Mascota</h3>

          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Nombre de la mascota"
              required
              name="name"
              value={formData.name}
              placeholder="Ej: Fido"
              onChange={handleChange}
            />

            <Select
              label="Especie"
              required
              options={especiesOptions}
              name="species"
              value={formData.species}
              onChange={handleChange}
            />

            <Input
              label="Raza"
              name="breed"
              value={formData.breed}
              placeholder="Ej: Labrador"
              onChange={handleChange}
            />

            <Input
              label="Fecha de nacimiento"
              required
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />

            <Input
              label="Peso (kg)"
              type="number"
              name="weight"
              value={formData.weight}
              placeholder="Ej: 12.5"
              onChange={handleChange}
            />

            <Select
              label="Género"
              required
              options={generoOptions}
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />

            <Input
              label="Color"
              name="color"
              value={formData.color}
              placeholder="Ej: Café con blanco"
              onChange={handleChange}
            />

            <Input
              label="Notas adicionales"
              name="notes"
              value={formData.notes}
              placeholder="Ej: Alérgico a ciertos alimentos"
              onChange={handleChange}
            />

            <Button onClick={handleGuardar} disabled={loading}>
              {loading ? 'Guardando...' : 'Registrar Mascota'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarMascotaPage;
