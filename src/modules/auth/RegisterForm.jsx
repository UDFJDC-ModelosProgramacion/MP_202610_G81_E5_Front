import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../services/UserService';
import './RegisterForm.css';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const userPayload = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    };

    try {
      setLoading(true);
      await registerUser(userPayload);
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError('Error al crear la cuenta. Intenta de nuevo.');
      console.error('Error al registrar:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="register-root">
    <div className="register-bg">
      <div className="register-orb register-orb--1" />
      <div className="register-orb register-orb--2" />
      <div className="register-orb register-orb--3" />
      <div className="register-grid" />
    </div>

    <div className="register-split">
      <div className="register-brand">
        <div className="register-brand__paw">🐾</div>
        <h1 className="register-brand__name">PawHub</h1>
        <p className="register-brand__tagline">
          Únete a nuestra comunidad<br />y encuentra a tu compañero ideal.
        </p>
      </div>

      <div className="register-card">
        <div className="register-card__inner">
          <div className="register-card__header">
            <h2 className="register-card__title">Crear Cuenta</h2>
            <p className="register-card__sub">Regístrate para comenzar</p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            
            {/* Campo Nombre */}
            <div className={`register-field ${focused === 'name' ? 'register-field--active' : ''} ${formData.name ? 'register-field--filled' : ''}`}>
              <label className="register-field__label">Nombre completo</label>
              <input
                className="register-field__input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused('')}
                autoComplete="name"
              />
              <div className="register-field__line" />
            </div>

            {/* Campo Correo */}
            <div className={`register-field ${focused === 'email' ? 'register-field--active' : ''} ${formData.email ? 'register-field--filled' : ''}`}>
              <label className="register-field__label">Correo electrónico</label>
              <input
                className="register-field__input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
                autoComplete="email"
              />
              <div className="register-field__line" />
            </div>

            {/* Campo Contraseña */}
            <div className={`register-field ${focused === 'password' ? 'register-field--active' : ''} ${formData.password ? 'register-field--filled' : ''}`}>
              <label className="register-field__label">Contraseña</label>
              <input
                className="register-field__input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused('')}
                autoComplete="new-password"
              />
              <div className="register-field__line" />
            </div>
{/* Campo Confirmar Contraseña  */}
            <div className={`register-field ${focused === 'confirmPassword' ? 'register-field--active' : ''} ${formData.confirmPassword ? 'register-field--filled' : ''}`}>
              <label className="register-field__label">Confirmar contraseña</label>
              <input
                className="register-field__input"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => setFocused('confirmPassword')}
                onBlur={() => setFocused('')}
                autoComplete="new-password"
              />
              <div className="register-field__line" />
            </div>
            {/* Manejo de Errores */}
            {error && (
              <div className="register-error">
                <span>⚠</span> {error}
              </div>
            )}

            {/* Botón de Submit */}
            <button className="register-btn" type="submit" disabled={loading}>
              <span className="register-btn__text">
                {loading ? 'Creando cuenta…' : 'Crear Cuenta'}
              </span>
              {!loading && <span className="register-btn__arrow">→</span>}
            </button>
          </form>

          {/* Footer del formulario */}
          <div className="register-footer">
            <span>¿Ya tienes cuenta?</span>
            <button className="register-link" onClick={() => navigate('/')}>
              Inicia sesión aquí
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default RegisterForm;
