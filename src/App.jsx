import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import RegistrarEventoPage from './modules/lifeevents/RegistrarEventoPage';
import SolicitarAdopcionPage from './modules/adoptions/SolicitarAdopcionPage';
import CrearEventoRefugioPage from './modules/shelter/CrearEventoRefugioPage';
import RegistrarConvivenciaPage from './modules/cohabitation/RegistrarConvivenciaPage';
import RegisterForm from './modules/auth/RegisterForm';
import RegistrarMascotaPage from './modules/pets/RegistrarMascotaPage';
import ConsultarMascotaPage from './modules/pets/ConsultarMascotaPage';
import { Routes, Route } from 'react-router-dom'
import HomePage from './modules/home/HomePage'
import RegistrarMascotaPage from './modules/pets/RegistrarMascotaPage'
import RegistrarEventoPage from './modules/lifeevents/RegistrarEventoPage'
import ConsultarEventosPage from './modules/lifeevents/ConsultarEventosPage'
import SolicitarAdopcionPage from './modules/adoptions/SolicitarAdopcionPage'
import CrearEventoRefugioPage from './modules/shelter/CrearEventoRefugioPage'
import RegistrarConvivenciaPage from './modules/cohabitation/RegistrarConvivenciaPage'
import RegisterForm from './modules/auth/RegisterForm'
import AdoptionProcessPage from './modules/FormsFilter/AdoptionProcessPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial' }}>
          <h1>Menú Principal de Adopciones</h1>
          <p><a href="/registrar-evento-vida">HU04: Evento de Vida (Mascota)</a></p>
          <p><a href="/solicitar-adopcion">HU08: Solicitar Adopción</a></p>
          <p><a href="/crear-evento-refugio">HU09: Evento de Refugio</a></p>
          <p><a href="/registrar-convivencia">HU10: Convivencia de Prueba</a></p>
          <p><a href="/crear-cuenta">HU01: Crear Cuenta</a></p>
          <p><a href="/registrar-mascota">HU02: Registrar Mascota</a></p>
          <p><a href="/consultar-mascota">HU03: Consultar Mascota</a></p>
        </div>
      } />
      <Route path="/" element={<HomePage />} />
      
      <Route path="/registrar-usuario" element={<RegisterForm />} />
      <Route path="/registrar-mascota" element={<RegistrarMascotaPage />} />
      <Route path="/registrar-evento-vida" element={<RegistrarEventoPage />} />
      <Route path="/consultar-eventos/:id" element={<ConsultarEventosPage />} />
      <Route path="/solicitar-adopcion" element={<SolicitarAdopcionPage />} />
      <Route path="/crear-evento-refugio" element={<CrearEventoRefugioPage />} />
      <Route path="/registrar-convivencia" element={<RegistrarConvivenciaPage />} />
      <Route path="/crear-cuenta" element={<RegisterForm />} />
      <Route path="/registrar-mascota" element={<RegistrarMascotaPage />} />
      <Route path="/consultar-mascota" element={<ConsultarMascotaPage />} />
    </Routes>
  )
}

export default App