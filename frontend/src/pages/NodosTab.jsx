import React, { useState, useEffect, useContext } from 'react';
import { PiggyBank, Leaf, ArrowRight, MapPin, Users, CheckCircle2 } from 'lucide-react';
import CreateNodoForm from '../components/CreateNodoForm';
import { nodoService } from '../services/nodoService';
import { AuthContext } from '../store/AuthContext';

export default function NodosTab({ nodesList, currentNode, onChangeNode, onJoinNodeByCode }) {
  const [invitationCode, setInvitationCode] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { seleccionarNodo, nodoActual } = useContext(AuthContext);
  const [pendingMembers, setPendingMembers] = useState([]);

  // Estado real desde el backend
  const [miNodo, setMiNodo] = useState(null);

  // Al montar, verificar si el usuario autenticado es dueño de algún nodo
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    nodoService.getMisNodos()
      .then(({ nodos }) => {
        if (nodos && nodos.length > 0) {
          const nodoPropio = nodos[0];
          setMiNodo(nodoPropio);
          setIsOwner(true);
          setPendingMembers(nodoPropio.miembrosPendientes || []);
        }
      })
      .catch(() => {
        setIsOwner(false);
      });
  }, []);

  const handleApprove = async (candidatoId, action) => {
    if (!miNodo) return;
    try {
      await nodoService.aprobarMiembro(miNodo._id, candidatoId, action);
      // Actualización optimista: quitar de la lista local de inmediato
      setPendingMembers(prev => prev.filter(m => (m._id || m) !== candidatoId));
    } catch(e) {
      alert('Error: ' + e.message);
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!invitationCode.trim()) {
      setErrorMsg('Por favor escribe un código válido');
      return;
    }

    try {
      setErrorMsg('');
      const response = await nodoService.unirseNodo(invitationCode);

      // Guardar nodo en contexto global para que el Header muestre la location
      if (response.nodo) {
        seleccionarNodo({ _id: response.nodo._id, nombre: response.nodo.nombre, location: response.nodo.location });
      }

      setSuccessMsg(response.message || '¡Te uniste al nodo exitosamente!');
      setInvitationCode('');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      setErrorMsg(err.message || 'Código inválido.');
      setSuccessMsg('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in" id="nodos-tab-container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* Left Column (Content & Form) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center space-y-6">
          {/* Heading */}
          <div className="space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl font-black text-[#2c2520] tracking-tight leading-tight">
              Bienvenido al Nodo de <br />
              <span className="relative inline-block text-brand-orange mt-2">
                {nodoActual?.location || currentNode.name}
                <svg className="absolute left-0 bottom-[-6px] w-full h-2.5 text-brand-orange/35" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,11 100,5" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
          </div>

          
          {/* Selector de Acciones (Tabs) */}
          <div className="flex space-x-6 mb-4 border-b border-gray-200">
            <button 
              onClick={() => setShowCreateForm(true)}
              className={`font-semibold pb-2 border-b-2 transition-colors ${showCreateForm ? 'border-brand-orange text-brand-orange' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Crear Nuevo Nodo
            </button>
            <button 
              onClick={() => setShowCreateForm(false)}
              className={`font-semibold pb-2 border-b-2 transition-colors ${!showCreateForm ? 'border-brand-orange text-brand-orange' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Unirse a un Nodo
            </button>
          </div>

          {/* Formulario Renderizado Dinámicamente */}
          {showCreateForm ? (
            <div className="animate-fade-in">
              <CreateNodoForm />
            </div>
            ) : (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#eae8e4] shadow-sm max-w-lg animate-fade-in">
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
                    placeholder="ej. B4RT-9X"
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
            </div>
          )}
          

          
          {/* Feature Highlight Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Unique Card 1 */}
            <div className="p-5 bg-white rounded-2xl border border-[#eae8e4] hover:shadow-md transition-shadow flex flex-col space-y-2">
              <div className="bg-brand-orange-light w-10 h-10 rounded-xl flex items-center justify-center text-brand-orange">
                <PiggyBank className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#2c2520] pt-1">Ahorren Juntos</h3>
              <p className="text-sm text-[#6b5e52] leading-relaxed">
                Accede a precios mayoristas agrupando compras con tu nodo vecinal.
              </p>
            </div>

            {/* Unique Card 2 */}
            <div className="p-5 bg-white rounded-2xl border border-[#eae8e4] hover:shadow-md transition-shadow flex flex-col space-y-2">
              <div className="bg-green-50 w-10 h-10 rounded-xl flex items-center justify-center text-green-600 border border-green-100">
                <Leaf className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#2c2520] pt-1">Menos Residuos</h3>
              <p className="text-sm text-[#6b5e52] leading-relaxed">
                Las entregas mayoristas reducen significativamente el embalaje plastico.
              </p>
            </div>
          </div>

          {/* Panel de Administración (Solo para dueños) */}
          {isOwner && (
            <div className="p-6 bg-orange-50 rounded-3xl border border-brand-orange/20 animate-fade-in mt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl font-bold text-brand-orange flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Solicitudes de ingreso
                </h3>
                <span className="text-xs font-semibold bg-brand-orange text-white px-2.5 py-1 rounded-full">
                  {pendingMembers.length} pendiente{pendingMembers.length !== 1 ? 's' : ''}
                </span>
              </div>

              {miNodo && (
                <p className="text-xs text-[#8a7a6b] mb-4">
                  Nodo: <strong>{miNodo.name}</strong> · {miNodo.members?.length || 0}/{miNodo.limiteMiembros} miembros
                </p>
              )}

              {pendingMembers.length === 0 ? (
                <div className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-brand-orange/10 text-sm text-[#6b5e52]">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span>No hay solicitudes pendientes por ahora.</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingMembers.map((candidato, idx) => {
                    // El backend hace populate, candidato puede ser objeto {_id, nombre, email} o solo el ID
                    const candidatoId = candidato._id || candidato;
                    const nombre = candidato.nombre || 'Usuario';
                    const email = candidato.email || '';

                    return (
                      <div key={candidatoId || idx} className="flex items-center justify-between bg-white p-4 rounded-xl border border-brand-orange/10 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-full bg-brand-orange-light flex items-center justify-center shrink-0">
                            <span className="text-brand-orange font-bold text-sm">
                              {nombre.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#2c2520]">{nombre}</p>
                            {email && <p className="text-xs text-[#6b5e52]">{email}</p>}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(candidatoId, 'accept')}
                            className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                          >
                            Aceptar
                          </button>
                          <button
                            onClick={() => handleApprove(candidatoId, 'reject')}
                            className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                          >
                            Rechazar
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}




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
                Nodo {nodoActual?.location || currentNode.name}
              </h4>
              <p className="text-xs text-[#6b5e52]"> 
                Nodo actualmente activo              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
