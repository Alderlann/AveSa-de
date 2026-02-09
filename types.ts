
export type IdadeAproximada = 'Filhote' | 'Jovem' | 'Adulto' | 'Idoso' | 'Não sei';
export type Sexo = 'Macho' | 'Fêmea' | 'Não sei';
export type Ambiente = 'Gaiola' | 'Viveiro' | 'Solto';
export type Alimentacao = 'Sementes' | 'Ração' | 'Farinhada' | 'Mista';
export type TipoAgua = 'Natural' | 'Vitamina' | 'Medicamento';
export type DiluicaoAgua = 'Rótulo' | 'Forte' | 'Fraca' | 'Não sei';
export type TempoAlteracao = 'Hoje' | '2-3 dias' | '4-7 dias' | 'Mais de 7 dias';
export type ClassificacaoRisco = 'Normal' | 'Alteração leve' | 'Moderada' | 'Alerta';
export type Evolucao = 'Melhorou' | 'Igual' | 'Piorou' | 'Procurei veterinário';

export interface Ave {
  id: string;
  nome: string;
  especie: string;
  idade: IdadeAproximada;
  sexo: Sexo;
  ambiente: Ambiente;
  dataCadastro: string;
}

export interface Analise {
  id: string;
  aveId: string;
  dataAnalise: string;
  sintomas: string[];
  mudancaRecente: boolean;
  descricaoMudanca?: string;
  descricaoEstadoGeral?: string;
  usoMedicamento: boolean;
  nomeMedicamento?: string;
  tempoMedicamento?: string;
  usoSuplemento: string[];
  alimentacaoPrincipal: Alimentacao;
  verduras: string[];
  frequenciaVerduras: string;
  legumes: string[];
  frutas: string[];
  tipoAgua: TipoAgua;
  diluicaoAgua: DiluicaoAgua;
  descricaoFezes: string[];
  tempoAlteracao: TempoAlteracao;
  fotosFezes: string[]; 
  fotoAve?: string;
  resultado?: ResultadoIA;
  feedback?: Feedback;
}

export interface ResultadoIA {
  id: string;
  analiseId: string;
  classificacao: ClassificacaoRisco;
  padraoObservado: string;
  possiveisCausas: string;
  orientacoesIniciais: string;
  observacoes4872h: string;
  alertaVeterinario: string;
  dataResultado: string;
  // Novos campos solicitados
  analiseBico?: string;
  analiseUnhas?: string;
  analiseHigiene?: string;
  orientacoesPerformance?: string; // Banho de sol, bico, penas
}

export interface Feedback {
  id: string;
  analiseId: string;
  evolucao: Evolucao;
  diagnosticoVet?: string;
  observacoes: string;
  dataFeedback: string;
}

export interface CasoReferencia {
  id: string;
  profissionalId: string;
  especie: string;
  sintomas: string;
  analiseTecnica: string;
  tratamentoAplicado: string;
  fotos: string[];
  dataCadastro: string;
}

export interface Profissional {
  id: string;
  nome: string;
  email: string;
  crmv?: string;
}
