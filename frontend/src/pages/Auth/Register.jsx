import React, { useState, useContext } from 'react';
import { User, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { AuthContext } from '../../store/AuthContext';
import logoImg from '../../../logo.png';

export default function Register({ onSwitchToLogin, onSuccess }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [cargando, setCargando] = useState(false);

  const { register, logout } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensajeExito('');
    setCargando(true);

    try {
      await register(nombre, email, password);
      // Cerramos la sesión automática para que el usuario pueda iniciar sesión manualmente
      logout();
      setMensajeExito('¡Cuenta creada con éxito! Redirigiendo al inicio de sesión...');
      
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else if (onSwitchToLogin) {
          onSwitchToLogin();
        }
      }, 1500);
    } catch (err) {
      setError(err.message || 'No se pudo completar el registro. Intentá nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#eae8e4] shadow-sm p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <img src={logoImg} alt="AhorroSurtido Logo" className="w-12 h-12 object-contain" />
          </div>
          <span className="font-display text-2xl font-black tracking-tight text-[#2c2520]">
            Ahorro<span className="text-brand-orange">Surtido</span>
          </span>
          <p className="mt-2 text-sm text-[#6b5e52]">Creá tu cuenta y sumate a tu nodo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="register-nombre" className="block text-sm font-medium text-[#2c2520] mb-1.5">
              Nombre
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#a89a8c] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="register-nombre"
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#eae8e4] bg-white text-[#2c2520] placeholder-[#a89a8c] focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="register-email" className="block text-sm font-medium text-[#2c2520] mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#a89a8c] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="register-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#eae8e4] bg-white text-[#2c2520] placeholder-[#a89a8c] focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="register-password" className="block text-sm font-medium text-[#2c2520] mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#a89a8c] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="register-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#eae8e4] bg-white text-[#2c2520] placeholder-[#a89a8c] focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={cargando || Boolean(mensajeExito)}
            className="w-full py-2.5 rounded-xl bg-brand-orange text-white font-semibold hover:bg-brand-orange-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>

          {mensajeExito && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-center text-sm font-semibold flex items-center justify-center space-x-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>{mensajeExito}</span>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-[#6b5e52]">
          ¿Ya tenés cuenta?{' '}
          <button type="button" onClick={onSwitchToLogin} className="text-brand-orange font-semibold hover:underline bg-transparent border-none cursor-pointer">
            Iniciá sesión
          </button>
        </p>
      </div>
    </div>
  );
}
