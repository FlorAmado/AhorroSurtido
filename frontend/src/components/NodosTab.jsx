import React, { useState } from 'react';
import { PiggyBank, Leaf, ArrowRight, MapPin, Users, CheckCircle2 } from 'lucide-react';

export default function NodosTab({ nodesList, currentNode, onChangeNode, onJoinNodeByCode }) {
  const [invitationCode, setInvitationCode] = useState('VC-892X');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleJoin = (e) => {
    e.preventDefault();
    if (!invitationCode.trim()) {
      setErrorMsg('Por favor escribe un código válido');
      return;
    }

    const res = onJoinNodeByCode(invitationCode);
    if (typeof res === 'string') {
      setSuccessMsg(`¡Exitoso! Te has unido correctamente al ${res}`);
      setErrorMsg('');
      setTimeout(() => setSuccessMsg(''), 5000);
    } else {
      setErrorMsg('Código no reconocido. Prueba con VC-892X, CH-195B o AL-224C');
      setSuccessMsg('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in" id="nodos-tab-container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* Left Column (Content & Form) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center space-y-8">
          
          {/* Badge */}
          <div className="self-start inline-flex items-center space-x-2 bg-[#fdf0ed] text-[#e15a13] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-[#fbdcd5]">
            <MapPin className="w-3.5 h-3.5 text-brand-orange" />
            <span>Compras Impulsadas por la Comunidad</span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl font-black text-[#2c2520] tracking-tight leading-tight">
              Bienvenida al Nodo de <br />
              <span className="relative inline-block text-brand-orange mt-2">
                {currentNode.name}
                <svg className="absolute left-0 bottom-[-6px] w-full h-2.5 text-brand-orange/35" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,11 100,5" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#5c5044] leading-relaxed max-w-2xl font-normal pt-2">
              Únete a tus vecinos locales para acceder a precios mayoristas en productos esenciales sostenibles y de alta calidad. Al comprar juntos, reducimos los residuos de envases, disminuimos las emisiones y construimos una comunidad más fuerte.
            </p>
          </div>

          {/* Feature Highlight Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Unique Card 1 */}
            <div className="p-5 bg-white rounded-2xl border border-[#eae8e4] hover:shadow-md transition-shadow flex flex-col space-y-2">
              <div className="bg-brand-orange-light w-10 h-10 rounded-xl flex items-center justify-center text-brand-orange">
                <PiggyBank className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#2c2520] pt-1">Ahorren Juntos</h3>
              <p className="text-sm text-[#6b5e52] leading-relaxed">
                Accede a tarifas mayoristas agrupando pedidos con tu nodo vecinal.
              </p>
            </div>

            {/* Unique Card 2 */}
            <div className="p-5 bg-white rounded-2xl border border-[#eae8e4] hover:shadow-md transition-shadow flex flex-col space-y-2">
              <div className="bg-green-50 w-10 h-10 rounded-xl flex items-center justify-center text-green-600 border border-green-100">
                <Leaf className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#2c2520] pt-1">Residuos Cero</h3>
              <p className="text-sm text-[#6b5e52] leading-relaxed">
                Las entregas a granel significan significativamente menos embalaje plástico e individual.
              </p>
            </div>
          </div>

          {/* Invitation Code Section Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#eae8e4] shadow-sm max-w-lg">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#2c2520] tracking-tight mb-4">
              ¿Tienes un código de invitación?
            </h2>
            
            <form onSubmit={handleJoin} className="space-y-4">
              <div className="relative">
                <label className="absolute -top-2.5 left-4 px-1.5 bg-white text-xs font-semibold text-[#8a7a6b]">
                  Código de Invitación
                </label>
                <input
                  type="text"
                  value={invitationCode}
                  onChange={(e) => setInvitationCode(e.target.value.toUpperCase())}
                  placeholder="ej. VC-892X"
                  className="w-full px-4 py-3.5 border border-[#c8beaf] rounded-xl text-base text-[#2c2520] font-mono focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all"
                  id="invitation-input-field"
                />
              </div>

              {errorMsg && (
                <p id="invitation-error-msg" className="text-sm text-red-600 font-medium">
                  ⚠️ {errorMsg}
                </p>
              )}

              {successMsg && (
                <div id="invitation-success-msg" className="flex items-start space-x-2 text-sm text-green-700 bg-green-50 p-3 rounded-lg border border-green-200">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <button
                type="submit"
                id="join-node-btn"
                className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white font-bold py-3.5 px-6 rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center space-x-2 cursor-pointer text-base"
              >
                <span>Unirse al Nodo</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-[#f4f2ee] flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-[#8a7a6b]">
              <span>¿No tienes un código?</span>
              <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                {nodesList.map(node => (
                  <button
                    key={node.id}
                    onClick={() => onChangeNode(node.id)}
                    className={`font-semibold hover:underline cursor-pointer ${
                      node.id === currentNode.id ? 'text-brand-orange' : 'text-[#615243]'
                    }`}
                  >
                    {node.name} ({node.membersCount})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Aesthetic Image Panel) */}
        <div className="col-span-1 lg:col-span-5 relative min-h-[420px] lg:min-h-0 rounded-3xl overflow-hidden shadow-sm flex items-stretch">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80"
            alt="Eco-friendly pantry shelving"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Subtle warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Floating badge inside picture */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl flex items-center space-x-4 border border-white/50 shadow-lg">
            <div className="bg-[#fbdcd5] text-brand-orange w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-brand-orange" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-[#2c2520]">
                Nodo {currentNode.name}
              </h4>
              <p className="text-xs text-[#6b5e52]">
                {currentNode.membersCount} miembros ahorrando activamente
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
