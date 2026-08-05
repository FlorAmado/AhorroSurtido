const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api';

export const authService = {
  login: async (credenciales) => {
    const respuesta = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credenciales),                                              
    });
    
    if (!respuesta.ok) {
      const error = await respuesta.json();
      throw new Error(error.mensaje || 'Error al iniciar sesión');
    }
    
    return respuesta.json(); // Retorna { token, usuario }
  },

  register: async (datosUsuario) => {
    const respuesta = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosUsuario),
    });
    
    if (!respuesta.ok) {
      const error = await respuesta.json();
      throw new Error(error.mensaje || 'Error al registrar usuario');
    }
    
    return respuesta.json();
  }
};