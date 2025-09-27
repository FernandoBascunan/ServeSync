// src/services/authService.js
import { API_BASE_URL } from '../config';

export async function loginUser(rutEmpresa, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ rutEmpresa, password })
    });

    if (!response.ok) {
      // si el status no es 2xx, parsea el error
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en el login');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error de conexión al backend:', err);
    throw new Error('No se pudo conectar al servidor');
  }
}
