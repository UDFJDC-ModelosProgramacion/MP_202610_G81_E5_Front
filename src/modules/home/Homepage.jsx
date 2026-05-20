import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

// Todos los iconos deben importarse de 'react-icons/md'
import {
  MdPersonAdd,
  MdPets,
  MdEvent,
  MdAssignment,
  MdStore,
  MdHealthAndSafety,
  MdManageSearch,
  MdHistory,
  MdHouse,
  MdMenu,
  MdMedicalServices,
  MdLayers 
} from 'react-icons/md'; 

import './Home.css';

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate(); 

  const menuItems = [
    {
      path: '/registrar-usuario',
      title: 'Usuarios',
      icon: <MdPersonAdd />
    },
    {
      path: '/registrar-refugio',
      title: 'Refugios',
      icon: <MdHouse />
    },
    {
      path: '/registrar-mascota',
      title: 'Mascotas',
      icon: <MdPets />
    },
    {
      path: '/registrar-veterinario', 
      title: 'Veterinarios',
      icon: <MdMedicalServices />
    },
    {
      path: '/registrar-tipo-evento', 
      title: 'Tipos de Evento',
      icon: <MdLayers />
    },
    {
      path: '/registrar-evento-vida',
      title: 'Eventos de Vida',
      icon: <MdEvent />
    },
    {
      path: '/consultar-eventos/1',
      title: 'Consultar EV',
      icon: <MdHistory />
    },
    {
      path: '/solicitar-adopcion',
      title: 'Solicitudes',
      icon: <MdAssignment />
    },
    {
      path: '/crear-evento-refugio',
      title: 'Eventos Refugio',
      icon: <MdStore />
    },
    {
      path: '/registrar-convivencia',
      title: 'Seguimiento',
      icon: <MdHealthAndSafety />
    },
    {
      path: '/procesos-adopcion',
      title: 'Procesos',
      icon: <MdManageSearch />
    }
  ];

  return (
    <div className="layout">
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button
          className="menuButton"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <MdMenu />
        </button>

        {sidebarOpen && (
          <>
            <div className="sidebarLogo">Opciones</div>
            <div className="sidebarMenu">
              {menuItems.map((item, index) => (
                <Link
                  to={item.path}
                  key={index}
                  className="sidebarItem"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="home">
        <nav className="navbar">
          <div className="logo">🐾 PawHub</div>
          <div className="profile">DM</div>
        </nav>

        <section className="hero">
          <div className="hero-left">
            <div className="tag">Sistema de adopción inteligente</div>
            <h1>Encuentra hogares para cada mascota</h1>
            <p>
              Administra mascotas, refugios, personal médico y procesos de adopción desde un solo lugar.
            </p>
            
            <div className="hero-buttons">
              <button onClick={() => navigate('/registrar-veterinario')}>
                🩺 Nuevo Veterinario
              </button>
              <button className="secondary" onClick={() => navigate('/registrar-mascota')}>
                🐾 Registrar Mascota
              </button>
            </div>
          </div>
          <div className="hero-right">🐶🐱🐾</div>
        </section>

        <section className="stats">
          <div className="stat">
            <h2>128</h2>
            <span>Mascotas</span>
          </div>
          <div className="stat">
            <h2>32</h2>
            <span>Adopciones</span>
          </div>
          <div className="stat">
            <h2>12</h2>
            <span>Refugios</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;