import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MdPersonAdd, 
  MdPets, 
  MdEvent, 
  MdAssignment, 
  MdStore, 
  MdHealthAndSafety,
  MdManageSearch,
  MdHistory // Importamos el icono para el historial
} from 'react-icons/md';
import './Home.css';

const HomePage = () => {
  const menuItems = [
    { 
      path: '/registrar-usuario', 
      title: 'Usuarios', 
      desc: 'Gestionar cuentas y perfiles', 
      icon: <MdPersonAdd className="card-icon" /> 
    },
    { 
      path: '/registrar-mascota', 
      title: 'Mascotas', 
      desc: 'Registrar nuevos peluditos', 
      icon: <MdPets className="card-icon" /> 
    },
    { 
      path: '/registrar-evento-vida', 
      title: 'Registrar Evento', 
      desc: 'Añadir hitos a la mascota', 
      icon: <MdEvent className="card-icon" /> 
    },
    { 
      path: '/consultar-eventos/1',
      title: 'Consultar Eventos de Vida', 
      desc: 'Ver línea de tiempo de eventos', 
      icon: <MdHistory className="card-icon" /> 
    },
    { 
      path: '/solicitar-adopcion', 
      title: 'Solicitudes', 
      desc: 'Iniciar procesos de adopción', 
      icon: <MdAssignment className="card-icon" /> 
    },
    { 
      path: '/crear-evento-refugio', 
      title: 'Eventos Refugio', 
      desc: 'Jornadas y recolecciones', 
      icon: <MdStore className="card-icon" /> 
    },
    { 
      path: '/registrar-convivencia', 
      title: 'Seguimiento', 
      desc: 'Pruebas de convivencia', 
      icon: <MdHealthAndSafety className="card-icon" /> 
    },
    { 
      path: '/procesos-adopcion', 
      title: 'Procesos de Adopción', 
      desc: 'Filtrar y consultar estados', 
      icon: <MdManageSearch className="card-icon" /> 
    }
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>¡Hola!</h1>
        <p>Bienvenido al Sistema de Gestión de Adopciones</p>
      </header>

      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path} className="menu-card">
            {item.icon}
            <h3>{item.title}</h3>
            <span>{item.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;