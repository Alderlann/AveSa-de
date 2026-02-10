
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-8 space-y-10 animate-slide-up">
      <div className="text-center space-y-6">
        <div className="relative inline-block">
            <div className="w-24 h-24 bg-teal-100 rounded-[35%] flex items-center justify-center mx-auto rotate-12 absolute inset-0 opacity-50 blur-xl animate-pulse"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-teal-600 to-teal-800 rounded-[35%] flex items-center justify-center mx-auto relative z-10 shadow-xl shadow-teal-200">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
            </div>
        </div>
        <div className="space-y-2">
            <h1 className="text-4xl font-[900] text-slate-900 tracking-tight leading-tight">Cuidando de<br/><span className="text-teal-600">cada voo.</span></h1>
            <p className="text-slate-500 text-sm max-w-[280px] mx-auto font-medium leading-relaxed">
              Monitore a saúde das suas aves com o poder da Inteligência Ornitológica avançada.
            </p>
        </div>
      </div>

      <div className="grid gap-4">
        <button
            onClick={() => navigate('/birds')}
            className="w-full bg-slate-900 text-white font-bold py-5 rounded-[28px] shadow-2xl shadow-slate-300 active:scale-[0.98] transition-all flex items-center justify-center space-x-3"
        >
            <span className="text-sm tracking-wide uppercase">Começar Agora</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </button>
        
        <button
            onClick={() => navigate('/expert/login')}
            className="w-full glass text-slate-700 font-bold py-5 rounded-[28px] active:scale-[0.98] transition-all flex items-center justify-center space-x-3"
        >
            <span className="text-sm tracking-wide uppercase">Área do Especialista</span>
        </button>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-[32px] border border-amber-100/50 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200/20 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
          <h3 className="text-amber-900 font-extrabold text-sm mb-4 flex items-center">
              <span className="bg-amber-200/50 p-1 rounded-lg mr-2">✨</span> 
              Destaques da IA
          </h3>
          <ul className="text-amber-800 text-[11px] space-y-3 font-semibold leading-tight">
              <li className="flex items-start"><span className="mr-2">🌱</span> Análise Multimodal de Penas e Bico</li>
              <li className="flex items-start"><span className="mr-2">🔎</span> Diagnóstico Preventivo Profundo</li>
              <li className="flex items-start"><span className="mr-2">☀️</span> Consultoria de Manejo e Banho de Sol</li>
          </ul>
      </div>
    </div>
  );
};

export default Home;
