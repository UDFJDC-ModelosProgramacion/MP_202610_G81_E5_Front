import { render, screen, fireEvent } from '@testing-library/react';
import AdoptionForm from './AdoptionForm';

describe('Pruebas en <AdoptionForm />', () => {
    
    test('debe mostrar el formulario con sus campos iniciales', () => {
        render(<AdoptionForm />);
        
        // Verificar que el campo de propósito (textarea) existe
        const purposeInput = screen.getByPlaceholderText(/propósito de la adopción/i);
        expect(purposeInput).toBeInTheDocument();
        
        // Verificar que el botón de enviar esté presente
        const submitButton = screen.getByRole('button', { name: /enviar solicitud/i });
        expect(submitButton).toBeInTheDocument();
    });

    test('debe actualizar el valor del propósito cuando el usuario escribe', () => {
        render(<AdoptionForm />);
        const purposeInput = screen.getByPlaceholderText(/propósito de la adopción/i);
        
        // Simular escritura del usuario
        fireEvent.change(purposeInput, { target: { value: 'Quiero adoptar para darle un hogar amoroso a la mascota.', name: 'purpose' } });
        
        expect(purposeInput.value).toBe('Quiero adoptar para darle un hogar amoroso a la mascota.');
    });

    test('debe validar que el botón sea presionado', () => {
        const handleSubmit = jest.fn(); // Mock de la función
        render(<AdoptionForm />);
        
        const submitButton = screen.getByRole('button', { name: /enviar solicitud/i });
        fireEvent.click(submitButton);
        
        
    });
});