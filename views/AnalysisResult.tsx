
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Analise, ClassificacaoRisco } from '../types';

interface Props {
  analyses: Analise[];
}

const AnalysisResult: React.FC<Props> = ({ analyses }) => {
  const { analysisId } = useParams();
  const navigate = useNavigate();
  const analysis = analyses.find(a => a.id === analysisId);

  if (!analysis || !analysis.resultado) return <div className="p-6">Resultado não encontrado.</div>;

  const res = analysis.resultado;

  const getRiskStyles = (risk: ClassificacaoRisco) => {
    switch (risk) {
      case 'Normal': return { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: '💎' };
      case 'Alteração leve': return { color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200', icon: '🔍' };
      case 'Moderada': return { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: '⚠️' };
      case 'Alerta': return { color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', icon: '🚨' };
      default: return { color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', icon: '❓' };
    }
  };

  const rs = getRiskStyles(res.classificacao);

  return (
    <div className="px-6 py-8 space-y-8 animate-slide-up">
      <div className="text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Relatório IA Pro</span>
        <h2 className="text-2xl font-black text-slate-900 mt-2">Diagnóstico Preventivo</h2>
      </div>

      <div className={`${rs.bg} ${rs.border} border-2 rounded-[40px] p-8 text-center shadow-xl shadow-slate-100 relative overflow-hidden`}>
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
        <span className="text-5xl block mb-4">{rs.icon}</span>
        <h3 className={`text-4xl font-black ${rs.color} tracking-tight`}>{res.classificacao}</h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{new Date(res.dataResultado).toLocaleDateString()} • {new Date(res.dataResultado).toLocaleTimeString()}</p>
      </div>

      <div className="space-y-6">
        <section className="bg-white rounded-[32px] p-7 border border-slate-100 shadow-sm space-y-6">
            <div>
                <h4 className="text-xs font-black text-teal-600 uppercase tracking-widest mb-3 flex items-center">
                    <span className="w-1.5 h-4 bg-teal-500 rounded-full mr-2"></span> Padronização Clínica
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">{res.padraoObservado}</p>
            </div>
            
            <div className="pt-6 border-t border-slate-50">
                <h4 className="text-xs font-black text-teal-600 uppercase tracking-widest mb-3 flex items-center">
                    <span className="w-1.5 h-4 bg-teal-500 rounded-full mr-2"></span> Causalidade Provável
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">{res.possiveisCausas}</p>
            </div>
        </section>

        <section className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
            <h4 className="text-teal-400 font-black text-[10px] uppercase tracking-[0.2em] mb-6">Manejo & Anatomia</h4>
            <div className="space-y-6">
                <div className="flex space-x-4">
                    <span className="text-xl">🦜</span>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">Análise de Bico</p>
                        <p className="text-xs mt-1 leading-relaxed text-slate-200">{res.analiseBico}</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <span className="text-xl">💅</span>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">Estado das Unhas</p>
                        <p className="text-xs mt-1 leading-relaxed text-slate-200">{res.analiseUnhas}</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <span className="text-xl">🧼</span>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">Higiene Ambiental</p>
                        <p className="text-xs mt-1 leading-relaxed text-slate-200">{res.analiseHigiene}</p>
                    </div>
                </div>
            </div>
        </section>

        <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-[32px] p-8 text-white shadow-xl shadow-teal-100">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-teal-200 mb-3 flex items-center">
                <span className="mr-2">☀️</span> Performance & Banho de Sol
            </h4>
            <p className="text-sm font-bold leading-relaxed">{res.orientacoesPerformance}</p>
        </div>

        <div className="bg-rose-600 rounded-[32px] p-8 text-white shadow-xl shadow-rose-200">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-200 mb-3">Protocolo de Emergência</h4>
            <p className="text-sm font-black leading-relaxed">{res.alertaVeterinario}</p>
        </div>
      </div>

      <div className="bg-slate-100 rounded-[32px] p-6 text-[10px] text-slate-400 font-bold leading-relaxed border border-slate-200 text-center uppercase tracking-wider">
        Aviso: Este relatório é gerado por IA com Thinking Budget estendido e serve apenas como guia preventivo. Consulte sempre um médico veterinário.
      </div>

      <button
        onClick={() => navigate(`/birds/${analysis.aveId}`)}
        className="w-full bg-slate-900 text-white font-black py-5 rounded-[28px] shadow-2xl shadow-slate-300 active:scale-95 transition-all uppercase tracking-widest text-xs"
      >
        Concluir e Salvar
      </button>
    </div>
  );
};

export default AnalysisResult;
