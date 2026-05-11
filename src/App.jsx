import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RegistrarEventoPage from './modules/lifeevents/RegistrarEventoPage';
import RegisterForm from './modules/auth/RegisterForm';
import RegistrarMascotaPage from './modules/pets/RegistrarMascotaPage';

const Home = () => (
  <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Segoe UI, sans-serif' }}>
    <h1>Panel de Control</h1>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', marginTop: '24px' }}>
      <Link to="/crear-cuenta">
        <button style={btnStyle}>👤 Crear Cuenta</button>
      </Link>
      <Link to="/registrar-mascota">
        <button style={btnStyle}>🐾 Registrar Mascota</button>
      </Link>
      <Link to="/registrar-evento">
        <button style={btnStyle}>📋 Registrar Evento</button>
      </Link>
    </div>
  </div>
);

const btnStyle = {
  padding: '12px 28px',
  backgroundColor: '#4a76d1',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  cursor: 'pointer',
  width: '260px'
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear-cuenta" element={<RegisterForm />} />
        <Route path="/registrar-mascota" element={<RegistrarMascotaPage />} />
        <Route path="/registrar-evento" element={<RegistrarEventoPage />} />
      </Routes>
    </div>
  );
}

export default App;