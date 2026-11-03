// Ajusta o conteúdo de data.js ao edital: reclassifica por matéria, remove o que está fora do escopo
// e acrescenta cartões/questões das matérias que o edital cobra.

(() => {
  const BASE = { cd: "e3", aud: "c5", afo: "b4", dadm: "b1", dconst: "c3", lgpd: "e2", disc: "disc" };
  const OUT = /extraordin|limite de pessoal|LRF|Modalidades da Lei 14\.133|Pregão|pregão|convite|orçamento fiscal|Estágios da despesa/;
  const route = (x, txt) => {
    if (/ETL|ELT|Lakehouse|Data Lake|Data Mesh|Jaro|Record Linkage/i.test(txt)) return "e2";
    if (/Acesso à Informação|LAI/.test(txt)) return "c2";
    if (/Art\. 20|revisão de decisões/.test(txt)) return "e4";
    if (/Fairness|fairness|SHAP|Overfitting|Precision|Recall|recall|acurácia/.test(txt)) return "e3";
    return BASE[x.s] || x.s;
  };
  const fix = (arr, key) => arr.filter(x => !OUT.test(x[key])).map(x => ({ ...x, s: route(x, x[key] + " " + (x.a || x.exp || "")) }));
  window.CARDS = fix(CARDS, "q");
  window.QUESTIONS = fix(QUESTIONS, "t");

  const C = [
    ["e1", "Valor-p", "Probabilidade de observar resultado tão extremo quanto o obtido SE a hipótese nula for verdadeira. NÃO é a probabilidade de H0 ser verdadeira."],
    ["e1", "Significância × relevância prática", "Com amostras enormes, efeitos minúsculos ficam 'significativos'. Avalie também o tamanho do efeito e o impacto real."],
    ["e1", "Erro tipo I × tipo II", "Tipo I: rejeitar H0 verdadeira (falso positivo, prob. α). Tipo II: não rejeitar H0 falsa (falso negativo, prob. β). Poder = 1 − β."],
    ["e1", "Intervalo de confiança 95%", "Se o procedimento fosse repetido muitas vezes, ~95% dos intervalos construídos conteriam o parâmetro verdadeiro."],
    ["e1", "Vazamento de informação (data leakage)", "Informação do teste/futuro entra no treino (ex.: normalizar antes de separar treino/teste). Superestima o desempenho."],
    ["e1", "Correlação × causalidade", "Correlação não implica causa: confundidores, causalidade reversa e coincidência. Em dados administrativos, cuidado com seleção e representatividade."],
    ["e1", "Padronização × normalização", "Padronização (z-score): média 0, desvio 1. Normalização min-max: reescala para [0,1]. Ambas devem ser ajustadas só no treino."],
    ["e2", "Normalização (1FN, 2FN, 3FN)", "Reduz redundância e anomalias de atualização. 1FN: valores atômicos. 2FN: sem dependência parcial da chave. 3FN: sem dependência transitiva."],
    ["e2", "Funções de janela (SQL)", "Calculam sobre um conjunto de linhas relacionadas SEM colapsá-las: ROW_NUMBER(), RANK(), SUM() OVER (PARTITION BY ... ORDER BY ...)."],
    ["e2", "WHERE × HAVING", "WHERE filtra linhas antes da agregação. HAVING filtra grupos depois do GROUP BY."],
    ["e2", "NULL em SQL", "NULL = desconhecido: comparações com = retornam desconhecido. Use IS NULL. COUNT(coluna) ignora nulos; COUNT(*) não."],
    ["e2", "Parquet", "Formato colunar, comprimido, com schema: ótimo para leitura analítica de poucas colunas; pior para escritas linha a linha."],
    ["e2", "Dimensões da qualidade de dados", "Completude, consistência, validade, unicidade, acurácia e atualidade."],
    ["e2", "Linhagem de dados", "Rastreia a origem e as transformações de um dado até o consumo – essencial para auditoria e confiança."],
    ["e2", "Skew (assimetria) em processamento distribuído", "Partições desbalanceadas: uma tarefa recebe muito mais dados e atrasa o job. Mitigação: repartição, salting, broadcast join."],
    ["e3", "Validação temporal", "Em séries/dados com tempo, treine no passado e teste no futuro. Validação cruzada aleatória gera vazamento temporal."],
    ["e3", "Calibração", "Escores de um modelo calibrado refletem probabilidades reais: dos casos com escore 0,8, ~80% são positivos."],
    ["e3", "Embeddings", "Vetores densos que representam significado; textos semanticamente próximos ficam próximos (similaridade do cosseno)."],
    ["e3", "Alucinação em LLMs", "Resposta fluente mas não sustentada por fontes. Mitigar: RAG com citação, verificação humana, avaliação sistemática."],
    ["e3", "Prompt injection", "Instruções maliciosas embutidas em conteúdo externo (páginas, documentos) que o agente lê e obedece. Mitigar: tratar conteúdo como dado, mínimo privilégio, confirmação humana."],
    ["e3", "Custo de FP × FN", "Em auditoria, FP gasta tempo da equipe; FN deixa fraude passar. O limiar do escore deve refletir esses custos."],
    ["e3", "PCA", "Redução de dimensionalidade linear: projeta nos componentes de maior variância. Sensível à escala – padronize antes."],
    ["e4", "Data drift × concept drift", "Data drift: muda a distribuição das entradas. Concept drift: muda a relação entrada→saída. Ambos exigem monitoramento e retreino."],
    ["e4", "Reprodutibilidade em MLOps", "Versionar código, dados, modelo e ambiente; registrar experimentos (parâmetros, métricas, sementes)."],
    ["e4", "Scrum × Kanban", "Scrum: sprints, papéis (PO, SM, time), eventos fixos. Kanban: fluxo contínuo, limite de trabalho em progresso (WIP)."],
    ["e4", "ETP e Termo de Referência", "ETP: estudo técnico preliminar – avalia necessidade, alternativas e viabilidade. TR: define o objeto, requisitos, fiscalização e pagamento por entregas verificáveis."],
    ["e4", "Vendor lock-in", "Dependência tecnológica de um fornecedor. Mitigar: portabilidade, padrões abertos, acesso a dados e modelos, plano de saída contratual."],
    ["c1", "Segregação de funções", "Atividades incompatíveis (autorizar, executar, registrar, conferir) ficam com pessoas diferentes para reduzir risco de fraude e erro."],
    ["c1", "Risco inerente × residual", "Inerente: sem controles. Residual: o que sobra depois dos controles."],
    ["c1", "Programa de integridade: existência × efetividade", "Ter documentos ≠ implementar ≠ funcionar. A efetividade se mostra em resultados, uso dos canais e apuração."],
    ["c2", "Transparência ativa × passiva", "Ativa: o órgão divulga por iniciativa própria. Passiva: responde a pedidos do cidadão."],
    ["c2", "Reidentificação", "Combinar dados 'anonimizados' com outras bases pode identificar pessoas. Avalie risco antes de publicar dados abertos."],
    ["c3", "Indício × falha de gestão × irregularidade × responsabilidade", "Indício é sinal inicial. Falha de gestão ≠ ilícito. Irregularidade exige violação de norma. Responsabilidade exige apuração com devido processo."],
    ["c3", "PAD × PAR", "PAD: processo administrativo disciplinar (agentes públicos). PAR: processo administrativo de responsabilização (pessoas jurídicas, Lei Anticorrupção)."],
    ["c3", "Procedimento investigativo × processo sancionador", "Investigativo reúne informações (sem acusação formal). Sancionador exige contraditório e ampla defesa e pode aplicar penalidade."],
    ["c4", "Falácia ecológica", "Atribuir a indivíduos conclusões tiradas de dados agregados por grupo/região."],
    ["c4", "Baixa ocorrência × baixa detecção", "Poucas denúncias/sanções podem refletir pouca corrupção OU pouca capacidade de detecção (subnotificação)."],
    ["c5", "Ciclo da auditoria", "Planejamento → execução → comunicação de resultados → monitoramento."],
    ["c5", "Sinal de risco × evidência × conclusão", "Um alerta (sinal) exige aprofundamento. Só evidência suficiente e adequada sustenta conclusão; a afirmação deve ser proporcional a ela."],
    ["c5", "Avaliação × consultoria × apuração", "Avaliação: opinião independente. Consultoria: aconselhamento sem assumir decisões do gestor. Apuração: fatos com indício de irregularidade."],
    ["b3", "Impedimento × suspeição", "Impedimento: situações objetivas (interesse direto, parentesco, ter atuado). Suspeição: amizade íntima ou inimizade notória. Ambos exigem comunicação e abstenção."],
    ["b1", "Captura", "Quando decisões públicas passam a favorecer interesses privados específicos em vez do interesse público."],
    ["b4", "Ciclo de políticas públicas", "Problema → agenda → formulação → implementação → monitoramento e avaliação."],
  ];
  const Q = [
    ["e1", "Um valor-p igual a 0,03 indica que a probabilidade de a hipótese nula ser verdadeira é de 3%.", false, "Errado. O valor-p é a probabilidade dos dados (ou mais extremos) sob H0, e não a probabilidade de H0."],
    ["e1", "Normalizar toda a base antes de separá-la em treino e teste pode causar vazamento de informação.", true, "Correto. Parâmetros de escala devem ser estimados só no treino."],
    ["e1", "Em amostras muito grandes, diferenças estatisticamente significativas são sempre relevantes na prática.", false, "Errado. Significância não implica relevância prática; avalie o tamanho do efeito."],
    ["e1", "A correlação elevada entre duas variáveis é suficiente para se concluir que uma causa a outra.", false, "Errado. Pode haver confundidores ou causalidade reversa."],
    ["e1", "O erro tipo I consiste em rejeitar a hipótese nula quando ela é verdadeira.", true, "Correto."],
    ["e2", "Em SQL, a cláusula HAVING filtra grupos após a agregação, enquanto WHERE filtra linhas antes dela.", true, "Correto."],
    ["e2", "Funções de janela em SQL colapsam as linhas em uma única linha por grupo, tal como GROUP BY.", false, "Errado. Funções de janela mantêm as linhas individuais."],
    ["e2", "Em SQL, a expressão coluna = NULL retorna verdadeiro quando a coluna não possui valor.", false, "Errado. Deve-se usar IS NULL."],
    ["e2", "O formato Parquet é colunar e adequado a consultas analíticas que leem poucas colunas de grandes volumes de dados.", true, "Correto."],
    ["e2", "A linhagem de dados permite rastrear a origem e as transformações aplicadas a um conjunto de dados.", true, "Correto."],
    ["e2", "A anonimização de dados elimina qualquer risco de reidentificação, mesmo quando há cruzamento com outras bases.", false, "Errado. O cruzamento com outras bases pode reidentificar titulares."],
    ["e2", "No Data Mesh, a responsabilidade pelos dados é centralizada em uma única equipe de plataforma, que atende todos os domínios.", false, "Errado. Data Mesh é descentralizado: domínios são donos de produtos de dados, com governança federada."],
    ["e3", "Em validação de modelos com dados temporais, a validação cruzada aleatória é sempre mais adequada que a validação temporal.", false, "Errado. A aleatória pode vazar informação do futuro para o treino."],
    ["e3", "Quando o custo de um falso negativo é muito maior que o de um falso positivo, pode ser adequado reduzir o limiar de decisão e priorizar a sensibilidade.", true, "Correto."],
    ["e3", "Prompt injection pode ocorrer quando um agente de IA lê conteúdo externo contendo instruções maliciosas e passa a segui-las.", true, "Correto."],
    ["e3", "Embeddings permitem medir similaridade semântica entre textos por meio da proximidade entre vetores.", true, "Correto."],
    ["e3", "Alucinações em LLMs deixam de ocorrer quando o modelo é combinado com RAG.", false, "Errado. O RAG reduz, mas não elimina; a verificação das fontes continua necessária."],
    ["e3", "O PCA é uma técnica de aprendizado supervisionado que exige rótulos para encontrar os componentes principais.", false, "Errado. PCA é não supervisionado."],
    ["e4", "Data drift ocorre quando a distribuição dos dados de entrada em produção se altera em relação à do treinamento.", true, "Correto."],
    ["e4", "Em MLOps, versionar somente o código-fonte basta para garantir a reprodutibilidade de um modelo.", false, "Errado. É preciso versionar também dados, modelo, ambiente e experimentos."],
    ["e4", "No Kanban, o fluxo é contínuo e há limite de trabalho em andamento (WIP), ao passo que o Scrum organiza o trabalho em sprints.", true, "Correto."],
    ["e4", "Na contratação de solução de IA, o plano de saída e a portabilidade de dados e modelos ajudam a reduzir a dependência tecnológica.", true, "Correto."],
    ["e4", "Decisões automatizadas que afetam direitos dispensam mecanismos de revisão humana e contestação quando o modelo tem alta acurácia.", false, "Errado. Revisão humana e contestação são salvaguardas independentes da acurácia."],
    ["c1", "A segregação de funções busca reduzir o risco de fraude e erro ao distribuir atividades incompatíveis entre pessoas diferentes.", true, "Correto."],
    ["c1", "A existência documental de um programa de integridade comprova sua efetividade.", false, "Errado. Existência ≠ implementação ≠ efetividade."],
    ["c1", "Poucas denúncias registradas significam necessariamente baixa ocorrência de irregularidades.", false, "Errado. Pode haver subnotificação ou baixa detecção."],
    ["c2", "A transparência ativa ocorre quando o órgão divulga informações por iniciativa própria, sem necessidade de pedido.", true, "Correto."],
    ["c3", "Falha de gestão e irregularidade são conceitos equivalentes para fins de responsabilização.", false, "Errado. Responsabilização exige apuração; nem toda falha de gestão é ilícito."],
    ["c3", "O processo administrativo de responsabilização (PAR) destina-se à apuração de responsabilidade de pessoas jurídicas.", true, "Correto (Lei 12.846/2013)."],
    ["c3", "Em processo sancionador, devem ser assegurados contraditório e ampla defesa.", true, "Correto."],
    ["c4", "A falácia ecológica consiste em atribuir a indivíduos características observadas em dados agregados de um grupo.", true, "Correto."],
    ["c5", "Um sinal de risco identificado por análise de dados constitui, por si só, evidência suficiente para concluir pela existência de irregularidade.", false, "Errado. É preciso aprofundamento e evidência suficiente e adequada."],
    ["c5", "Na consultoria, o auditor assume as decisões de gestão sobre as quais aconselha.", false, "Errado. As decisões e responsabilidades permanecem com o gestor."],
    ["b3", "Havendo impedimento ou suspeição, o servidor deve comunicar o fato e abster-se de atuar no processo.", true, "Correto (Lei 9.784/1999)."],
    ["b4", "O planejamento do ciclo de políticas públicas inclui monitoramento e avaliação.", true, "Correto."],
  ];
  const n0 = CARDS.length, q0 = QUESTIONS.length;
  C.forEach(([s, q, a], i) => CARDS.push({ id: "n" + i, s, q, a }));
  Q.forEach(([s, t, gab, exp], i) => QUESTIONS.push({ id: "m" + i, s, t, gab, exp }));

  // Discursiva: Q1 (30 linhas, complementares) e Q2 (60 linhas, situação-problema de Ciência de Dados)
  ESSAYS.forEach(e => { if (e.linhas === 60) e.titulo = "Q2 · " + e.titulo; });
  const e5 = ESSAYS.find(e => e.id === "e5");
  e5.titulo = "Q1 · Controle interno e inteligência de dados contra a corrupção";
  ESSAYS.push(
    { id: "e6", titulo: "Q1 · Integridade pública: existência × efetividade", linhas: 30,
      enunciado: "Discorra sobre a diferença entre a existência documental de um programa de integridade, sua implementação e sua efetividade, indicando como o controle pode avaliá-las.",
      quesitos: ["Define os três conceitos", "Cita evidências de efetividade (uso de canais, apurações, resultados)", "Relaciona baixa ocorrência × baixa detecção", "Propõe papel do controle e recomendações"] },
    { id: "e7", titulo: "Q1 · Transparência e proteção de dados pessoais", linhas: 30,
      enunciado: "Discorra sobre a compatibilização entre acesso à informação e proteção de dados pessoais, abordando anonimização, tarjamento e risco de reidentificação.",
      quesitos: ["Publicidade como regra, sigilo como exceção motivada", "Diferença entre dado pessoal e sensível", "Finalidade, necessidade e salvaguardas", "Anonimização, tarjamento e reidentificação", "Conclusão equilibrada"] },
    { id: "e8", titulo: "Q1 · Uso responsável de IA na administração pública", linhas: 30,
      enunciado: "Discorra sobre os benefícios e riscos do uso de IA em auditorias e serviços públicos, destacando revisão humana, vieses e contestação.",
      quesitos: ["Possibilidades (classificação, busca, síntese)", "Erros, alucinações e vieses", "Supervisão, rastreabilidade e contestação", "IA × solução simples", "Conclusão"] },
  );
})();
