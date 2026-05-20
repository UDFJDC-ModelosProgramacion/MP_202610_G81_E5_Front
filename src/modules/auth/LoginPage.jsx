import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    // Primero registra/obtiene el adoptante
    const regRes = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: formData.email, 
        password: formData.password 
      }),
    });
    const data = await regRes.json();
    // Guarda el id real del adoptante creado en BD
    localStorage.setItem('auth_user', JSON.stringify({ 
      email: formData.email, 
      id: data.id           // id del AdopterEntity
    }));
    navigate('/home');
  } catch (err) {
    setError('Error al iniciar sesión.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-root">
      <div className="login-bg">
        <div className="login-orb login-orb--1" />
        <div className="login-orb login-orb--2" />
        <div className="login-orb login-orb--3" />
        <div className="login-grid" />
      </div>

      <div className="login-split">
        <div className="login-brand">
          <div className="login-brand__paw">🐾</div>
          <h1 className="login-brand__name">PawHub</h1>
          <p className="login-brand__tagline">
            Conectando familias<br />con sus compañeros perfectos.
          </p>
          <div className="login-stats">
            <div className="login-stat">
            </div>
            <div className="login-stat">
            </div>
            <div className="login-stat">
            </div>
          </div>
        </div>

        <div className="login-card">
          <div className="login-card__inner">
            <div className="login-card__header">
              <h2 className="login-card__title">Bienvenido de vuelta</h2>
              <p className="login-card__sub">Ingresa a tu cuenta para continuar</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className={`login-field ${focused === 'email' ? 'login-field--active' : ''} ${formData.email ? 'login-field--filled' : ''}`}>
                <label className="login-field__label">Correo electrónico</label>
                <input
                  className="login-field__input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  autoComplete="email"
                />
                <div className="login-field__line" />
              </div>

              <div className={`login-field ${focused === 'password' ? 'login-field--active' : ''} ${formData.password ? 'login-field--filled' : ''}`}>
                <label className="login-field__label">Contraseña</label>
                <input
                  className="login-field__input"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused('')}
                  autoComplete="current-password"
                />
                <div className="login-field__line" />
              </div>

              {error && (
                <div className="login-error">
                  <span>⚠</span> {error}
                </div>
              )}

              <button className="login-btn" type="submit" disabled={loading}>
                <span className="login-btn__text">
                  {loading ? 'Ingresando…' : 'Ingresar'}
                </span>
                {!loading && <span className="login-btn__arrow">→</span>}
                {loading && <span className="login-btn__spinner" />}
              </button>
            </form>

            <div className="login-footer">
              <span>¿No tienes cuenta?</span>
              <button className="login-link" onClick={() => navigate('/registrar-usuario')}>
                Regístrate aquí
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
