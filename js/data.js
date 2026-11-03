// Conteúdo do app. Edite à vontade: tudo aqui é só dado.
// IMPORTANTE: confira os tópicos com o edital oficial (Cebraspe/CGU) – a lista abaixo é uma base de partida.

// Revisão em caixas (Leitner): front/back
window.CARDS = [
  { s: "cd", q: "O que é Isolation Forest?", a: "Algoritmo NÃO supervisionado de detecção de anomalias. Isola pontos com cortes aleatórios em árvores; anomalias exigem MENOS cortes (caminhos mais curtos)." },
  { s: "cd", q: "Precision × Recall", a: "Precision = VP/(VP+FP): dos que apontei como fraude, quantos eram. Recall = VP/(VP+FN): das fraudes reais, quantas achei." },
  { s: "cd", q: "Por que acurácia engana em fraude?", a: "Classes muito desbalanceadas: prever 'não fraude' sempre já dá ~99% de acurácia. Use precision, recall, F1, AUC-PR." },
  { s: "cd", q: "F1-score", a: "Média harmônica entre precision e recall: 2·P·R/(P+R)." },
  { s: "cd", q: "Overfitting", a: "Modelo decora o treino e generaliza mal. Combate: validação cruzada, regularização, mais dados, simplificar o modelo, early stopping." },
  { s: "cd", q: "Valores SHAP", a: "Baseados em valores de Shapley (teoria dos jogos): atribuem a cada variável sua contribuição para a predição individual. Base de XAI." },
  { s: "cd", q: "XGBoost", a: "Implementação otimizada de gradient boosting: árvores construídas em sequência, cada uma corrigindo o erro da anterior." },
  { s: "cd", q: "Bagging × Boosting", a: "Bagging: modelos em paralelo em amostras bootstrap (Random Forest) – reduz variância. Boosting: modelos em sequência corrigindo erros – reduz viés." },
  { s: "cd", q: "Data Lake × Data Warehouse × Lakehouse", a: "Lake: dados brutos, schema-on-read. DW: dados estruturados, schema-on-write. Lakehouse: flexibilidade do lake + governança/transações do DW." },
  { s: "cd", q: "ETL × ELT", a: "ETL: transforma ANTES de carregar. ELT: carrega bruto e transforma DEPOIS no destino (comum em nuvem/lakehouse)." },
  { s: "cd", q: "Data Mesh", a: "Arquitetura descentralizada: dados como produto, domínios donos dos dados, plataforma self-service e governança federada." },
  { s: "cd", q: "Record Linkage / Jaro-Winkler", a: "Record linkage: ligar registros de bases diferentes sobre a mesma entidade. Jaro-Winkler: similaridade entre strings (privilegia prefixo comum), útil para nomes." },
  { s: "cd", q: "Função de ativação", a: "Introduz não linearidade na rede neural (ReLU, sigmoide, tanh, softmax). Sem ela, a rede seria equivalente a uma transformação linear." },
  { s: "cd", q: "Mecanismo de atenção (Transformers)", a: "Permite ponderar a relevância de cada token em relação aos demais (self-attention), em paralelo. Base dos LLMs." },
  { s: "cd", q: "RAG", a: "Retrieval-Augmented Generation: busca documentos relevantes e os injeta no prompt do LLM para respostas fundamentadas e menos alucinadas." },
  { s: "cd", q: "K-Means × DBSCAN", a: "K-Means: k definido a priori, clusters esféricos, sensível a outliers. DBSCAN: baseado em densidade, não exige k, identifica ruído/outliers." },
  { s: "cd", q: "Fairness algorítmica", a: "Avaliar se o modelo trata grupos (gênero, raça, região) de forma equitativa: paridade demográfica, igualdade de oportunidades, etc." },
  { s: "aud", q: "Estrutura de um achado de auditoria", a: "Condição (o que é), Critério (o que deveria ser), Causa (por que ocorreu) e Efeito (consequência)." },
  { s: "aud", q: "Evidência de auditoria", a: "Deve ser suficiente (quantidade) e adequada (relevante e confiável) para sustentar as conclusões do auditor." },
  { s: "aud", q: "Modelo das Três Linhas (IIA 2020)", a: "1ª: gestão operacional (donos do risco). 2ª: funções de gerenciamento de riscos/conformidade. 3ª: auditoria interna, independente." },
  { s: "aud", q: "Controle interno × externo (CF)", a: "Externo: Congresso com auxílio do TCU (art. 70-71). Interno: mantido por cada Poder (art. 74). Controle interno que detecta irregularidade deve dar ciência ao TCU." },
  { s: "afo", q: "PPA, LDO e LOA", a: "PPA: 4 anos, diretrizes e metas (começa no 2º ano de um mandato e termina no 1º do seguinte). LDO: metas e prioridades do ano, orienta a LOA. LOA: orçamento anual." },
  { s: "afo", q: "Estágios da despesa", a: "Empenho → Liquidação → Pagamento." },
  { s: "afo", q: "Crédito extraordinário", a: "Para despesas imprevisíveis e urgentes (guerra, comoção interna, calamidade). Aberto por medida provisória." },
  { s: "afo", q: "LRF – limite de pessoal (União)", a: "50% da RCL para a União (40,9% Executivo, 2,5% Legislativo, 6% Judiciário, 0,6% MPU)." },
  { s: "dadm", q: "Princípios do art. 37 CF (LIMPE)", a: "Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência." },
  { s: "dadm", q: "Modalidades da Lei 14.133/21", a: "Pregão, concorrência, concurso, leilão e diálogo competitivo. Convite e tomada de preços foram extintos." },
  { s: "dadm", q: "Pregão", a: "Modalidade obrigatória para bens e serviços comuns; critério de julgamento menor preço ou maior desconto." },
  { s: "dadm", q: "LAI – prazos", a: "Resposta ao pedido: 20 dias, prorrogáveis por mais 10. Sigilo: ultrassecreta 25 anos, secreta 15, reservada 5 (a ultrassecreta é prorrogável uma vez)." },
  { s: "dconst", q: "Art. 74 §1º CF", a: "Responsáveis pelo controle interno que tiverem ciência de irregularidade ou ilegalidade devem dar ciência ao TCU, sob pena de responsabilidade solidária." },
  { s: "lgpd", q: "Art. 20 LGPD", a: "Direito do titular de solicitar a revisão de decisões tomadas unicamente com base em tratamento automatizado de dados que afetem seus interesses." },
  { s: "lgpd", q: "Anonimização × pseudonimização", a: "Anonimização: o dado perde a possibilidade de associação a um indivíduo (não é dado pessoal, salvo reversão com esforço razoável). Pseudonimização: associação só com informação adicional mantida separada – continua dado pessoal." },
  { s: "lgpd", q: "Dados sensíveis (art. 11)", a: "Origem racial/étnica, convicção religiosa, opinião política, saúde, vida sexual, dado genético ou biométrico etc. Hipóteses de tratamento mais restritas." },
  { s: "disc", q: "Estrutura da peça técnica", a: "1) Introdução (problema/escopo) 2) Metodologia e coleta (bases, tratamento) 3) Desenvolvimento técnico (modelo e justificativa) 4) Achados e recomendações." },
].map((c, i) => ({ id: "c" + i, ...c }));

// Questões no estilo Cebraspe (Certo/Errado). gab: true = Certo.
window.QUESTIONS = [
  { s: "cd", t: "O Isolation Forest é um algoritmo não supervisionado de detecção de anomalias que isola observações por meio de particionamentos aleatórios; observações anômalas tendem a ser isoladas com menos partições.", gab: true, exp: "Correto. Caminhos mais curtos na árvore = maior escore de anomalia." },
  { s: "cd", t: "O K-Means é um algoritmo supervisionado de classificação que depende de rótulos previamente atribuídos às observações.", gab: false, exp: "Errado. K-Means é de agrupamento (clustering), não supervisionado." },
  { s: "cd", t: "Em bases de fraude, com poucas ocorrências positivas, a acurácia é a métrica mais adequada para avaliar o desempenho do classificador.", gab: false, exp: "Errado. Com classes desbalanceadas a acurácia é enganosa; prefira precision, recall, F1 ou AUC-PR." },
  { s: "cd", t: "Os valores SHAP, fundamentados nos valores de Shapley da teoria dos jogos, permitem atribuir a cada variável sua contribuição para a predição de um modelo, auxiliando a explicabilidade.", gab: true, exp: "Correto." },
  { s: "cd", t: "Overfitting ocorre quando o modelo apresenta desempenho ruim no conjunto de treinamento, mas desempenho excelente em dados novos.", gab: false, exp: "Errado. É o contrário: bom no treino, ruim em dados novos." },
  { s: "cd", t: "A métrica recall corresponde à razão entre verdadeiros positivos e a soma de verdadeiros positivos e falsos positivos.", gab: false, exp: "Errado. Essa é a precision. Recall = VP / (VP + FN)." },
  { s: "cd", t: "A similaridade de Jaro-Winkler é utilizada para comparar cadeias de caracteres e pode apoiar o casamento de registros (record linkage) com erros de digitação em nomes.", gab: true, exp: "Correto." },
  { s: "cd", t: "Na abordagem ELT, os dados são transformados integralmente antes de serem carregados no destino.", gab: false, exp: "Errado. Em ELT carrega-se primeiro e transforma-se depois, no destino." },
  { s: "cd", t: "XGBoost é uma implementação de gradient boosting que constrói árvores de decisão sequencialmente, cada uma buscando corrigir os erros das anteriores.", gab: true, exp: "Correto." },
  { s: "cd", t: "Em redes neurais, as funções de ativação não lineares permitem que a rede aprenda relações complexas entre entradas e saídas.", gab: true, exp: "Correto." },
  { s: "cd", t: "O mecanismo de atenção dos modelos Transformer processa os tokens estritamente em sequência, um de cada vez, como as redes recorrentes tradicionais.", gab: false, exp: "Errado. A self-attention permite processamento paralelo e relação entre todos os tokens." },
  { s: "cd", t: "Uma arquitetura Lakehouse busca combinar a flexibilidade de armazenamento de um data lake com recursos de governança e transações típicos de um data warehouse.", gab: true, exp: "Correto." },
  { s: "aud", t: "Um achado de auditoria completo é composto por condição, critério, causa e efeito.", gab: true, exp: "Correto." },
  { s: "aud", t: "Para fundamentar as conclusões do auditor, as evidências devem ser suficientes e adequadas, o que envolve relevância e confiabilidade.", gab: true, exp: "Correto." },
  { s: "aud", t: "No Modelo das Três Linhas, a auditoria interna integra a primeira linha, juntamente com a gestão operacional.", gab: false, exp: "Errado. A auditoria interna é a terceira linha." },
  { s: "aud", t: "A atividade de auditoria interna governamental deve ser exercida com independência em relação às unidades auditadas.", gab: true, exp: "Correto. Independência e objetividade são fundamentais." },
  { s: "afo", t: "O plano plurianual tem vigência de quatro anos, iniciando-se no segundo ano do mandato do chefe do Executivo e encerrando-se no primeiro ano do mandato seguinte.", gab: true, exp: "Correto." },
  { s: "afo", t: "Os créditos extraordinários destinam-se a despesas previsíveis, mas sem dotação orçamentária suficiente.", gab: false, exp: "Errado. Extraordinário = despesa imprevisível e urgente. Sem dotação suficiente = crédito suplementar." },
  { s: "afo", t: "A lei orçamentária anual compreende o orçamento fiscal, o da seguridade social e o de investimento das empresas estatais.", gab: true, exp: "Correto (art. 165, §5º, CF)." },
  { s: "afo", t: "A ordem dos estágios da despesa pública é: liquidação, empenho e pagamento.", gab: false, exp: "Errado. Empenho, liquidação e pagamento." },
  { s: "dadm", t: "A Lei nº 14.133/2021 manteve as modalidades convite e tomada de preços, ao lado de pregão e concorrência.", gab: false, exp: "Errado. Convite e tomada de preços foram extintos." },
  { s: "dadm", t: "O pregão é a modalidade obrigatória para a aquisição de bens e serviços comuns.", gab: true, exp: "Correto (art. 29, Lei 14.133/21)." },
  { s: "dadm", t: "Segundo a Lei de Acesso à Informação, o órgão deve responder ao pedido de acesso em até 20 dias, prorrogáveis por mais 10 mediante justificativa expressa.", gab: true, exp: "Correto." },
  { s: "dadm", t: "Os princípios expressos no art. 37 da Constituição são legalidade, impessoalidade, moralidade, publicidade e eficiência.", gab: true, exp: "Correto." },
  { s: "dconst", t: "O controle externo é exercido pelo Congresso Nacional com auxílio do Tribunal de Contas da União, enquanto cada Poder deve manter sistema de controle interno.", gab: true, exp: "Correto (arts. 70 e 74)." },
  { s: "dconst", t: "Os responsáveis pelo controle interno que tomarem ciência de irregularidade devem dar ciência ao TCU, sob pena de responsabilidade solidária.", gab: true, exp: "Correto (art. 74, §1º)." },
  { s: "lgpd", t: "A LGPD assegura ao titular o direito de solicitar a revisão de decisões tomadas unicamente com base em tratamento automatizado que afetem seus interesses.", gab: true, exp: "Correto (art. 20)." },
  { s: "lgpd", t: "Dado anonimizado é, em qualquer circunstância, considerado dado pessoal pela LGPD.", gab: false, exp: "Errado. Em regra não é dado pessoal, salvo se o processo puder ser revertido com esforços razoáveis." },
  { s: "lgpd", t: "A pseudonimização elimina por completo a natureza de dado pessoal da informação tratada.", gab: false, exp: "Errado. Pseudonimizado ainda é dado pessoal, pois a re-associação é possível com informação adicional mantida separadamente." },
].map((q, i) => ({ id: "q" + i, ...q }));

// Temas de peça técnica (padrão Cebraspe) com checklist de quesitos
window.ESSAYS = [
  {
    id: "e1", titulo: "Fraude em licitações eletrônicas (Lei 14.133/21)", linhas: 60,
    enunciado: "Há indícios de cartel e direcionamento em pregão eletrônico federal de grande valor. Como Auditor de TI – Ciência de Dados, redija peça técnica ao Diretor de Auditoria propondo abordagem analítica.",
    quesitos: ["Bases de dados (Compras.gov.br, CNPJ/RFB, quadro societário)", "Cruzamento de vínculos societários e endereços", "Metadados/IPs das propostas", "PLN para similaridade textual entre propostas", "Recomendações (representação, apuração de responsabilidade)"],
  },
  {
    id: "e2", titulo: "Auditoria algorítmica e governança de IA", linhas: 60,
    enunciado: "Um ministério usa IA para conceder benefício social automaticamente; há suspeita de viés. Elabore peça técnica sobre a auditoria do sistema.",
    quesitos: ["Explicabilidade (XAI, SHAP/LIME)", "Métricas de fairness por grupo", "Conformidade com a LGPD (art. 20)", "Governança: documentação, supervisão humana, monitoramento de drift", "Recomendações institucionais"],
  },
  {
    id: "e3", titulo: "Anomalias em transferências voluntárias e emendas", linhas: 60,
    enunciado: "Municípios pequenos apresentaram picos abruptos de repasses federais. Proponha abordagem de ciência de dados para a fiscalização.",
    quesitos: ["Detecção de outliers (Isolation Forest, K-Means)", "Variáveis de comparação (população, PIB, histórico)", "Análise de grafos (ente–parlamentar–empresa)", "Triangulação de recursos", "Recomendações"],
  },
  {
    id: "e4", titulo: "Pagamentos indevidos em programa social", linhas: 60,
    enunciado: "Suspeita de pagamento de benefício a alta renda e servidores. Proponha arquitetura de dados, modelo preditivo, salvaguardas LGPD e recomendações.",
    quesitos: ["Arquitetura (Lakehouse, ingestão, record linkage)", "Bases: CadÚnico, RAIS/CAGED, Receita, folhas de servidores", "Modelo: Isolation Forest + classificador supervisionado", "Métrica (precision) e justificativa", "LGPD: base legal, pseudonimização, revisão humana, logs", "Recomendações (contraditório, painel, corregedorias)"],
  },
  {
    id: "e5", titulo: "Redação (30 linhas) – tema livre de controle", linhas: 30,
    enunciado: "Disserte sobre o papel do controle interno e da inteligência de dados no combate à corrupção e na melhoria da gestão pública.",
    quesitos: ["Tese clara na introdução", "Argumentos com dados/exemplos", "Contrapontos e riscos (privacidade, vieses)", "Conclusão com proposta de intervenção"],
  },
];

