
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Ave, Analise } from '../types';

interface Props {
  birds: Ave[];
  analyses: Analise[];
}

const History: React.FC<Props> = ({ birds, analyses }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bird = birds.find(b => b.id === id);
  const birdAnalyses = analyses.filter(a => a.aveId === id).sort((a, b) => new Date(b.dataAnalise).getTime() - new Date(a.dataAnalise).getTime());

  if (!bird) return <div className="p-6">Ave não encontrada.</div>;

  return (
    <div className="p-6">
      <div className="bg-teal-700 text-white p-6 -mx-6 -mt-6 mb-6 rounded-b-[40px] shadow-lg">
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-3xl font-bold">{bird.nome}</h2>
                <p className="opacity-80">{bird.especie} • {bird.sexo}</p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Link 
                to={`/birds/edit/${bird.id}`}
                className="bg-white/20 p-2 rounded-xl text-xs backdrop-blur-md font-bold flex items-center space-x-1 hover:bg-white/30 transition"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                <span>Editar Ave</span>
              </Link>
              <div className="bg-white/10 p-2 rounded-xl text-[10px] backdrop-blur-md">
                  {bird.ambiente}
              </div>
            </div>
        </div>
        <button 
          onClick={() => navigate(`/analyze/${bird.id}`)}
          className="w-full bg-white text-teal-700 font-bold py-3 rounded-2xl shadow-xl mt-6 active:scale-95 transition"
        >
          + Nova Análise
        </button>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-4">Histórico de Análises</h3>

      {birdAnalyses.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          Nenhuma análise realizada ainda.
        </div>
      ) : (
        <div className="space-y-4">
          {birdAnalyses.map(ana => (
            <div 
              key={ana.id}
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    ana.resultado?.classificacao === 'Alerta' ? 'bg-red-500' :
                    ana.resultado?.classificacao === 'Moderada' ? 'bg-orange-500' :
                    ana.resultado?.classificacao === 'Normal' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <p className="font-bold text-gray-700">{ana.resultado?.classificacao || 'Processando...'}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{new Date(ana.dataAnalise).toLocaleDateString()} às {new Date(ana.dataAnalise).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Link to={`/analyze/${bird.id}/edit/${ana.id}`} className="text-gray-400 hover:text-teal-600 transition p-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </Link>
                </div>
              </div>
              
              <div className="flex space-x-2 border-t pt-3">
                {!ana.feedback && (
                   <Link to={`/feedback/${ana.id}`} className="text-[10px] bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full font-bold flex-1 text-center">
                      DAR FEEDBACK
                   </Link>
                )}
                <Link to={`/result/${ana.id}`} className="text-[10px] bg-teal-50 text-teal-600 px-3 py-1.5 rounded-full font-bold flex-1 text-center">
                    VER RESULTADO
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
