import React from 'react';
import { Routes, Route } from 'react-router-dom'; 

import RegistrarEventoPage from './modules/lifeevents/RegistrarEventoPage';
import SolicitarAdopcionPage from './modules/adoptions/SolicitarAdopcionPage';
import CrearEventoRefugioPage from './modules/shelter/CrearEventoRefugioPage';
import RegistrarConvivenciaPage from './modules/cohabitation/RegistrarConvivenciaPage';

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
        </div>
      } />

      <Route path="/registrar-evento-vida" element={<RegistrarEventoPage />} />
      <Route path="/solicitar-adopcion" element={<SolicitarAdopcionPage />} />
      <Route path="/crear-evento-refugio" element={<CrearEventoRefugioPage />} />
      <Route path="/registrar-convivencia" element={<RegistrarConvivenciaPage />} />
    </Routes>
  );
}

export default App;
