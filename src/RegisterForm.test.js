import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from './RegisterForm';

describe('Pruebas en <RegisterForm />', () => {

    test('debe mostrar el formulario con sus campos iniciales', () => {
        render(<RegisterForm />);

        // Verificar que los campos existen
        const nameInput = screen.getByPlaceholderText(/nombre completo/i);
        expect(nameInput).toBeInTheDocument();

        const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
        expect(emailInput).toBeInTheDocument();

        const passwordInput = screen.getByPlaceholderText(/^contraseña$/i);
        expect(passwordInput).toBeInTheDocument();

        // Verificar que el botón de enviar esté presente
        const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
        expect(submitButton).toBeInTheDocument();
    });

    test('debe actualizar el valor del email cuando el usuario escribe', () => {
        render(<RegisterForm />);
        const emailInput = screen.getByPlaceholderText(/correo electrónico/i);

        // Simular escritura del usuario
        fireEvent.change(emailInput, { target: { value: 'santiago@correo.com', name: 'email' } });

        expect(emailInput.value).toBe('santiago@correo.com');
    });

    test('debe mostrar error si las contraseñas no coinciden', () => {
        render(<RegisterForm />);

        const passwordInput = screen.getByPlaceholderText(/^contraseña$/i);
        const confirmInput = screen.getByPlaceholderText(/confirmar contraseña/i);
        const submitButton = screen.getByRole('button', { name: /crear cuenta/i });

        fireEvent.change(passwordInput, { target: { value: '12345', name: 'password' } });
        fireEvent.change(confirmInput, { target: { value: '99999', name: 'confirmPassword' } });
        fireEvent.click(submitButton);

        const errorMsg = screen.getByText(/las contraseñas no coinciden/i);
        expect(errorMsg).toBeInTheDocument();
    });

    test('debe validar que el botón sea presionado', () => {
        render(<RegisterForm />);

        const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
        fireEvent.click(submitButton);
    });

});
