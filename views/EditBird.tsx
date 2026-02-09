
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Ave, IdadeAproximada, Sexo, Ambiente } from '../types';

interface Props {
  birds: Ave[];
  onUpdate: (bird: Ave) => void;
}

const EditBird: React.FC<Props> = ({ birds, onUpdate }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const bird = birds.find(b => b.id === id);

  const [formData, setFormData] = useState({
    nome: '',
    especie: '',
    idade: 'Adulto' as IdadeAproximada,
    sexo: 'Não sei' as Sexo,
    ambiente: 'Gaiola' as Ambiente
  });

  useEffect(() => {
    if (bird) {
      setFormData({
        nome: bird.nome,
        especie: bird.especie,
        idade: bird.idade,
        sexo: bird.sexo,
        ambiente: bird.ambiente
      });
    }
  }, [bird]);

  if (!bird) return <div className="p-6">Ave não encontrada.</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBird: Ave = {
      ...bird,
      ...formData
    };
    onUpdate(updatedBird);
    navigate(`/birds/${bird.id}`);
  };

  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <button onClick={() => navigate(-1)} className="text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Editar Informações</h2>
      </div>
      
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
          className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl shadow-lg mt-6 active:scale-95 transition"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default EditBird;
