import { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [cargando, setCargando] = useState(true);
    const [nodoActual, setNodoActual] = useState(() => {
        try { return JSON.parse(localStorage.getItem('nodoActual')) || null; }
        catch { return null; }
    });

    // Almacenar el token en localStorage cuando cambie
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
        setCargando(false);
    }, [token]);

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

    // nodo: objeto con { _id, nombre, location, ... }
    const seleccionarNodo = (nodo) => {
        setNodoActual(nodo);
        localStorage.setItem('nodoActual', JSON.stringify(nodo));
    };

    const limpiarNodo = () => {
        setNodoActual(null);
        localStorage.removeItem('nodoActual');
    };

    return (
        <AuthContext.Provider value={{ usuario, token, login, register, logout, cargando, nodoActual, seleccionarNodo, limpiarNodo }}>
            {children}
        </AuthContext.Provider>
    );
};