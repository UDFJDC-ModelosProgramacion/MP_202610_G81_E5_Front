import { Routes, Route } from 'react-router-dom'
import LoginPage               from './modules/auth/LoginPage'
import HomePage                from './modules/home/HomePage'
import RegistrarMascotaPage    from './modules/pets/RegistrarMascotaPage'
import RegistrarEventoPage     from './modules/lifeevents/RegistrarEventoPage'
import ConsultarEventosPage    from './modules/lifeevents/ConsultarEventosPage'
import SolicitarAdopcionPage   from './modules/adoptions/SolicitarAdopcionPage'
import CrearEventoRefugioPage  from './modules/shelter/CrearEventoRefugioPage'
import RegistrarRefugioPage    from './modules/shelter/RegistrarRefugioPage'
import RegistrarConvivenciaPage from './modules/cohabitation/RegistrarConvivenciaPage'
import RegisterForm            from './modules/auth/RegisterForm'
import AdoptionProcessPage     from './modules/FormsFilter/AdoptionProcessPage'
import ProtectedRoute          from './components/ProtectedRoute'
import CohabitationMonitorPage from './modules/cohabitation/CohabitationMonitorPage'
import UpdateCohabitationTrial from './modules/cohabitation/UpdateCohabitationTrialPage'
 
import RegistrarVeterinarioPage from './modules/veterinarians/RegistrarVeterinarioPage'
import RegistrarTipoEventoPage from './modules/typeLE/RegistrarTipoEventoPage';

function App() {
  return (
    <Routes>
      // Rutas públicas
      <Route path="/"                  element={<LoginPage />} />
      <Route path="/registrar-usuario" element={<RegisterForm />} />
 
      // Rutas protegidas
      <Route path="/home" element={
        <ProtectedRoute><HomePage /></ProtectedRoute>
      }/>
      <Route path="/registrar-mascota" element={
        <ProtectedRoute><RegistrarMascotaPage /></ProtectedRoute>
      }/>
      <Route path="/registrar-veterinario" element={
        <ProtectedRoute><RegistrarVeterinarioPage /></ProtectedRoute>
      }/>
      <Route path="/registrar-evento-vida" element={
        <ProtectedRoute><RegistrarEventoPage /></ProtectedRoute>
      }/>
      <Route path="/consultar-eventos/:id" element={
        <ProtectedRoute><ConsultarEventosPage /></ProtectedRoute>
      }/>
      <Route path="/solicitar-adopcion" element={
        <ProtectedRoute><SolicitarAdopcionPage /></ProtectedRoute>
      }/>
      <Route path="/crear-evento-refugio" element={
        <ProtectedRoute><CrearEventoRefugioPage /></ProtectedRoute>
      }/>
      <Route path="/registrar-refugio" element={
        <ProtectedRoute><RegistrarRefugioPage /></ProtectedRoute>
      }/>
      <Route path="/registrar-convivencia" element={
        <ProtectedRoute><RegistrarConvivenciaPage /></ProtectedRoute>
      }/>
      <Route path="/procesos-adopcion" element={
        <ProtectedRoute><AdoptionProcessPage /></ProtectedRoute>
      }/>
      <Route path="/CohabitationMonitorPage" element={
        <ProtectedRoute><CohabitationMonitorPage /></ProtectedRoute>
      }/>
      <Route path="/update-cohabitation-trial/:id" element={
        <ProtectedRoute><UpdateCohabitationTrial /></ProtectedRoute>
      <Route path="/registrar-tipo-evento" element={
        <ProtectedRoute><RegistrarTipoEventoPage /></ProtectedRoute>
      }/>
    </Routes>
  )
}
 export default App