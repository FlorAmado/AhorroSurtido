import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { AuthContext } from '../../store/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'No se pudo iniciar sesión. Intentá nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#eae8e4] shadow-sm p-8">
        <div className="text-center mb-8">
          <span className="font-display text-2xl font-black tracking-tight text-[#2c2520]">
            Ahorro<span className="text-brand-orange">Surtido</span>
          </span>
          <p className="mt-2 text-sm text-[#6b5e52]">Ingresá a tu cuenta para seguir ahorrando</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-[#2c2520] mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#a89a8c] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="login-email"
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
            <label htmlFor="login-password" className="block text-sm font-medium text-[#2c2520] mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#a89a8c] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="login-password"
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
            disabled={cargando}
            className="w-full py-2.5 rounded-xl bg-brand-orange text-white font-semibold hover:bg-brand-orange-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {cargando ? 'Ingresando...' : 'Iniciar sesión'}
          </button>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-[#6b5e52]">
          ¿No tenés cuenta?{' '}
          <a href="/register" className="text-brand-orange font-semibold hover:underline">
            Registrate
          </a>
        </p>
      </div>
    </div>
  );
}
