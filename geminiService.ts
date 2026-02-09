
import { GoogleGenAI, Type } from "@google/genai";
import { Analise, ResultadoIA, Ave, CasoReferencia } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeBirdHealth(
  ave: Ave, 
  analise: Analise, 
  casosReferencia: CasoReferencia[] = []
): Promise<ResultadoIA & { sources?: any[] }> {
  
  // Resumo de casos de referência para contexto (simulação de aprendizado)
  const contextoCasos = casosReferencia.length > 0 
    ? `CONTEXTO DE CASOS REAIS VETERINÁRIOS:\n${casosReferencia.map(c => `- ${c.especie}: ${c.sintomas} | Analise: ${c.analiseTecnica}`).join('\n')}`
    : "";

  const prompt = `
    Você é um sistema especialista de elite em Medicina Veterinária de Aves (Ornitopatologia). 
    Sua tarefa é realizar uma ANALISE MULTIMODAL COMPLETA integrando fotos clínicas, ambiente e histórico.

    DADOS DA AVE:
    Nome: ${ave.nome}, Espécie: ${ave.especie}, Idade: ${ave.idade}, Sexo: ${ave.sexo}, Ambiente: ${ave.ambiente}.

    CONTEXTO CLÍNICO:
    - Relato do Tutor: ${analise.descricaoEstadoGeral || 'Não fornecido'}
    - Sintomas: ${analise.sintomas.join(', ')}
    - Dieta: ${analise.alimentacaoPrincipal}

    ${contextoCasos}

    DIRETRIZES DE ANÁLISE VISUAL (ALÉM DAS FEZES):
    1. BICO: Verifique desalinhamento (ramfoteca), crescimento excessivo, descamação ou fendas.
    2. UNHAS: Avalie o comprimento e curvatura. Unhas muito longas podem indicar falta de desgaste natural ou problemas hepáticos crônicos.
    3. HIGIENE DA GAIOLA: Observe o fundo da gaiola nas fotos. Verifique acúmulo de dejetos antigos, restos de comida ou umidade excessiva que favorece fungos/bactérias.
    4. PERFORMANCE E PENAS: Avalie a qualidade das penas (estresse, linhas de crescimento).

    ORIENTAÇÕES OBRIGATÓRIAS:
    - Banho de Sol: Explique a importância para a síntese de Vitamina D3 e saúde do bico/penas.
    - Higiene: Como manter o ambiente para evitar reinfecções.

    FORMATO DE RESPOSTA: JSON estrito.
  `;

  const parts: any[] = [{ text: prompt }];

  analise.fotosFezes.forEach((base64) => {
    parts.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64.split(',')[1]
      }
    });
  });

  if (analise.fotoAve) {
    parts.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: analise.fotoAve.split(',')[1]
      }
    });
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { parts },
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          classificacao: { type: Type.STRING },
          padraoObservado: { type: Type.STRING },
          possiveisCausas: { type: Type.STRING },
          analiseBico: { type: Type.STRING },
          analiseUnhas: { type: Type.STRING },
          analiseHigiene: { type: Type.STRING },
          orientacoesPerformance: { type: Type.STRING },
          orientacoesIniciais: { type: Type.STRING },
          observacoes4872h: { type: Type.STRING },
          alertaVeterinario: { type: Type.STRING }
        },
        required: [
          "classificacao", "padraoObservado", "possiveisCausas", 
          "analiseBico", "analiseUnhas", "analiseHigiene", 
          "orientacoesPerformance", "orientacoesIniciais", 
          "observacoes4872h", "alertaVeterinario"
        ]
      }
    }
  });

  const data = JSON.parse(response.text || '{}');
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    analiseId: analise.id,
    dataResultado: new Date().toISOString(),
    ...data,
    sources: groundingChunks
  };
}
