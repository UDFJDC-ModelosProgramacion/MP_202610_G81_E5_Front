import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
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

    console.log('Enviando UserEntity:', userPayload);

    // Aquí iría la conexión al backend:

    setSuccess(true);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Crear Cuenta</h2>
        <p className="register-subtitle">Regístrate para acceder al sistema</p>

        {success ? (
          <div className="register-success">
            ✅ ¡Cuenta creada exitosamente!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="register-form-body">
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="name"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon">📧</span>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="register-error">{error}</p>}

            <button type="submit" className="register-button">
              Crear Cuenta
            </button>
          </form>
        )}

        <div className="register-footer">
          <p>¿Ya tienes cuenta? <a href="/login" className="footer-link">Iniciar sesión</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
