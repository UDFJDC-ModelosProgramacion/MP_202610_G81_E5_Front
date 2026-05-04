import React from 'react';

const Button = ({ children, ...props }) => {
  return (
    <button
      style={{
        width: '100%',
        padding: '12px',
        backgroundColor: '#4a76d1', // El azul de la imagen
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '18px',
        fontWeight: '500',
        cursor: 'pointer',
        marginTop: '10px',
        transition: 'background-color 0.2s'
      }}
      // Efecto hover simple
      onMouseOver={(e) => e.target.style.backgroundColor = '#3b61b3'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#4a76d1'}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;