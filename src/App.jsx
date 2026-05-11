import { Routes, Route } from 'react-router-dom'

import RegistrarMascotaPage from './modules/pets/RegistrarMascotaPage'
import RegistrarEventoPage from './modules/lifeevents/RegistrarEventoPage'
import SolicitarAdopcionPage from './modules/adoptions/SolicitarAdopcionPage'
import CrearEventoRefugioPage from './modules/shelter/CrearEventoRefugioPage'
import RegistrarConvivenciaPage from './modules/cohabitation/RegistrarConvivenciaPage'
import RegisterForm from './modules/auth/RegisterForm'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial' }}>
          <h1>Menú Principal de Adopciones</h1>
          <div style={{ display: 'grid', gap: '10px', maxWidth: '300px', margin: '0 auto' }}>
            <a href="/registrar-usuario">HU01: Registrar Usuario</a>
            <a href="/registrar-mascota">HU03: Registrar Mascota</a>
            <a href="/registrar-evento-vida">HU04: Evento de Vida</a>
            <a href="/solicitar-adopcion">HU08: Solicitar Adopción</a>
            <a href="/crear-evento-refugio">HU09: Evento de Refugio</a>
            <a href="/registrar-convivencia">HU10: Convivencia de Prueba</a>
          </div>
        </div>
      } />
      
      {/* Rutas conectadas a los componentes de todo el equipo */}
      <Route path="/registrar-usuario" element={<RegisterForm />} />
      <Route path="/registrar-mascota" element={<RegistrarMascotaPage />} />
      <Route path="/registrar-evento-vida" element={<RegistrarEventoPage />} />
      <Route path="/solicitar-adopcion" element={<SolicitarAdopcionPage />} />
      <Route path="/crear-evento-refugio" element={<CrearEventoRefugioPage />} />
      <Route path="/registrar-convivencia" element={<RegistrarConvivenciaPage />} />
    </Routes>
  )
}

export default App