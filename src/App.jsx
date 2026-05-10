import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RegistrarEventoPage from './modules/lifeevents/RegistrarEventoPage';

const Home = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h1>Panel de Control</h1>
    <Link to="/registrar-evento">
      <button>Ir a Registrar Evento</button>
    </Link>
  </div>
);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registrar-evento" element={<RegistrarEventoPage />} />
      </Routes>
    </div>
  );
}

export default App;