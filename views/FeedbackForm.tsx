
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Analise, Evolucao, Feedback } from '../types';

interface Props {
  analyses: Analise[];
  onUpdate: (analysis: Analise) => void;
}

const FeedbackForm: React.FC<Props> = ({ analyses, onUpdate }) => {
  const { analysisId } = useParams();
  const navigate = useNavigate();
  const analysis = analyses.find(a => a.id === analysisId);

  const [evolucao, setEvolucao] = useState<Evolucao>('Igual');
  const [obs, setObs] = useState('');
  const [diag, setDiag] = useState('');

  if (!analysis) return <div className="p-6">Análise não encontrada.</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fb: Feedback = {
      id: Math.random().toString(36).substr(2, 9),
      analiseId: analysis.id,
      evolucao,
      diagnosticoVet: diag,
      observacoes: obs,
      dataFeedback: new Date().toISOString()
    };
    onUpdate({ ...analysis, feedback: fb });
    navigate(`/birds/${analysis.aveId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Como está sua ave agora?</h2>
      <p className="text-gray-500 text-sm mb-6">Seu feedback ajuda a melhorar nossas orientações e treinar nossa IA.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Evolução do quadro</label>
          <div className="grid grid-cols-2 gap-2">
            {['Melhorou', 'Igual', 'Piorou', 'Procurei veterinário'].map(ev => (
              <button
                type="button"
                key={ev}
                onClick={() => setEvolucao(ev as Evolucao)}
                className={`p-3 text-sm rounded-xl border transition ${evolucao === ev ? 'bg-teal-50 border-teal-500 text-teal-700 font-bold' : 'bg-white border-gray-200 text-gray-500'}`}
              >
                {ev}
              </button>
            ))}
          </div>
        </div>

        {evolucao === 'Procurei veterinário' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qual foi o diagnóstico do Vet?</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-100 rounded-xl"
              placeholder="Ex: Coccidiose, Giárdia..."
              value={diag}
              onChange={e => setDiag(e.target.value)}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Observações adicionais</label>
          <textarea
            className="w-full p-3 bg-gray-100 rounded-xl"
            rows={4}
            placeholder="Como as fezes mudaram? A ave voltou a comer?"
            value={obs}
            onChange={e => setObs(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl shadow-lg"
        >
          Enviar Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
