// "Como a banca cobra": padrões observados em provas recentes do Cebraspe de TI/ciência de dados
// (SUSEP 2025, ANM 2025, Petrobras 2022, BDMG 2025). Os itens abaixo são ORIGINAIS, escritos no mesmo estilo;
// os gabaritos foram definidos por mim – desconfie e confira nas fontes quando em dúvida.

window.PATTERNS = {
  abs: { nome: "Palavra absoluta", dica: "sempre, nunca, exclusivamente, apenas, somente, independe, restrita, necessariamente, em qualquer caso. Na maioria das vezes o item é ERRADO – mas confirme se a afirmação é realmente universal.", gatilhos: ["sempre", "nunca", "exclusivamente", "apenas", "somente", "independe", "restrita", "necessariamente"] },
  troca: { nome: "Troca de conceito ou fórmula", dica: "O enunciado descreve um conceito com o nome de outro: precision ↔ recall, tipo I ↔ tipo II, DROP ↔ DELETE, p(y|x) ↔ p(x|y), supervisionado ↔ não supervisionado. Releia a definição, não o nome.", gatilhos: [] },
  meia: { nome: "Meia-verdade", dica: "O começo está correto e o final contém o erro (ou a justificativa 'por isso/pois' é falsa). Leia até o último termo.", gatilhos: ["por isso", "pois", "o que", "uma vez que"] },
  ress: { nome: "Ressalva que deixa o item certo", dica: "'em regra', 'pode', 'geralmente', 'especialmente quando' costumam indicar item CERTO, pois a banca descreve um comportamento típico, não um absoluto.", gatilhos: ["pode", "geralmente", "em regra", "especialmente"] },
  lit: { nome: "Literalidade de norma ou número", dica: "Prazos, quantidades, artigos e nomes oficiais. Aqui só memorização resolve; use flashcards.", gatilhos: [] },
  causa: { nome: "Causa × correlação / inversão", dica: "Atribuir causalidade a uma correlação, ou inverter causa e efeito. Típico de matérias de evidências e estatística.", gatilhos: [] },
  caso: { nome: "Situação hipotética", dica: "Há um bloco de texto seguido de itens. O item pode cobrar o conceito geral, não o caso. Sublinhe o que o caso afirma e o que o item acrescenta.", gatilhos: [] },
  escopo: { nome: "Restringir ou ampliar o escopo", dica: "'a detecção de viés é preocupação restrita à fase de desenvolvimento' – o item limita algo que na verdade vale para todo o ciclo.", gatilhos: ["restrita", "limita-se", "apenas na fase"] },
};

window.BANCA_TIPS = [
  "Pontuação: cada erro anula um acerto. Marque quando tiver mais de 50% de confiança; abaixo disso, deixe em branco. Em P3 (±2 pontos) o impacto de cada decisão é dobrado.",
  "Eliminação: NP1 ≥ 8, NP2 ≥ 12, NP3 ≥ 54 e soma ≥ 78. Errar muitos itens em uma prova pode eliminar, mesmo com nota alta em outra.",
  "Leia o enunciado do bloco ('Julgue os itens a seguir, relativos a…'): ele diz quais assuntos virão e ajuda a localizar o erro.",
  "Itens de SQL/Python pedem execução mental: simule a consulta em um exemplo pequeno antes de julgar.",
  "Em itens de normas, memorize o verbo: 'deve', 'pode', 'é vedado' mudam o gabarito.",
  "Faça o caderno de erros: para cada item errado, anote qual padrão te enganou (aba Questões → Caderno de erros).",
];

(() => {
  const N = [
    ["e3", "abs", "Em aprendizado supervisionado, a quantidade de dados rotulados é irrelevante para o desempenho do modelo, desde que o algoritmo seja suficientemente complexo.", false, "Errado. 'Irrelevante' é absoluto; dados rotulados em quantidade e qualidade afetam diretamente a generalização."],
    ["e3", "troca", "Modelos discriminativos aprendem a probabilidade condicional p(x|y), em que x é a entrada e y o rótulo.", false, "Errado. Discriminativos aprendem p(y|x). p(x|y) e p(x,y) são características de modelos generativos."],
    ["e3", "ress", "A regularização L2 (ridge) tende a reduzir a magnitude dos coeficientes sem anulá-los, enquanto a L1 (lasso) pode zerar coeficientes e realizar seleção de variáveis.", true, "Correto."],
    ["e3", "troca", "Fraudes em transações financeiras são tipicamente identificadas por regressão, por tratar-se da previsão de valores contínuos.", false, "Errado. Identificar fraude é classificação (rótulo categórico); regressão prevê valores contínuos."],
    ["e3", "escopo", "Em MLOps, o monitoramento de um modelo em produção deve concentrar-se em métricas técnicas, como latência, sendo a detecção de viés preocupação restrita à fase de desenvolvimento.", false, "Errado. Viés, drift e desempenho por grupo devem ser monitorados continuamente."],
    ["e3", "abs", "O PCA sempre melhora o desempenho de um classificador, pois elimina ruído e mantém toda a informação relevante.", false, "Errado. 'Sempre' é absoluto; o PCA pode descartar informação discriminativa."],
    ["e3", "meia", "Transformers superaram as redes recorrentes em PLN porque processam os tokens estritamente em sequência, preservando a ordem.", false, "Errado. A vantagem vem do paralelismo e da atenção sobre toda a sequência; a ordem é preservada por codificação posicional."],
    ["e3", "ress", "Modelos generativos autorregressivos baseados em transformers estão entre as arquiteturas usadas em LLMs.", true, "Correto."],
    ["e1", "causa", "Se a taxa de denúncias de corrupção é maior em municípios com mais ouvidorias, conclui-se que as ouvidorias aumentam a corrupção.", false, "Errado. Pode refletir maior detecção/notificação; correlação não implica causalidade."],
    ["e1", "troca", "O poder de um teste estatístico é a probabilidade de cometer o erro tipo I.", false, "Errado. O erro tipo I tem probabilidade α. Poder = 1 − β (probabilidade de rejeitar H0 falsa)."],
    ["e1", "abs", "Um intervalo de confiança de 95% garante que o parâmetro populacional está dentro do intervalo calculado com probabilidade de 95%.", false, "Errado (interpretação frequentista): o parâmetro é fixo; o 95% refere-se ao procedimento repetido."],
    ["e2", "troca", "Para excluir uma tabela e sua estrutura em SQL, utiliza-se o comando DELETE TABLE.", false, "Errado. O comando é DROP TABLE; DELETE remove linhas."],
    ["e2", "abs", "Em SQL, a cláusula GROUP BY só pode ser usada se houver função agregada e cláusula ORDER BY.", false, "Errado. GROUP BY pode ser usado sem agregação e sem ORDER BY."],
    ["e2", "troca", "A instrução mínima de consulta em SQL é composta pelas cláusulas SELECT e WHERE.", false, "Errado. A forma mínima usa SELECT e FROM; WHERE é opcional."],
    ["e2", "ress", "Em bancos NoSQL orientados a documentos, estruturas aninhadas costumam evitar junções e favorecer a leitura de um agregado completo.", true, "Correto."],
    ["e2", "escopo", "A governança de dados em data mesh é centralizada em uma equipe única, que define e executa todas as pipelines dos domínios.", false, "Errado. No data mesh a governança é federada e os domínios são donos dos produtos de dados."],
    ["e2", "ress", "A pseudonimização reduz riscos, mas não elimina a possibilidade de reidentificação caso as informações adicionais sejam combinadas.", true, "Correto."],
    ["c4", "causa", "Uma redução no número de sanções aplicadas indica, necessariamente, redução da ocorrência de irregularidades.", false, "Errado. Pode refletir menor detecção ou capacidade de apuração."],
    ["c4", "ress", "Falsos positivos e falsos negativos têm custos distintos e a escolha do limiar de um modelo deve considerá-los.", true, "Correto."],
    ["c5", "meia", "A suficiência da evidência de auditoria refere-se à sua qualidade (relevância e confiabilidade).", false, "Errado. Suficiência é quantidade; adequação é qualidade (relevância e confiabilidade)."],
    ["c5", "abs", "A independência do auditor interno impede qualquer atuação em consultoria.", false, "Errado. A consultoria é serviço da auditoria interna, desde que preservada a autonomia do gestor e a objetividade."],
    ["c3", "lit", "O processo administrativo de responsabilização de pessoa jurídica tem como base legal a Lei nº 8.112/1990.", false, "Errado. A base é a Lei Anticorrupção (Lei 12.846/2013); a 8.112/1990 é o regime dos servidores."],
    ["c2", "ress", "O tarjamento de dados pessoais em documentos públicos pode ser insuficiente para evitar reidentificação quando outras informações permitem identificar o titular.", true, "Correto."],
    ["e4", "abs", "Em contratações de soluções de dados e IA, a dependência tecnológica de um fornecedor é irrelevante, desde que o preço seja o menor.", false, "Errado. Portabilidade, acesso a dados/modelos e plano de saída fazem parte da análise (ETP/TR)."],
    ["e4", "ress", "O versionamento de dados, código e modelos, aliado ao registro de experimentos, favorece a reprodutibilidade.", true, "Correto."],
  ];
  N.forEach(([s, pat, t, gab, exp], i) => QUESTIONS.push({ id: "p" + i, s, pat, t, gab, exp }));
})();
