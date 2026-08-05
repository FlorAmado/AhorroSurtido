import React, { useState, useContext } from 'react';
import { nodoService } from '../services/nodoService';
import { AuthContext } from '../store/AuthContext';
import './CreateNodoForm.css';

const CreateNodoForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    location: '',
    limiteMiembros: 2,
  });
  const { seleccionarNodo } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [invitationCode, setInvitationCode] = useState('');

  // Maneja el cambio de los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'limiteMiembros' ? Number(value) : value,
    }));
  };

  // Maneja el envío del formulario al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Validación extra en frontend
    if (formData.limiteMiembros < 2 || formData.limiteMiembros > 50) {
      setError('El límite de miembros debe estar entre 2 y 50.');
      setLoading(false);
      return;
    }

    try {
      const data = await nodoService.crearNodo(formData);

      setSuccess('¡Nodo creado con éxito!');
      setInvitationCode(data.nodo.invitation_code);

      // Guardar nodo en contexto global para que el Header muestre la location
      seleccionarNodo({ _id: data.nodo._id, nombre: data.nodo.nombre, location: data.nodo.location });

      setFormData({ nombre: '', location: '', limiteMiembros: 2 });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#eae8e4] shadow-sm max-w-lg animate-fade-in">
      <div className="font-display text-xl sm:text-2xl font-bold text-[#2c2520] tracking-tight mb-4">
        <p>Crea tu propio nodo y comienza a ahorrar!</p>
      </div> 

      <form onSubmit={handleSubmit} className="crear-nodo-form">
        <div className="relative">
          <label className="absolute -top-2.5 left-4 px-1.5 bg-white text-xs font-semibold text-[#8a7a6b]">
            Nombre del Nodo
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Ej. Vecinos de Lanús Este"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border border-[#c8beaf] rounded-xl text-base text-[#2c2520] focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all"
            required
          />
        </div>
        <br />

        <div className="relative">
          <label className="absolute -top-2.5 left-4 px-1.5 bg-white text-xs font-semibold text-[#8a7a6b]">Ubicación / Zona</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Ej. Lanús, Buenos Aires"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border border-[#c8beaf] rounded-xl text-base text-[#2c2520] focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all"
            required
          />
        </div>
        <br />

        <div className="relative">
          <label className="absolute -top-2.5 left-4 px-1.5 bg-white text-xs font-semibold text-[#8a7a6b]">Límite de Miembros (2 a 50)</label>
          <input
            type="number"
            id="limiteMiembros"
            name="limiteMiembros"
            min="2"
            max="50"
            value={formData.limiteMiembros}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border border-[#c8beaf] rounded-xl text-base text-[#2c2520] font-mono focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all"
            required
          />
        </div>
        <br />

        {error && <div className="alert error-alert">{error}</div>}
        {success && (
          <div className="alert success-alert">
            <p>{success}</p>
            <p className="invite-code">Tu código de invitación es: <strong>{invitationCode}</strong></p>
          </div>
        )}

        <button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white font-bold py-3.5 px-6 rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center space-x-2 cursor-pointer text-base" disabled={loading}>
          {loading ? 'Creando Nodo...' : 'Crear Nodo'}
        </button>
      </form>
    </div>
  );
};

export default CreateNodoForm;
