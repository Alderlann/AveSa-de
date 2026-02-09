
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Profissional, CasoReferencia } from '../types';

interface Props {
  profissional: Profissional | null;
  onAdd: (caso: CasoReferencia) => void;
}

const ExpertSubmitCase: React.FC<Props> = ({ profissional, onAdd }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    especie: '',
    sintomas: '',
    analiseTecnica: '',
    tratamentoAplicado: '',
    fotos: [] as string[]
  });

  if (!profissional) return <div className="p-6">Acesso negado.</div>;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, fotos: [...prev.fotos, reader.result as string] }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCase: CasoReferencia = {
      id: Math.random().toString(36).substr(2, 9),
      profissionalId: profissional.id,
      dataCadastro: new Date().toISOString(),
      ...formData
    };
    onAdd(newCase);
    navigate('/expert/portal');
  };

  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <button onClick={() => navigate(-1)} className="text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-2xl font-black text-gray-800">Novo Caso Clínico</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase">Espécie</label>
          <input required type="text" className="w-full p-4 bg-gray-100 rounded-2xl outline-none" value={formData.especie} onChange={e => setFormData({...formData, especie: e.target.value})} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase">Descrição dos Sintomas</label>
          <textarea required className="w-full p-4 bg-gray-100 rounded-2xl outline-none" rows={3} value={formData.sintomas} onChange={e => setFormData({...formData, sintomas: e.target.value})} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase">Análise Técnica / Diagnóstico</label>
          <textarea required className="w-full p-4 bg-gray-100 rounded-2xl outline-none" rows={3} value={formData.analiseTecnica} onChange={e => setFormData({...formData, analiseTecnica: e.target.value})} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase">Tratamento Realizado</label>
          <textarea required className="w-full p-4 bg-gray-100 rounded-2xl outline-none" rows={3} value={formData.tratamentoAplicado} onChange={e => setFormData({...formData, tratamentoAplicado: e.target.value})} />
        </div>
        
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Fotos Clínicas de Referência</label>
          <div className="grid grid-cols-4 gap-2">
            {formData.fotos.map((f, i) => (
                <img key={i} src={f} className="w-full aspect-square object-cover rounded-lg" />
            ))}
            <label className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer">
                <span className="text-2xl text-gray-400">+</span>
                <input type="file" multiple className="hidden" onChange={handlePhotoUpload} />
            </label>
          </div>
        </div>

        <button type="submit" className="w-full bg-teal-800 text-white font-bold py-4 rounded-2xl shadow-xl">
          Submeter para Base de Dados
        </button>
      </form>
    </div>
  );
};

export default ExpertSubmitCase;
