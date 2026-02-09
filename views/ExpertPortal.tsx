
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Profissional, CasoReferencia } from '../types';

interface Props {
  profissional: Profissional | null;
  cases: CasoReferencia[];
}

const ExpertPortal: React.FC<Props> = ({ profissional, cases }) => {
  const navigate = useNavigate();

  if (!profissional) {
    return (
        <div className="p-12 text-center space-y-4">
            <p className="text-gray-500">Acesso negado.</p>
            <Link to="/expert/login" className="text-teal-600 font-bold underline">Fazer Login</Link>
        </div>
    );
  }

  const myCases = cases.filter(c => c.profissionalId === profissional.id);

  return (
    <div className="p-6">
      <div className="bg-teal-900 text-white p-6 -mx-6 -mt-6 mb-6 rounded-b-[40px] shadow-lg">
        <h2 className="text-2xl font-black">Portal do Especialista</h2>
        <p className="text-teal-200 text-sm mt-1">{profissional.nome} | {profissional.crmv}</p>
        
        <button 
          onClick={() => navigate('/expert/submit')}
          className="w-full bg-white text-teal-900 font-bold py-3 rounded-2xl mt-6 shadow-xl active:scale-95 transition"
        >
          + Adicionar Caso de Referência
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl">
            <h4 className="text-amber-800 font-bold text-xs uppercase mb-2">Treinamento da IA</h4>
            <p className="text-amber-700 text-[11px] leading-relaxed">
                Suas contribuições ajudam a IA a comparar fotos reais de usuários com casos veterinários diagnosticados, melhorando a precisão das orientações preventivas.
            </p>
        </div>

        <h3 className="font-bold text-gray-800">Meus Casos Enviados ({myCases.length})</h3>
        
        {myCases.length === 0 ? (
            <p className="text-center py-12 text-gray-400 text-sm italic">Você ainda não submeteu nenhum caso clínico.</p>
        ) : (
            <div className="space-y-3">
                {myCases.map(c => (
                    <div key={c.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
                        <div>
                            <p className="font-bold text-gray-800">{c.especie}</p>
                            <p className="text-xs text-gray-500">{new Date(c.dataCadastro).toLocaleDateString()}</p>
                        </div>
                        <div className="text-[10px] bg-teal-50 text-teal-600 px-2 py-1 rounded-full font-bold">VET VETTED</div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default ExpertPortal;
