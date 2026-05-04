
import React from 'react';

const Input = ({ label, required, type = "text", ...props }) => {
  return (
    <div style={{ marginBottom: '15px', textAlign: 'left' }}>
      <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontSize: '14px' }}>
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </label>
      <input
        type={type}
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          fontSize: '16px',
          boxSizing: 'border-box' // Importante para el padding
        }}
        {...props}
      />
    </div>
  );
};

export default Input;