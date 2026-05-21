import React, { useState } from 'react';
import './AdoptionForm.css';

const AdoptionForm = () => {
  const [formData, setFormData] = useState({
    purpose: '',
    papers: null,
    petId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, papers: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando AdoptionRequestEntity:", formData);
    // Aquí iría la lógica para conectar con tu backend de Java
  };

  return (
    <div className="adoption-container">
      <div className="adoption-card">
        <h2 className="adoption-title">Solicitud de Adopción</h2>
        <p className="adoption-subtitle">Ingresa los detalles para iniciar el proceso</p>
        
        <form onSubmit={handleSubmit} className="adoption-form-body">
          <div className="input-group">
            <span className="input-icon">🐾</span>
            <input 
              type="text" 
              name="petId" 
              placeholder="ID de la Mascota (PetEntity)" 
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group">
            <span className="input-icon">📝</span>
            <textarea 
              name="purpose" 
              placeholder="Propósito de la adopción (mín. 50 caracteres)" 
              onChange={handleChange}
              className="adoption-textarea"
              required 
            />
          </div>

          <div className="input-group-container">
            <p className="adoption-input-subtitle">Documento de identidad</p>
            <div className="input-group">
            <span className="input-icon">📁</span>
            <input 
                type="file" 
                name="papers" 
                onChange={handleFileChange}
                className="file-input"
                required 
            />
         </div>
        </div>

          <button type="submit" className="adoption-button">
            Enviar Solicitud
          </button>
        </form>
        
        <div className="adoption-footer">
          <p>¿Necesitas ayuda? <a href="/soporte" className="footer-link">Contactar encargado</a></p>
        </div>
      </div>
    </div>
  );
};

export default AdoptionForm;