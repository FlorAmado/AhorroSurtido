import React, { useState, useContext } from 'react';
import { User, Menu, X, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';
import logoImg from '../../public/img/logo.png';

export default function Header({ activeTab, setActiveTab, cartCount, currentNodeName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Consumimos el contexto global y el hook de navegación
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const tabs = [
    { id: 'nodos', label: 'Nodos' },
    { id: 'mayoristas', label: 'Mayoristas' },
    { id: 'carrito', label: 'Mi Carrito', badge: cartCount > 0 ? cartCount : undefined },
    { id: 'impacto', label: 'Impacto' }
  ];

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#eae8e4] px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo con espacio delantero y etiqueta dinámica de zona */}
        <div
          onClick={() => setActiveTab('nodos')}
          className="flex items-center space-x-3 cursor-pointer select-none"
          id="header-logo-container"
        >
          <img
            src={logoImg}
            alt="AhorroSurtido Logo"
            className="w-8 h-8 object-contain shrink-0 ml-1"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="flex items-center space-x-2">
            <span className="font-display text-2xl font-black tracking-tight text-[#2c2520]">
              Ahorro<span className="text-brand-orange">Surtido</span>
            </span>
            {currentNodeName && (
              <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#f4ece1] text-[#786149] border border-[#e3d1ba]">
                📍 {currentNodeName}
              </span>
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => {
                setActiveTab(tab.id);
                setMobileMenuOpen(false);
              }}
              className={`relative py-2 text-base font-medium font-sans transition-all duration-200 cursor-pointer ${activeTab === tab.id
                ? 'text-brand-orange font-bold'
                : 'text-[#6b5e52] hover:text-[#2c2520]'
                }`}
            >
              {tab.label}
              {tab.badge !== undefined && (
                <span className="ml-1.5 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-brand-orange rounded-full">
                  {tab.badge}
                </span>
              )}
              {activeTab === tab.id && (
                <span className="absolute bottom-[-16px] left-0 right-0 h-0.5 bg-brand-orange rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Desktop Utility Icons */}
        <div className="flex items-center space-x-4">

          {/* User Profile Area Dinámica (Escritorio) */}
          <div className="relative">
            {usuario ? (
              <>
                <button
                  id="user-profile-btn"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-2 p-1 pr-3 text-[#6b5e52] hover:text-brand-orange border border-[#eae8e4] rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
                  title="Mi Cuenta"
                >
                  <div className="w-7 h-7 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-xs">
                    {usuario.nombre ? usuario.nombre.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm font-semibold hidden sm:block">{usuario.nombre}</span>
                </button>

                {/* Dropdown Minimalista */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl border border-[#eae8e4] shadow-sm py-2 animate-fade-in">
                    <div className="px-4 py-3 border-b border-[#eae8e4]">
                      <p className="text-sm font-bold text-[#2c2520] truncate">{usuario.nombre}</p>
                      <p className="text-xs text-[#8a7a6b] truncate">{usuario.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-[#e15a13] hover:bg-[#fef0e6] font-semibold flex items-center space-x-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Cerrar sesión</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center space-x-2">
                {/* En escritorio dejamos únicamente 'Ingresar' limpio para mantener minimalismo */}
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm font-semibold text-[#6b5e52] hover:text-[#2c2520] transition-colors cursor-pointer"
                >
                  Ingresar
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-[#2c2520] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-menu" className="md:hidden mt-4 pt-4 border-t border-[#eae8e4] animate-fade-in">
          <nav className="flex flex-col space-y-3">

            {/* Info del Usuario en Móvil */}
            {usuario && (
              <div className="flex items-center space-x-3 px-3 pb-4 mb-2 border-b border-[#eae8e4]">
                <div className="w-10 h-10 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {usuario.nombre ? usuario.nombre.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2c2520]">{usuario.nombre}</p>
                  <p className="text-xs text-[#8a7a6b]">{usuario.email}</p>
                </div>
              </div>
            )}

            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={`mobile-tab-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium transition-all ${activeTab === tab.id
                  ? 'bg-brand-orange-light text-brand-orange font-bold'
                  : 'text-[#6b5e52] hover:bg-gray-50 hover:text-[#2c2520]'
                  }`}
              >
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold leading-none text-white bg-brand-orange rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}

            {/* Acciones de Autenticación en Móvil (Acá se muestra Registrarse dentro del menú desplegable) */}
            <div className="pt-4 mt-2 border-t border-[#eae8e4] space-y-2">
              {usuario ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#e15a13] hover:bg-[#fef0e6] transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Cerrar sesión</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/login');
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#6b5e52] hover:bg-gray-50 transition-colors"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Ingresar</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/register');
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl text-sm font-bold bg-brand-orange text-white hover:bg-brand-orange-hover transition-colors shadow-xs"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Registrarse</span>
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}