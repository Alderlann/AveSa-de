
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ave, IdadeAproximada, Sexo, Ambiente } from '../types';

interface Props {
  onAdd: (bird: Ave) => void;
}

const AddBird: React.FC<Props> = ({ onAdd }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    especie: '',
    idade: 'Adulto' as IdadeAproximada,
    sexo: 'Não sei' as Sexo,
    ambiente: 'Gaiola' as Ambiente
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBird: Ave = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      dataCadastro: new Date().toISOString()
    };
    onAdd(newBird);
    navigate('/birds');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Nova Ave</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Ave</label>
          <input
            required
            type="text"
            className="w-full p-3 bg-gray-100 rounded-xl border-transparent focus:bg-white focus:border-teal-500 focus:ring-0 transition"
            placeholder="Ex: Louro"
            value={formData.nome}
            onChange={e => setFormData({ ...formData, nome: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Espécie</label>
          <input
            required
            type="text"
            className="w-full p-3 bg-gray-100 rounded-xl border-transparent focus:bg-white focus:border-teal-500 focus:ring-0 transition"
            placeholder="Ex: Calopsita"
            value={formData.especie}
            onChange={e => setFormData({ ...formData, especie: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
            <select
              className="w-full p-3 bg-gray-100 rounded-xl"
              value={formData.idade}
              onChange={e => setFormData({ ...formData, idade: e.target.value as IdadeAproximada })}
            >
              {['Filhote', 'Jovem', 'Adulto', 'Idoso', 'Não sei'].map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
            <select
              className="w-full p-3 bg-gray-100 rounded-xl"
              value={formData.sexo}
              onChange={e => setFormData({ ...formData, sexo: e.target.value as Sexo })}
            >
              {['Macho', 'Fêmea', 'Não sei'].map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ambiente</label>
          <select
            className="w-full p-3 bg-gray-100 rounded-xl"
            value={formData.ambiente}
            onChange={e => setFormData({ ...formData, ambiente: e.target.value as Ambiente })}
          >
            {['Gaiola', 'Viveiro', 'Solto'].map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl shadow-lg mt-6"
        >
          Salvar Ave
        </button>
      </form>
    </div>
  );
};

export default AddBird;
