import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, test, expect, vi } from 'vitest';
import RegistrarMascotaPage from './RegistrarMascotaPage';

vi.mock('../../services/PetService', () => ({
  createPet: vi.fn()
}));

describe('Pruebas en <RegistrarMascotaPage />', () => {

  test('debe mostrar el formulario con sus campos iniciales', () => {
    render(<MemoryRouter><RegistrarMascotaPage /></MemoryRouter>);

    expect(screen.getByPlaceholderText(/Ej: Fido/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ej: Labrador/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ej: 12.5/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrar mascota/i })).toBeInTheDocument();
  });

  test('debe actualizar el nombre de la mascota cuando el usuario escribe', () => {
    render(<MemoryRouter><RegistrarMascotaPage /></MemoryRouter>);

    const nameInput = screen.getByPlaceholderText(/Ej: Fido/i);
    fireEvent.change(nameInput, { target: { value: 'Luna', name: 'name' } });
    expect(nameInput.value).toBe('Luna');
  });

  test('debe mostrar el botón de guardar', () => {
    render(<MemoryRouter><RegistrarMascotaPage /></MemoryRouter>);

    const btn = screen.getByRole('button', { name: /registrar mascota/i });
    expect(btn).toBeInTheDocument();
    expect(btn).not.toBeDisabled();
  });

});
