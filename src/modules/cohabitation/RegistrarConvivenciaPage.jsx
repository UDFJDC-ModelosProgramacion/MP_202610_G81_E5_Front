import React, { useState, useEffect } from 'react';
import { MdArrowBack, MdCheck, MdHealthAndSafety } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { createTrialCohabitation } from '../../services/TrialCohabitationService';
import './RegistrarConvivencia.css';

const RegistrarConvivenciaPage = () => {
    const navigate = useNavigate();

    const [procesoId, setProcesoId] = useState('');
    const [veterinarioId, setVeterinarioId] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [estado, setEstado] = useState('En curso');
    const [loading, setLoading] = useState(false);

    const [procesos, setProcesos] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [errorCarga, setErrorCarga] = useState('');

    const opcionesEstado = [
        { value: 'En curso', label: 'En curso' },
        { value: 'Aprobado', label: 'Aprobado' },
        { value: 'Rechazado', label: 'Rechazado' },
    ];

    // Carga procesos aprobados y veterinarios al montar el componente
    useEffect(() => {
        const cargarDatos = async () => {
            setCargando(true);
            setErrorCarga('');
            try {
                const [resProcesos, resVets] = await Promise.all([
                    fetch('/api/adoption-processes'),
                    fetch('/api/veterinarians'),
                ]);

                const dataProcesos = await resProcesos.json();
                const dataVets = await resVets.json();

                // Solo muestra procesos con status 'aprobado'
                const procesosAprobados = dataProcesos.filter(
                    p => p.status && p.status.toLowerCase() === 'aprobado'
                );

                setProcesos(procesosAprobados);
                setVeterinarios(dataVets);

                if (procesosAprobados.length > 0)
                    setProcesoId(String(procesosAprobados[0].id));

                if (dataVets.length > 0)
                    setVeterinarioId(String(dataVets[0].id));

            } catch (err) {
                setErrorCarga('No se pudieron cargar los datos. Verifica que el backend esté activo.');
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();
    }, []);

    const handleGuardar = async () => {
        if (!procesoId) {
            alert('No hay procesos de adopción aprobados disponibles.');
            return;
        }
        if (!veterinarioId) {
            alert('No hay veterinarios disponibles.');
            return;
        }
        if (!fechaInicio || !fechaFin) {
            alert('Las fechas son obligatorias.');
            return;
        }
        if (new Date(fechaFin) < new Date(fechaInicio)) {
            alert('La fecha final no puede ser menor a la de inicio.');
            return;
        }

        // Solo envía el id — el backend carga el resto desde la BD
        const payload = {
            startDate: fechaInicio,
            endDate: fechaFin,
            status: estado,
            adoptionProcess: { id: parseInt(procesoId) },
            veterinarian: { id: parseInt(veterinarioId) },
        };

        try {
            setLoading(true);
            await createTrialCohabitation(payload);
            alert('¡Convivencia registrada!');
            navigate('/home');
        } catch (err) {
            alert('Error al registrar la convivencia: ' + (err.message || 'revisa la consola'));
            console.error(err);
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
                        <div className="tag">Seguimiento</div>
                        <h1>Prueba de Convivencia 🏠</h1>
                        <p>Registra y controla el periodo de convivencia.</p>
                    </div>
                    <MdHealthAndSafety className="heroIcon" />
                </div>

                <div className="formCard">
                    <div className="cardTop">
                        <MdArrowBack className="topIcon" onClick={() => navigate(-1)} />
                        <MdCheck className="topIcon" onClick={handleGuardar} />
                    </div>

                    {/* Mensaje de error al cargar datos */}
                    {errorCarga && (
                        <div style={{
                            background: '#fff1ec', color: '#993c1d',
                            padding: '12px 16px', borderRadius: '12px',
                            marginBottom: '20px', fontSize: '14px'
                        }}>
                            {errorCarga}
                        </div>
                    )}

                    {/* Aviso si no hay procesos aprobados */}
                    {!cargando && procesos.length === 0 && !errorCarga && (
                        <div style={{
                            background: '#faeeda', color: '#854f0b',
                            padding: '12px 16px', borderRadius: '12px',
                            marginBottom: '20px', fontSize: '14px'
                        }}>
                            No hay procesos de adopción aprobados. Primero debes crear
                            un proceso con estado "aprobado" desde la sección de procesos.
                        </div>
                    )}

                    <div className="formGrid">

                        {/* Select de procesos aprobados */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>
                                Proceso de adopción (aprobado)
                            </label>
                            <select
                                value={procesoId}
                                onChange={e => setProcesoId(e.target.value)}
                                disabled={cargando || procesos.length === 0}
                            >
                                {cargando && <option>Cargando...</option>}
                                {!cargando && procesos.length === 0 && (
                                    <option value="">Sin procesos aprobados</option>
                                )}
                                {procesos.map(p => (
                                    <option key={p.id} value={p.id}>
                                        Proceso #{p.id} — {p.adopter?.housingType || 'Adoptante'} · {p.status}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Select de veterinarios */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>
                                Veterinario a cargo
                            </label>
                            <select
                                value={veterinarioId}
                                onChange={e => setVeterinarioId(e.target.value)}
                                disabled={cargando || veterinarios.length === 0}
                            >
                                {cargando && <option>Cargando...</option>}
                                {!cargando && veterinarios.length === 0 && (
                                    <option value="">Sin veterinarios</option>
                                )}
                                {veterinarios.map(v => (
                                    <option key={v.id} value={v.id}>
                                        Lic. {v.licenseNumber} — {v.specialty}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Fechas */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>
                                Fecha inicio
                            </label>
                            <input
                                type="date"
                                value={fechaInicio}
                                onChange={e => setFechaInicio(e.target.value)}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>
                                Fecha final
                            </label>
                            <input
                                type="date"
                                value={fechaFin}
                                onChange={e => setFechaFin(e.target.value)}
                            />
                        </div>

                        {/* Estado */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>
                                Estado
                            </label>
                            <select value={estado} onChange={e => setEstado(e.target.value)}>
                                {opcionesEstado.map(op => (
                                    <option key={op.value} value={op.value}>{op.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        className="saveButton"
                        onClick={handleGuardar}
                        disabled={loading || cargando || procesos.length === 0}
                    >
                        {loading ? 'Guardando...' : 'Registrar Convivencia'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistrarConvivenciaPage;