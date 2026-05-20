import React, { useState, useEffect } from 'react';
import { MdArrowBack, MdMedicalServices } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { createVeterinarian } from '../../services/VeterinarianService';
import './RegistrarVeterinario.css';

const RegistrarVeterinarioPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [shelters, setShelters] = useState([]);

    const [formData, setFormData] = useState({
        licenseNumber: '',
        specialty: '',
        availability: '',
        shelterId: ''
    });

    // Carga de refugios disponibles para asociar al veterinario
    useEffect(() => {
        fetch('/api/shelters')
            .then(r => r.json())
            .then(data => {
                setShelters(
                    data.map(s => ({
                        value: String(s.id),
                        label: s.name
                    }))
                );
                if (data.length > 0) {
                    setFormData(prev => ({
                        ...prev,
                        shelterId: String(data[0].id)
                    }));
                }
            })
            .catch(() => setShelters([]));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleGuardar = async () => {
        if (!formData.shelterId) {
            alert('Primero debes crear un refugio para asignar al veterinario');
            return;
        }

        if (!formData.licenseNumber.trim() || !formData.specialty.trim()) {
            alert('Por favor, completa los campos obligatorios (Licencia y Especialidad)');
            return;
        }

        // Mapeo directo al VeterinarianDTO esperado por el backend
        const payload = {
            licenseNumber: formData.licenseNumber,
            specialty: formData.specialty,
            availability: formData.availability,
            shelterId: parseInt(formData.shelterId)
        };

        try {
            setLoading(true);
            const response = await createVeterinarian(payload);
            alert(`¡Veterinario registrado con éxito! ID: ${response.id}`);
            navigate('/home');
        } catch (error) {
            alert(`Error: ${error.message}`);
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
                        <div className="tag">Personal Médico</div>
                        <h1>Registrar Veterinario 🩺</h1>
                        <p>Añade un nuevo profesional médico a la red de refugios.</p>
                    </div>
                </div>

                <div className="formCard">
                    <div className="cardTop">
                        <MdArrowBack className="topIcon" onClick={() => navigate('/home')} />
                    </div>

                    <div className="formGrid">
                        <input
                            name="licenseNumber"
                            placeholder="Número de Licencia Médica"
                            value={formData.licenseNumber}
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="specialty"
                            placeholder="Especialidad (ej. Cirugía, Fisioterapia, General)"
                            value={formData.specialty}
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="availability"
                            placeholder="Disponibilidad (ej. Lunes a Viernes 8:00 - 17:00)"
                            value={formData.availability}
                            onChange={handleChange}
                        />

                        <select
                            name="shelterId"
                            value={formData.shelterId}
                            onChange={handleChange}
                        >
                            {shelters.length === 0 ? (
                                <option value="">No hay refugios disponibles</option>
                            ) : (
                                shelters.map(s => (
                                    <option key={s.value} value={s.value}>
                                        {s.label}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>

                    <button
                        className="saveButton"
                        onClick={handleGuardar}
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : 'Registrar Veterinario'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistrarVeterinarioPage;