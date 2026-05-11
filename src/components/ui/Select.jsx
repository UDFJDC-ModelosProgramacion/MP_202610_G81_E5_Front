import React from 'react';
import { MdExpandMore } from 'react-icons/md'; // Icono de flecha hacia abajo

const Select = ({ label, required, options = [], ...props }) => {
  return (
    <div style={{ marginBottom: '15px', textAlign: 'left', position: 'relative' }}>
      <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontSize: '14px' }}>
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </label>
      <div style={{ position: 'relative' }}>
        <select
          style={{
            width: '100%',
            padding: '10px',
            paddingRight: '30px', // Espacio para el icono
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '16px',
            appearance: 'none', // Quita la flecha por defecto
            backgroundColor: 'white',
            boxSizing: 'border-box'
          }}
          {...props}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <MdExpandMore style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#aaa',
          pointerEvents: 'none' // Para que el click pase al select
        }} />
      </div>
    </div>
  );
};

export default Select;