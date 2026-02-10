
import { GoogleGenAI, Type } from "@google/genai";
import { Analise, ResultadoIA, Ave, CasoReferencia } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeBirdHealth(
  ave: Ave, 
  analise: Analise, 
  casosReferencia: CasoReferencia[] = []
): Promise<ResultadoIA> {
  
  const contextoCasos = casosReferencia.length > 0 
    ? `BASE DE DADOS CLÍNICOS (Casos de Referência):\n${casosReferencia.map(c => `- Espécie: ${c.especie} | Sintomas: ${c.sintomas} | Diagnóstico Confirmado: ${c.analiseTecnica}`).join('\n')}`
    : "Use sua base de conhecimento nativa para ornitopatologia.";

  const prompt = `
    Você é um Especialista em Medicina de Aves Selvagens e Exóticas. 
    Analise os dados e as imagens fornecidas (bico, unhas, ambiente e fezes) para gerar um relatório de saúde preventivo.

    DADOS DO PACIENTE:
    Nome: ${ave.nome}, Espécie: ${ave.especie}, Idade: ${ave.idade}, Sexo: ${ave.sexo}, Ambiente: ${ave.ambiente}.

    HISTÓRICO ATUAL:
    Sintomas: ${analise.sintomas.join(', ')}
    Relato do tutor: ${analise.descricaoEstadoGeral || 'N/A'}
    Dieta: ${analise.alimentacaoPrincipal}

    ${contextoCasos}

    INSTRUÇÕES DE PENSAMENTO CLÍNICO:
    - Analise rigorosamente as fotos em busca de anormalidades na queratina do bico.
    - Avalie o comprimento das unhas e o desgaste natural.
    - Identifique sinais de manejo inadequado (higiene da gaiola).
    - Interprete a consistência e cor das fezes/uratos.

    OBRIGATÓRIO: Incluir orientações sobre Banho de Sol e Manutenção de Penas.

    Responda EXCLUSIVAMENTE em formato JSON.
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
    model: 'gemini-3-pro-preview', // Pro para tarefas complexas
    contents: { parts },
    config: {
      thinkingConfig: { thinkingBudget: 32768 }, // Max thinking para raciocínio clínico
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
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    analiseId: analise.id,
    dataResultado: new Date().toISOString(),
    ...data
  };
}
