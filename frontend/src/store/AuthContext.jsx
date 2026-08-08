import { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // 1. Inicializamos el usuario leyendo del localStorage si existe
    const [usuario, setUsuario] = useState(() => {
        const usuarioGuardado = localStorage.getItem('usuario');
        return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
    });
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            // 2. Mantenemos el usuario sincronizado en el storage
            if (usuario) localStorage.setItem('usuario', JSON.stringify(usuario));
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
        }
        setCargando(false);
    }, [token, usuario]);

    const login = async (email, password) => {
        const data = await authService.login({ email, password });
        setToken(data.token);
        setUsuario(data.usuario);
    };

    const register = async (nombre, email, password) => {
        const data = await authService.register({ nombre, email, password });
        setToken(data.token);
        setUsuario(data.usuario);
    };

    const logout = () => {
        setToken(null);
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, token, login, register, logout, cargando }}>
            {children}
        </AuthContext.Provider>
    );
};