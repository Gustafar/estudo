// Estrutura extraída do Edital nº 1 – CGU – AFFC, de 8/10/2026 (item 15 e itens 7, 8 e 9).
// Cargo 2: Auditor Federal de Finanças e Controle – TI / Ciência de Dados.

window.EXAM = {
  nome: "CGU 2026 · Auditor Federal de Finanças e Controle",
  especialidade: "TI – Ciência de Dados",
  // O cronograma do edital (Anexo I) tem as datas embaralhadas na extração do PDF:
  // 13/12/2026 é o que consta no seu material. Confirme no Anexo I.
  data: "2026-12-13T08:00:00-03:00",
  banca: "Cebraspe",
};

window.PROVAS = [
  { n: "P1 · Básicos", itens: 40, pts: "±1 por item", min: "mín. 8 pts" },
  { n: "P2 · Complementares", itens: 40, pts: "±1 por item", min: "mín. 12 pts" },
  { n: "P3 · Específicos", itens: 90, pts: "±2 por item", min: "mín. 54 pts" },
  { n: "P4 · Discursiva", itens: "2 questões", pts: "30 + 70 pts", min: "mín. 50 pts" },
];

window.GROUPS = { b: "P1 · Conhecimentos básicos", c: "P2 · Conhecimentos complementares", e: "P3 · Específicos (Ciência de Dados)", d: "P4 · Discursiva" };

window.SUBJECTS = [
  { id: "b1", g: "b", nome: "Estado, Democracia, Direitos e Ciência Política", cor: "#4da3ff", icone: "🏛️" },
  { id: "b2", g: "b", nome: "Sociedade Brasileira e Desigualdades", cor: "#38bdf8", icone: "👥" },
  { id: "b3", g: "b", nome: "Ética Pública e Responsabilidade Profissional", cor: "#818cf8", icone: "🤝" },
  { id: "b4", g: "b", nome: "Administração Pública e Políticas Públicas", cor: "#22d3ee", icone: "🏢" },
  { id: "c1", g: "c", nome: "Governança, Riscos e Integridade", cor: "#f5a524", icone: "🛡️" },
  { id: "c2", g: "c", nome: "Transparência, Ouvidoria e Participação Social", cor: "#fb923c", icone: "🔎" },
  { id: "c3", g: "c", nome: "Direito Público Aplicado, Controle e Responsabilização", cor: "#ff6b8b", icone: "⚖️" },
  { id: "c4", g: "c", nome: "Evidências, Dados e IA (fundamentos)", cor: "#a78bfa", icone: "📊" },
  { id: "c5", g: "c", nome: "Auditoria Governamental e Atuação da CGU", cor: "#18c5a3", icone: "🔍" },
  { id: "e1", g: "e", nome: "Estatística, Programação e Análise de Dados", cor: "#7c5cff", icone: "📈" },
  { id: "e2", g: "e", nome: "Engenharia, Arquitetura e Governança de Dados", cor: "#6d4aff", icone: "🗄️" },
  { id: "e3", g: "e", nome: "Aprendizado de Máquina e IA", cor: "#c026d3", icone: "🧠" },
  { id: "e4", g: "e", nome: "Operação, Governança e Gestão de Soluções de Dados e IA", cor: "#e11d8c", icone: "⚙️" },
  { id: "disc", g: "d", nome: "Discursiva", cor: "#f97316", icone: "✍️" },
];

window.TOPICS = {
  b1: [
    "Estado e legitimidade: autoridade, poder, interesse público, pluralismo",
    "Democracia e representação; relações entre Executivo, Legislativo e Judiciário; controles recíprocos",
    "Federalismo e capacidades estatais; discricionariedade e implementação de direitos",
    "Ordem constitucional: fundamentos, direitos fundamentais, devido processo, princípios da administração pública",
    "Valor público e controle (interno, externo e social)",
    "Corrupção como fenômeno político e social; corrupção × falha de gestão × conflito de interesses; clientelismo, patronagem, nepotismo e captura",
    "Mecanismos de reprodução e captura: assimetrias, principal-agente, ação coletiva",
    "Consequências e respostas à corrupção: prevenção, detecção, responsabilização e reparação",
    "Estado e modelos de desenvolvimento econômico; empresas estatais",
  ],
  b2: [
    "Fundamentos sociológicos: instituições, estratificação, mobilidade, desigualdades",
    "Formação social e cidadania no Brasil",
    "População, território e trabalho: demografia, desigualdades regionais, informalidade",
    "Diversidade e acesso a direitos: étnico-raciais, gênero, PcD, povos tradicionais, interseccionalidade",
    "Desenvolvimento e realidade brasileira: pobreza, proteção social, educação, saúde, clima",
  ],
  b3: [
    "Fundamentos da ética pública e deveres profissionais",
    "Valores e deveres de conduta ética da CGU",
    "Conflito de interesses: Lei 12.813/2013 (arts. 3º a 5º, 8º e 10)",
    "Impedimento e suspeição: Lei 9.784/1999 (arts. 18 a 21)",
    "Relações de trabalho: assédio, discriminação, não retaliação",
    "Integridade como responsabilidade institucional",
  ],
  b4: [
    "Organização administrativa: direta e indireta, descentralização e desconcentração",
    "Modelos de administração: burocracia, gestão por resultados, governança",
    "Políticas públicas: ciclo, instrumentos, monitoramento e avaliação",
    "Planejamento e orçamento: PPA, LDO e LOA; receita e despesa (nível conceitual)",
    "Serviços e transformação digital; automação e IA na administração",
  ],
  c1: [
    "Governança: direção, gestão, controle e prestação de contas",
    "Riscos e controles: risco, causa, consequência, segregação de funções, risco residual",
    "Integridade pública: programas, liderança, canais de relato",
    "Integridade privada: programas, diligência sobre terceiros, existência × implementação × efetividade",
    "Prevenção e melhoria institucional; baixa ocorrência × baixa detecção",
  ],
  c2: [
    "Acesso à informação: transparência ativa e passiva; sigilo; informação classificada, pessoal e documento preparatório",
    "Transparência × proteção de dados: dados pessoais e sensíveis, tarjamento, anonimização, reidentificação",
    "Ouvidoria: manifestações, proteção da identidade, relato × apuração × decisão",
    "Participação e controle social; subnotificação",
    "Dados abertos e Portal da Transparência; papel da CGU",
    "Integridade da informação: desinformação, fato × alegação × interpretação",
  ],
  c3: [
    "Decisão administrativa: competência, finalidade, motivação, proporcionalidade, segurança jurídica",
    "Processo e garantias: devido processo, contraditório, ampla defesa, imparcialidade",
    "Procedimento investigativo × processo sancionador",
    "Controle interno, externo e social; inserção da CGU; relação com TCU e Congresso",
    "Avaliar a gestão × apurar fatos × aplicar sanções",
    "Indício, falha de gestão, irregularidade e responsabilidade",
    "Responsabilização de agentes e de pessoas jurídicas: PAD, PAR, acordo de leniência",
  ],
  c4: [
    "Pergunta, fontes e evidências; dado × evidência × interpretação × juízo de valor",
    "Leitura de tabelas, gráficos, proporções, taxas; denominadores e comparabilidade",
    "Indicadores de percepção, experiência, denúncias, detecção e sanções; subnotificação",
    "Associação × causalidade; falácia ecológica; viés de confirmação; falsos positivos e negativos",
    "Integridade da evidência; proteção de entrevistados, participantes e denunciantes",
    "Uso responsável de IA: IA × solução simples, revisão humana, vieses, contestação",
  ],
  c5: [
    "Propósito da auditoria: governança, riscos, controles e resultados",
    "Avaliação e consultoria; apuração de atos e fatos; três formas de atuação da SFC",
    "Independência, objetividade, ceticismo; Modelo das Três Linhas",
    "Ciclo do trabalho: planejamento, execução, comunicação e monitoramento",
    "Priorização por risco, materialidade e relevância",
    "Evidência: suficiência, adequação, confiabilidade; achado e limitações",
    "Sinal de risco × evidência × conclusão",
    "Recomendações: causas e riscos; plano de ação × implementação × resultado × benefício",
    "Integração das funções da CGU: ouvidoria, transparência, correição, auditoria",
  ],
  e1: [
    "Estatística descritiva: tipos de variáveis, posição, dispersão, visualização",
    "Probabilidade e distribuições; amostragem; intervalos de confiança",
    "Testes de hipóteses; significância × relevância prática; erros tipo I e II",
    "Correlação, regressão e ANOVA; tamanho de efeito",
    "Associação, predição e causalidade em dados administrativos",
    "Python 3: estruturas de dados, fluxo, funções, módulos, arquivos, exceções",
    "Python: manipulação e depuração de rotinas; testes e reprodutibilidade",
    "Preparação: ausentes, duplicados, outliers, desbalanceamento, codificação, normalização, seleção de atributos, vazamento",
  ],
  e2: [
    "Modelos: relacional, documental, chave-valor, multidimensional, vetorial; normalização; transações",
    "Data warehouse, data mart, data lake, lakehouse; data mesh",
    "SQL: DDL/DML, junções, agregações, subconsultas, CTEs, funções de janela",
    "SQL: índices, planos de execução, desempenho, nulos e duplicações",
    "Ingestão: ETL/ELT, lote × fluxo, incremental, APIs, contratos de dados; CSV, JSON, XML, Parquet",
    "Processamento distribuído: particionamento, paralelismo, tolerância a falhas, assimetria (skew)",
    "Qualidade e rastreabilidade: metadados, catálogo, linhagem; completude, consistência, validade, unicidade, acurácia, atualidade",
    "Perfilamento, deduplicação, vinculação de registros (record linkage) e riscos de falsos vínculos",
    "Compartilhamento e proteção: minimização, privilégios, retenção, anonimização, pseudonimização, reidentificação",
  ],
  e3: [
    "Supervisionado × não supervisionado; semissupervisionado e reforço",
    "Regressão, classificação, agrupamento, redução de dimensionalidade, detecção de anomalias",
    "Regularização, ensembles, sobreajuste e subajuste; comparar com soluções simples",
    "Treino/validação/teste; validação cruzada e temporal; vazamento; viés e variância",
    "Métricas: precisão, sensibilidade, especificidade, calibração; custo de FP e FN; desempenho por grupos",
    "Explicabilidade e limites do uso de escores para priorização",
    "Redes neurais: perceptron, MLP, ativação, perda, retropropagação",
    "CNN, RNN, transformers; transferência de aprendizado e ajuste fino",
    "PLN: pré-processamento, embeddings, similaridade semântica",
    "LLMs: prompts, RAG, avaliação, alucinações e limitações",
    "Agentes de IA: autorização, rastreabilidade, supervisão, prompt injection, uso indevido de ferramentas",
  ],
  e4: [
    "MLOps: versionamento de dados/código/modelos, experimentos, CI/CD, reprodutibilidade",
    "Implantação por APIs, reversão; monitoramento de drift e desempenho",
    "Sustentação: serviços gerenciados × operação própria; custo, latência, disponibilidade, observabilidade",
    "Controle de acesso, segredos e continuidade",
    "Governança de IA: papéis, riscos, rastreabilidade, avaliação de impacto, revisão humana e contestação",
    "Proteção de dados pessoais; discriminação e uso fora da finalidade",
    "Gestão de produtos de dados; Scrum e Kanban",
    "PDTIC, plano de transformação digital e plano de dados abertos",
    "Contratação: ETP e termo de referência; TCO; pesquisa de preços",
    "Fiscalização e pagamento por entregas; propriedade intelectual, portabilidade, dependência (vendor lock-in) e plano de saída",
  ],
  disc: [
    "Q1 (30 linhas, 30 pts): tema dos conhecimentos complementares",
    "Q2 (60 linhas, 70 pts): situação-problema de Ciência de Dados",
    "Domínio da modalidade escrita: grafia, morfossintaxe, propriedade vocabular (cada erro desconta nota)",
    "Responder todos os quesitos, na ordem; não ultrapassar o limite de linhas",
    "Simulados discursivos semanais (aba Discursiva)",
  ],
};

window.WEEK_PLAN = [
  { d: "Domingo", t: "Simulado completo estilo Cebraspe (certo/errado) e correção", subj: ["e1", "e3", "c5", "b4"] },
  { d: "Segunda", t: "Estatística, Python e preparação de dados", subj: ["e1"] },
  { d: "Terça", t: "Engenharia, SQL e governança de dados", subj: ["e2"] },
  { d: "Quarta", t: "Aprendizado de máquina, redes neurais, LLMs", subj: ["e3"] },
  { d: "Quinta", t: "MLOps, governança de IA, contratações + evidências e IA", subj: ["e4", "c4"] },
  { d: "Sexta", t: "Complementares: auditoria, governança, direito público, transparência", subj: ["c5", "c1", "c3", "c2"] },
  { d: "Sábado", t: "Básicos + oficina discursiva e caderno de erros", subj: ["b1", "b3", "disc"] },
];
