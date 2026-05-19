import React, { useState, useEffect } from 'react';
import { MdArrowBack, MdAdd, MdEventNote } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { getPetLifeEvents } from '../../services/LifeEventService'; // Tu servicio unificado
import './ConsultarEventos.css';

const ConsultarEventosPage = () => {
  const { id } = useParams(); // Obtenemos el ID de la mascota de la URL
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        // Usamos la ruta unificada de tu Postman: /pets/{id}/life-events
        const data = await getPetLifeEvents(id);
        setEventos(data);
      } catch (error) {
        console.error("Error al traer eventos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventos();
  }, [id]);

  return (
    <div className="page-container">
      <div className="event-card">
        {/* CABECERA AZUL */}
        <div className="card-header">
          <MdArrowBack className="header-icon" onClick={() => navigate(-1)} />
          <h2>Historial de Vida</h2>
          <MdAdd className="header-icon" onClick={() => navigate('/registrar-evento')} />
        </div>

        {/* CUERPO DE LA LISTA */}
        <div className="card-body list-body">
          {loading ? (
            <p>Cargando historial...</p>
          ) : eventos.length === 0 ? (
            <div className="empty-state">
              <MdEventNote size={50} color="#ccc" />
              <p>Aún no hay eventos registrados para esta mascota.</p>
            </div>
          ) : (
            <div className="timeline-container">
              {eventos.map((evento) => (
                <div key={evento.id} className="timeline-item">
                  <div className="timeline-date">{evento.date}</div>
                  <div className="timeline-content">
                    <h4>{evento.type?.name || 'Evento'}</h4>
                    <p>{evento.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultarEventosPage;