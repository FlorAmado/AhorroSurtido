import React, { useState } from 'react';
import { Bell, User, Menu, X } from 'lucide-react';
import logoImg from '../../logo.png';

export default function Header({ activeTab, setActiveTab, cartCount, currentNodeName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'nodos', label: 'Nodos' },
    { id: 'mayoristas', label: 'Productos' },
    { id: 'carrito', label: 'Mi Carrito', badge: cartCount > 0 ? cartCount : undefined },
    { id: 'impacto', label: 'Impacto' },
    { id: 'nosotros', label: 'Nosotros' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#eae8e4] px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('nodos')} 
          className="flex items-center space-x-2.5 cursor-pointer select-none"
          id="header-logo-container"
        >
          <img 
            src={logoImg} 
            alt="AhorroSurtido Logo" 
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0" 
          />
          <span className="font-display text-2xl font-black tracking-tight text-[#2c2520]">
            Ahorro<span className="text-brand-orange">Surtido</span>
          </span>
          {currentNodeName && (
            <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#f4ece1] text-[#786149] border border-[#e3d1ba]">
              📍 {currentNodeName}
            </span>
          )}
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
              className={`relative py-2 text-base font-medium font-sans transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
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
          <button 
            id="notification-bell-btn"
            className="p-2 text-[#6b5e52] hover:text-brand-orange rounded-full hover:bg-gray-100 transition-colors relative"
            title="Notificationes"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-brand-orange rounded-full border-2 border-white animate-pulse" />
          </button>
          
          <button 
            id="user-profile-btn"
            onClick={() => {
              setActiveTab('login');
              setMobileMenuOpen(false);
            }}
            className="p-1.5 text-[#6b5e52] hover:text-brand-orange border border-[#eae8e4] rounded-full hover:bg-gray-100 transition-colors flex items-center space-x-1"
            title="Mi Cuenta"
          >
            <User className="w-5 h-5 text-[#6b5e52]" />
          </button>

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
            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={`mobile-tab-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium transition-all ${
                  activeTab === tab.id
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
          </nav>
        </div>
      )}
    </header>
  );
}
