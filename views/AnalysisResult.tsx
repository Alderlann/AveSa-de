
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
  const sources = (res as any).sources || [];

  const getRiskDetails = (risk: ClassificacaoRisco) => {
    switch (risk) {
      case 'Normal': return { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: '✅' };
      case 'Alteração leve': return { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', icon: '🔍' };
      case 'Moderada': return { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', icon: '⚠️' };
      case 'Alerta': return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: '🚨' };
      default: return { color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', icon: '❓' };
    }
  };

  const rd = getRiskDetails(res.classificacao);

  return (
    <div className="p-6 space-y-6 animate-fade-in pb-12">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Análise Indicativa IA</h2>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">{new Date(res.dataResultado).toLocaleDateString()} • {new Date(res.dataResultado).toLocaleTimeString()}</p>
      </div>

      <div className={`p-6 rounded-[32px] border-2 text-center shadow-sm ${rd.bg} ${rd.border}`}>
        <span className="text-[40px] block mb-2">{rd.icon}</span>
        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400">Risco Estimado</span>
        <h3 className={`text-3xl font-black mt-1 ${rd.color}`}>{res.classificacao}</h3>
      </div>

      <div className="space-y-4">
        {/* Análise Fecal e Clínica */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-5">
            <section>
                <div className="flex items-center space-x-2 mb-2">
                    <div className="w-1.5 h-6 bg-teal-500 rounded-full"></div>
                    <h4 className="font-bold text-gray-800 text-sm">Achados e Referências</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{res.padraoObservado}</p>
            </section>
            
            <section>
                <div className="flex items-center space-x-2 mb-2">
                    <div className="w-1.5 h-6 bg-teal-500 rounded-full"></div>
                    <h4 className="font-bold text-gray-800 text-sm">Análise de Causalidade</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{res.possiveisCausas}</p>
            </section>
        </div>

        {/* Análise Anatômica e Manejo */}
        <div className="bg-teal-900 text-white rounded-[32px] p-6 shadow-xl space-y-6">
            <div className="flex items-center space-x-2 border-b border-teal-800 pb-3">
                <span className="text-xl">🩺</span>
                <h4 className="font-bold text-sm uppercase tracking-widest">Avaliação de Manejo</h4>
            </div>

            <div className="grid gap-5">
                <div>
                    <span className="text-[10px] font-black uppercase text-teal-400">Bico e Ramfoteca</span>
                    <p className="text-xs mt-1 leading-relaxed opacity-90">{res.analiseBico}</p>
                </div>
                <div>
                    <span className="text-[10px] font-black uppercase text-teal-400">Unhas e Articulações</span>
                    <p className="text-xs mt-1 leading-relaxed opacity-90">{res.analiseUnhas}</p>
                </div>
                <div>
                    <span className="text-[10px] font-black uppercase text-teal-400">Higiene do Recinto</span>
                    <p className="text-xs mt-1 leading-relaxed opacity-90">{res.analiseHigiene}</p>
                </div>
            </div>
        </div>

        {/* Orientações de Performance */}
        <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6">
            <div className="flex items-center space-x-2 mb-3">
                <span className="text-lg">☀️</span>
                <h4 className="font-bold text-amber-900 text-sm">Performance e Bem-estar</h4>
            </div>
            <p className="text-amber-800 text-xs leading-relaxed font-medium">{res.orientacoesPerformance}</p>
        </div>

        {sources.length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
            <h4 className="font-bold text-gray-800 text-xs uppercase mb-3 tracking-wide flex items-center">
                <span className="mr-2">📚</span> Embasamento Científico
            </h4>
            <div className="space-y-2">
              {sources.map((chunk: any, i: number) => {
                const link = chunk.web?.uri || chunk.maps?.uri;
                const title = chunk.web?.title || chunk.maps?.title;
                if (!link) return null;
                return (
                  <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="block text-[10px] text-teal-700 underline truncate">
                    {title || link}
                  </a>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-red-600 rounded-[32px] p-6 text-white shadow-lg shadow-red-100">
            <h4 className="font-black text-xs uppercase mb-2 tracking-widest opacity-80 flex items-center">
                <span className="mr-2">🚨</span> Alerta Veterinário
            </h4>
            <p className="text-sm font-bold leading-relaxed">{res.alertaVeterinario}</p>
        </div>
      </div>

      <div className="bg-gray-100 rounded-2xl p-4 text-[11px] text-gray-500 leading-normal border border-gray-200 italic">
        <strong>Nota:</strong> Esta IA utiliza dados comparativos de casos reais submetidos por especialistas para aprimorar sua precisão. No entanto, o diagnóstico presencial é insubstituível.
      </div>

      <div className="pt-2">
        <button
          onClick={() => navigate(`/birds/${analysis.aveId}`)}
          className="w-full bg-teal-800 text-white font-bold py-5 rounded-[24px] shadow-xl active:scale-95 transition uppercase tracking-widest text-sm"
        >
          Finalizar Análise
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;
