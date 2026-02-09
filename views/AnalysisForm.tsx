
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Ave, Analise, Alimentacao, TipoAgua, DiluicaoAgua, TempoAlteracao, CasoReferencia } from '../types';
import { analyzeBirdHealth } from '../geminiService';

interface Props {
  birds: Ave[];
  analyses?: Analise[];
  // Fix: Add expertCases to Props to match usage in App.tsx
  expertCases?: CasoReferencia[];
  onComplete: (analysis: Analise) => void;
}

const AnalysisForm: React.FC<Props> = ({ birds, analyses, expertCases, onComplete }) => {
  const { birdId, analysisId } = useParams();
  const navigate = useNavigate();
  const bird = birds.find(b => b.id === birdId);
  const existingAnalysis = analyses?.find(a => a.id === analysisId);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Analisando imagens...");
  const [consent, setConsent] = useState(false);

  const [formData, setFormData] = useState<Partial<Analise>>({
    id: analysisId || Math.random().toString(36).substr(2, 9),
    aveId: birdId,
    dataAnalise: new Date().toISOString(),
    sintomas: [],
    mudancaRecente: false,
    descricaoMudanca: '',
    descricaoEstadoGeral: '',
    usoMedicamento: false,
    nomeMedicamento: '',
    tempoMedicamento: '',
    usoSuplemento: [],
    alimentacaoPrincipal: 'Ração',
    verduras: [],
    frequenciaVerduras: '',
    legumes: [],
    frutas: [],
    tipoAgua: 'Natural',
    diluicaoAgua: 'Não sei',
    descricaoFezes: [],
    tempoAlteracao: 'Hoje',
    fotosFezes: [],
    fotoAve: undefined
  });

  useEffect(() => {
    if (existingAnalysis) {
      setFormData({ ...existingAnalysis });
      setConsent(true);
    }
  }, [existingAnalysis]);

  if (!bird) return <div className="p-6">Ave não encontrada.</div>;

  const handleCheckbox = (field: keyof Analise, value: string) => {
    const current = (formData[field] as string[]) || [];
    if (current.includes(value)) {
      setFormData({ ...formData, [field]: current.filter(v => v !== value) });
    } else {
      setFormData({ ...formData, [field]: [...current, value] });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const currentPhotos = [...(formData.fotosFezes || [])];
    const availableSlots = 10 - currentPhotos.length;
    const filesToAdd = Array.from(files).slice(0, availableSlots);

    filesToAdd.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          fotosFezes: [...(prev.fotosFezes || []), reader.result as string]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      fotosFezes: prev.fotosFezes?.filter((_, i) => i !== index)
    }));
  };

  const runAnalysis = async () => {
    if (!formData.fotosFezes || formData.fotosFezes.length === 0) {
      alert("Pelo menos uma foto clínica é obrigatória.");
      return;
    }
    setLoading(true);
    
    const messages = [
        "Sincronizando fotos anatômicas...",
        "Analisando porção fecal e uratos...",
        "Verificando sinais de 'Peito Seco'...",
        "Cruzando com literatura veterinária...",
        "Gerando resultado conclusivo..."
    ];
    let i = 0;
    const interval = setInterval(() => {
        i = (i + 1) % messages.length;
        setLoadingMessage(messages[i]);
    }, 2800);

    try {
      const fullAnalysis = { ...formData, dataAnalise: new Date().toISOString() } as Analise;
      // Fix: Pass expertCases to leverage historical clinical data during analysis
      const result = await analyzeBirdHealth(bird, fullAnalysis, expertCases);
      const updatedAnalysis = { ...fullAnalysis, resultado: result };
      onComplete(updatedAnalysis);
      clearInterval(interval);
      navigate(`/result/${updatedAnalysis.id}`);
    } catch (error) {
      console.error(error);
      clearInterval(interval);
      alert("Erro ao processar análise. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex space-x-1">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 w-8 rounded-full ${step >= i ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
          ))}
        </div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Etapa {step} de 3</span>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 space-y-8 text-center h-[60vh]">
            <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            <div>
                <h2 className="text-xl font-bold text-teal-800">{loadingMessage}</h2>
                <p className="text-gray-400 text-xs mt-2">Aguarde a análise multimodal completa.</p>
            </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {step === 1 && "Clínica e Comportamento"}
            {step === 2 && "Dieta e Manejo"}
            {step === 3 && "Registro Multimodal"}
          </h2>

          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Relato do Tutor</label>
                    <textarea
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none min-h-[100px]"
                        placeholder="Como a ave está se comportando? O que você notou de diferente?"
                        value={formData.descricaoEstadoGeral}
                        onChange={e => setFormData({ ...formData, descricaoEstadoGeral: e.target.value })}
                    />
                </div>
                <div>
                    <p className="block text-sm font-bold text-gray-700 mb-3">Sinais Clínicos</p>
                    <div className="grid grid-cols-2 gap-2">
                    {['Quieta/Triste', 'Encujada', 'Não come', 'Respiração ofegante', 'Asas caídas', 'Olhos irritados', 'Espirros', 'Sementes nas fezes', 'Peito Seco', 'Nenhuma'].map(s => (
                        <button
                        key={s}
                        onClick={() => handleCheckbox('sintomas', s)}
                        className={`p-3 text-[11px] rounded-xl border text-left transition-all ${formData.sintomas?.includes(s) ? 'bg-teal-600 border-teal-600 text-white font-bold' : 'bg-white border-gray-200 text-gray-600'}`}
                        >
                        {s}
                        </button>
                    ))}
                    </div>
                </div>
                <button onClick={() => setStep(2)} className="w-full bg-teal-600 text-white font-bold py-4 rounded-2xl shadow-lg mt-4">Próximo Passo</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Alimentação Base</label>
                    <div className="grid grid-cols-2 gap-2">
                        {['Sementes', 'Ração', 'Farinhada', 'Mista'].map(opt => (
                            <button
                                key={opt}
                                onClick={() => setFormData({...formData, alimentacaoPrincipal: opt as Alimentacao})}
                                className={`p-3 text-sm rounded-xl border ${formData.alimentacaoPrincipal === opt ? 'bg-teal-600 border-teal-600 text-white font-bold' : 'bg-white text-gray-500'}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Há quanto tempo há alteração?</label>
                    <select
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none"
                        value={formData.tempoAlteracao}
                        onChange={e => setFormData({ ...formData, tempoAlteracao: e.target.value as TempoAlteracao })}
                    >
                        {['Hoje', '2-3 dias', '4-7 dias', 'Mais de 7 dias'].map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
                <div className="flex space-x-3">
                    <button onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-500 font-bold py-4 rounded-2xl">Voltar</button>
                    <button onClick={() => setStep(3)} className="flex-1 bg-teal-600 text-white font-bold py-4 rounded-2xl">Fotos Clínicas</button>
                </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
                <div className="bg-blue-50 p-5 rounded-[24px] border border-blue-100">
                    <h4 className="text-blue-800 font-bold text-xs uppercase tracking-widest mb-3">Guia de Fotos para Diagnóstico Preciso</h4>
                    <div className="grid grid-cols-2 gap-3 text-[10px]">
                        <div className="bg-white p-2 rounded-lg border border-blue-200">
                            <span className="font-bold block text-blue-600">1. FEZES</span>
                            Papel toalha branco, luz natural, sem flash.
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-blue-200">
                            <span className="font-bold block text-blue-600">2. POSTURA</span>
                            Ave de lado no poleiro (mostrando asas e cauda).
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-blue-200">
                            <span className="font-bold block text-blue-600">3. OLHOS</span>
                            Close lateral para ver narinis e pálpebras.
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-blue-200">
                            <span className="font-bold block text-blue-600">4. PEITO/CLOACA</span>
                            Se possível, sopre as penas para ver a quilha e a cloaca.
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-bold text-gray-700">Fotos Clínicas ({formData.fotosFezes?.length}/10)</label>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {formData.fotosFezes?.map((pic, idx) => (
                            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200">
                                <img src={pic} className="w-full h-full object-cover" />
                                <button onClick={() => removePhoto(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        ))}
                        {(formData.fotosFezes?.length || 0) < 10 && (
                            <label className="aspect-square bg-teal-50 border-2 border-dashed border-teal-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-teal-100 transition">
                                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span className="text-[10px] font-bold text-teal-600 mt-1">ADICIONAR</span>
                                <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                            </label>
                        )}
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <label className="flex items-start space-x-3 cursor-pointer">
                        <input type="checkbox" className="mt-1 w-5 h-5 text-teal-600 rounded border-gray-300" checked={consent} onChange={e => setConsent(e.target.checked)} />
                        <span className="text-[11px] text-gray-500 leading-relaxed font-medium">
                            Entendo que as fotos de olhos, peito e cloaca auxiliam a IA a detectar padrões descritos na literatura veterinária (como Peito Seco e Mycoplasmose), mas <strong>não substituem</strong> o exame clínico presencial.
                        </span>
                    </label>
                </div>

                <div className="flex space-x-3">
                    <button onClick={() => setStep(2)} className="flex-1 bg-gray-100 text-gray-500 font-bold py-4 rounded-2xl">Voltar</button>
                    <button 
                        disabled={!consent || (formData.fotosFezes?.length || 0) === 0}
                        onClick={runAnalysis} 
                        className={`flex-[2] text-white font-bold py-4 rounded-2xl shadow-lg transition-all ${!consent || (formData.fotosFezes?.length || 0) === 0 ? 'bg-gray-300' : 'bg-teal-600 hover:bg-teal-700 active:scale-95'}`}
                    >
                        {analysisId ? "Atualizar Análise" : "Analisar com IA"}
                    </button>
                </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AnalysisForm;
