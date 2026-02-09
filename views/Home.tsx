
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-10 animate-fade-in pb-12">
      <div className="text-center space-y-6 pt-8">
        <div className="relative inline-block">
            <div className="w-28 h-28 bg-teal-50 rounded-[35%] flex items-center justify-center mx-auto rotate-12 absolute inset-0"></div>
            <div className="w-28 h-28 bg-teal-600 rounded-[35%] flex items-center justify-center mx-auto relative z-10 shadow-xl">
                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            </div>
        </div>
        <div className="space-y-2">
            <h1 className="text-4xl font-black text-teal-800 tracking-tight">AviSaúde</h1>
            <p className="text-gray-500 font-medium text-sm leading-relaxed max-w-[240px] mx-auto">
              Monitoramento preventivo e suporte à saúde de aves domésticas com IA.
            </p>
        </div>
      </div>

      <div className="grid gap-4">
          {[
              { title: "Cadastro Ágil", text: "Gerencie o histórico de saúde de todas as suas aves em um só lugar.", icon: "🐦" },
              { title: "Análise de Fezes", text: "Envie fotos e receba um indicativo de alterações digestivas via IA.", icon: "📸" },
              { title: "Escala de Risco", text: "Saiba quando é o momento crítico de procurar um veterinário.", icon: "🚨" }
          ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl flex items-start space-x-4 shadow-sm border border-gray-100">
                  <div className="text-2xl mt-1">{item.icon}</div>
                  <div>
                      <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.text}</p>
                  </div>
              </div>
          ))}
      </div>

      <div className="bg-orange-50 border-2 border-orange-100 p-5 rounded-[24px]">
        <div className="flex space-x-3">
          <div className="text-orange-500 text-xl font-bold">⚠️</div>
          <div className="space-y-1">
            <h3 className="text-xs font-black text-orange-800 uppercase tracking-widest">Aviso Legal</h3>
            <p className="text-[11px] text-orange-700 leading-normal font-medium">
              Esta análise é <strong>exclusivamente indicativa</strong> e não substitui a avaliação clínica. O app não prescreve medicamentos. Em emergências, procure um veterinário imediatamente.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/birds')}
        className="w-full bg-teal-600 text-white font-black py-5 rounded-[24px] shadow-2xl shadow-teal-200 hover:bg-teal-700 transition active:scale-95 flex items-center justify-center space-x-3 uppercase tracking-widest text-sm"
      >
        <span>Acessar o App</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>

      <div className="text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">v1.2.0 • Pilot Program</p>
      </div>
    </div>
  );
};

export default Home;
