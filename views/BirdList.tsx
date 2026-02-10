
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Ave } from '../types';

interface Props {
  birds: Ave[];
}

const BirdList: React.FC<Props> = ({ birds }) => {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-8 animate-slide-up">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h2 className="text-3xl font-[900] text-slate-900 tracking-tight">Suas Aves</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{birds.length} Pacientes</p>
        </div>
        <Link to="/birds/add" className="bg-teal-600 text-white p-4 rounded-2xl shadow-xl shadow-teal-100 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
        </Link>
      </div>

      {birds.length === 0 ? (
        <div className="bg-white rounded-[40px] p-12 text-center border-2 border-dashed border-slate-200 flex flex-col items-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg>
          </div>
          <p className="text-slate-400 font-bold text-sm mb-6">Nenhuma ave cadastrada.</p>
          <button 
            onClick={() => navigate('/birds/add')}
            className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest"
          >
            Cadastrar Pet
          </button>
        </div>
      ) : (
        <div className="grid gap-5">
          {birds.map(bird => (
            <div 
              key={bird.id}
              onClick={() => navigate(`/birds/${bird.id}`)}
              className="bg-white p-5 rounded-[32px] shadow-sm border border-slate-100 flex items-center space-x-5 cursor-pointer hover:shadow-xl hover:border-teal-200 transition-all active:scale-[0.98]"
            >
              <div className="w-14 h-14 bg-gradient-to-tr from-teal-50 to-teal-100 rounded-2xl flex items-center justify-center text-teal-600 shadow-inner">
                <span className="text-xl font-black">{bird.nome.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-slate-800 text-lg leading-tight">{bird.nome}</h3>
                <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter bg-slate-50 px-2 py-0.5 rounded-md">{bird.especie}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-[10px] font-bold text-teal-600/70">{bird.idade}</span>
                </div>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl">
                  <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BirdList;
