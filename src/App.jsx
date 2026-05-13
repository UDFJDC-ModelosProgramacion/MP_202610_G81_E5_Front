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
      <Route path="/" element={<HomePage />} />
      
      <Route path="/registrar-usuario" element={<RegisterForm />} />
      <Route path="/registrar-mascota" element={<RegistrarMascotaPage />} />
      <Route path="/registrar-evento-vida" element={<RegistrarEventoPage />} />
      <Route path="/consultar-eventos/:id" element={<ConsultarEventosPage />} />
      <Route path="/solicitar-adopcion" element={<SolicitarAdopcionPage />} />
      <Route path="/crear-evento-refugio" element={<CrearEventoRefugioPage />} />
      <Route path="/registrar-convivencia" element={<RegistrarConvivenciaPage />} />
      
      {/* Ruta para la HU11 */}
      <Route path="/procesos-adopcion" element={<AdoptionProcessPage />} />
    </Routes>
  )
}

export default App