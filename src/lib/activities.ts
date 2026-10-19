// Roteiro completo das 30 missões da trilha. Cada missão tem pilar, título, material,
// passos e "o que observar". Revisar com a fonoaudióloga parceira antes de publicar.
import type { PillarKey } from "./quiz";

export type Activity = {
  title: string;
  minutes: number;
  material: string;
  why: string;
  steps: string[];
  observe: string;
};

// Uma atividade por dia da trilha (30 dias). O índice corresponde ao dia - 1.
export const MISSIONS: Activity[] = [
  // Semana 1 — Olhar junto
  {
    title: "Bolhas com pausa",
    minutes: 10,
    material: "Um pote de bolhas de sabão",
    why: "A pausa cria um motivo para {nome} olhar para você e pedir — o começo da conversa.",
    steps: [
      "Sente-se de frente para {nome}, na altura dos olhos.",
      "Sopre algumas bolhas e curta junto, com animação.",
      "Pare. Segure o pote perto do seu rosto e espere em silêncio, contando até 5.",
      "Qualquer olhar, som ou gesto vale como pedido: diga “bolha!” e sopre de novo.",
    ],
    observe: "Se {nome} olha para o seu rosto, estende a mão ou faz algum som durante a pausa.",
  },
  {
    title: "Espelho de brincadeira",
    minutes: 10,
    material: "Dois brinquedos iguais ou parecidos (dois carrinhos, duas colheres)",
    why: "Quando você imita {nome}, a criança percebe que vocês estão jogando juntos — e passa a imitar você.",
    steps: [
      "Fique de frente para {nome}, cada um com o seu brinquedo.",
      "Imite exatamente o que {nome} faz: se bate o carrinho, você bate o seu.",
      "Depois de algumas rodadas, faça um movimento novo e simples, com um som divertido.",
      "Espere. Se {nome} copiar, comemore com entusiasmo.",
    ],
    observe: "Se {nome} percebe que você está imitando e se tenta copiar o seu movimento novo.",
  },
  {
    title: "Escolha entre dois",
    minutes: 5,
    material: "Dois alimentos ou objetos de que {nome} gosta",
    why: "Escolher dá a {nome} um motivo real para se comunicar, do jeito que conseguir.",
    steps: [
      "Na hora do lanche, mostre duas opções, uma em cada mão.",
      "Diga o nome de cada uma devagar: “banana”… “biscoito”.",
      "Espere. Olhar, apontar, estender a mão ou falar: tudo vale.",
      "Entregue o escolhido repetindo a palavra: “banana!”.",
    ],
    observe: "Como {nome} escolheu: olhando, apontando, com som ou com palavra.",
  },
  {
    title: "Narrador da brincadeira",
    minutes: 10,
    material: "O brinquedo que {nome} escolher",
    why: "Entrar na brincadeira de {nome}, sem comandar, aumenta o tempo que vocês brincam juntos.",
    steps: [
      "Deixe {nome} escolher o brinquedo e sente-se perto, de frente.",
      "Não dirija nem faça perguntas. Só participe, seguindo a criança.",
      "Narre com frases curtas: “carro… vai!”, “caiu!”, “de novo!”.",
      "Use uma ou duas palavras a mais do que {nome} usa hoje.",
    ],
    observe: "Quanto tempo {nome} fica brincando com você antes de trocar de atividade.",
  },
  {
    title: "Música da troca",
    minutes: 5,
    material: "Uma musiquinha curta, sempre a mesma",
    why: "Avisar antes e repetir o mesmo ritual deixa as mudanças mais previsíveis e com menos crises.",
    steps: [
      "Escolha uma musiquinha curta para os momentos de troca (ex.: hora do banho).",
      "Avise antes: “mais uma vez e acabou”, mostrando um dedo.",
      "Cante a música e mostre o objeto da próxima atividade (a toalha, por exemplo).",
      "Repita o mesmo ritual todos os dias, no mesmo momento.",
    ],
    observe: "Se, com os dias, {nome} começa a reconhecer a música e a aceitar melhor a troca.",
  },
  {
    title: "Cantar e parar",
    minutes: 10,
    material: "Uma música que {nome} goste",
    why: "Parar a música cria suspense e um motivo natural para a criança pedir 'mais'.",
    steps: [
      "Comece a cantar ou tocar uma música animada.",
      "No meio, pare de repente e faça cara de surpresa.",
      "Espere qualquer sinal: olhar, som, gesto ou a palavra 'mais'.",
      "Quando houver qualquer tentativa, recomece com alegria!",
    ],
    observe: "Se {nome} tenta comunicar que quer mais: com olhar, som, gesto ou palavra.",
  },

  // Semana 2 — Imitar e revezar
  {
    title: "Hora do banho: partes do corpo",
    minutes: 10,
    material: "Durante o banho",
    why: "O banho é diário e sensorial — perfeito para repetir nomes do corpo todo dia.",
    steps: [
      "Nomeie cada parte enquanto lava: 'pé… barriga… braço…'.",
      "Faça pausas antes de lavar a próxima parte e espere {nome} olhar ou apontar.",
      "Use a mesma ordem todos os dias — a repetição ajuda a memorizar.",
      "Comemore quando {nome} antecipar a próxima parte!",
    ],
    observe: "Se {nome} começa a antecipar ou apontar a próxima parte do corpo.",
  },
  {
    title: "Esconde-esconde com paninho",
    minutes: 5,
    material: "Um pano leve ou fralda de tecido",
    why: "Esconder e revelar ensina permanência do objeto e cria um momento de atenção compartilhada.",
    steps: [
      "Cubra o rosto com o pano e diga 'cadê?'.",
      "Retire rápido e diga 'achou!' com expressão alegre.",
      "Repita e depois deixe {nome} puxar o pano.",
      "Varie: esconda um brinquedo embaixo do pano também.",
    ],
    observe: "Se {nome} puxa o pano, sorri quando aparece ou tenta esconder de volta.",
  },
  {
    title: "Cesto de tesouros",
    minutes: 10,
    material: "Uma cesta com 4-5 objetos seguros do dia a dia (colher, esponja, lenço…)",
    why: "Explorar objetos reais amplia vocabulário e estimula a curiosidade.",
    steps: [
      "Coloque a cesta no chão e deixe {nome} explorar livremente.",
      "Nomeie cada objeto que pegar: 'colher!', 'macio!', 'azul!'.",
      "Faça uma pausa antes de nomear — espere {nome} olhar para você.",
      "Troque os objetos a cada poucos dias para manter a novidade.",
    ],
    observe: "Quantos objetos {nome} explora e se olha para você ao pegar algo novo.",
  },
  {
    title: "Tchau, brinquedo!",
    minutes: 5,
    material: "Um brinquedo favorito",
    why: "Despedir-se ensina rotina e dá um modelo claro de comunicação social.",
    steps: [
      "Ao guardar o brinquedo, acene e diga 'tchau, carrinho!'.",
      "Ajude {nome} a acenar junto se ainda não faz sozinho.",
      "Repita com outros objetos: 'tchau, bola!', 'tchau, boneca!'.",
      "Use sempre o mesmo gesto + palavra.",
    ],
    observe: "Se {nome} começa a acenar ou dizer 'tchau' espontaneamente.",
  },
  {
    title: "Bola pra lá, bola pra cá",
    minutes: 10,
    material: "Uma bola macia",
    why: "Revezar (minha vez, sua vez) é a base da conversa e do brincar social.",
    steps: [
      "Sente-se de frente para {nome} com as pernas abertas.",
      "Role a bola dizendo 'vai!' e espere {nome} rolar de volta.",
      "Se não rolar, ajude fisicamente e comemore.",
      "Aumente a distância aos poucos.",
    ],
    observe: "Se {nome} espera a vez, olha para você antes de rolar ou diz 'vai'.",
  },
  {
    title: "Sons dos bichos",
    minutes: 10,
    material: "Figuras ou brinquedos de animais",
    why: "Sons onomatopaicos são mais fáceis de imitar que palavras e abrem caminho para a fala.",
    steps: [
      "Mostre um animal e faça o som: 'vaca… muuu!'.",
      "Espere em silêncio, olhando para {nome}.",
      "Qualquer tentativa de som vale — comemore!",
      "Repita com 3-4 animais diferentes.",
    ],
    observe: "Se {nome} tenta imitar o som, mesmo que imperfeito.",
  },

  // Semana 3 — Pedir e escolher
  {
    title: "Mais um pedaço?",
    minutes: 5,
    material: "Fruta cortada em pedacinhos",
    why: "Comida é motivação natural. Dar um pedaço de cada vez cria oportunidades de pedir.",
    steps: [
      "Dê um pedacinho e segure o próximo visível.",
      "Espere qualquer sinal de pedido: olhar, som, gesto ou palavra.",
      "Quando pedir, entregue dizendo 'mais!' ou o nome da fruta.",
      "Repita várias vezes durante o lanche.",
    ],
    observe: "Como {nome} pediu: com olhar, gesto, som ou palavra.",
  },
  {
    title: "Torre que cai",
    minutes: 10,
    material: "Blocos de montar ou copos empilháveis",
    why: "Construir e derrubar ensina causa e efeito e cria momentos de atenção conjunta.",
    steps: [
      "Construa uma torre juntos, narrando: 'um… dois… três!'.",
      "Antes de derrubar, faça uma pausa dramática: 'vai cair…'.",
      "Derrube e diga 'bum!' com expressão exagerada.",
      "Espere {nome} pedir para fazer de novo.",
    ],
    observe: "Se {nome} pede para reconstruir ou antecipa o 'bum!'.",
  },
  {
    title: "Antes e depois",
    minutes: 5,
    material: "Objetos do dia a dia (sapato/meia, prato/comida)",
    why: "Sequências temporais ajudam a prever rotinas e desenvolvem linguagem narrativa.",
    steps: [
      "Mostre dois momentos: 'primeiro a meia… depois o sapato!'.",
      "Use gestos de sequência (apontar 1, depois 2).",
      "Peça para {nome} ajudar na ordem certa.",
      "Repita com outras rotinas: escovar dente → enxaguar.",
    ],
    observe: "Se {nome} começa a antecipar o próximo passo da sequência.",
  },
  {
    title: "Livro de figuras",
    minutes: 10,
    material: "Um livro com figuras grandes e coloridas",
    why: "Ler juntos cria vocabulário e momentos de atenção compartilhada.",
    steps: [
      "Abra o livro e aponte uma figura: 'olha, o cachorro!'.",
      "Espere {nome} olhar, apontar ou tentar dizer o nome.",
      "Não leia o texto todo — converse sobre as figuras.",
      "Deixe {nome} virar as páginas no ritmo dele.",
    ],
    observe: "Se {nome} aponta figuras, vira páginas ou tenta nomear.",
  },
  {
    title: "Palminhas e caretas",
    minutes: 5,
    material: "Nada — só vocês dois!",
    why: "Brincadeiras corporais sem objetos focam na interação face a face.",
    steps: [
      "Faça palmas e diga 'palminhas!', esperando {nome} imitar.",
      "Faça caretas engraçadas e espere a reação.",
      "Alterne: palmas → careta → cóceguinha → abraço.",
      "Pause entre cada ação e espere {nome} pedir mais.",
    ],
    observe: "Se {nome} imita as palmas/caretas ou pede para continuar.",
  },
  {
    title: "Abre e fecha a caixa",
    minutes: 10,
    material: "Uma caixa com tampa fácil e brinquedos dentro",
    why: "Pedir para abrir cria necessidade comunicativa real.",
    steps: [
      "Coloque brinquedos favoritos dentro da caixa e feche.",
      "Entregue a caixa fechada para {nome}.",
      "Espere qualquer tentativa de pedir ajuda: olhar, entregar a caixa, som.",
      "Abra dizendo 'abre!' e entregue o brinquedo.",
    ],
    observe: "Como {nome} pediu para abrir: gesto, som, palavra ou entrega da caixa.",
  },

  // Semana 4 — Brincar mais tempo
  {
    title: "Comidinha de faz de conta",
    minutes: 10,
    material: "Pratinhos, panelinhas ou comida de brinquedo",
    why: "O faz de conta expande linguagem e imaginação além do aqui-e-agora.",
    steps: [
      "Proponha: 'vamos fazer comidinha?'.",
      "Narre as ações: 'mexendo… cozinhando… pronto!'.",
      "Ofereça comida para bonecos ou para você: 'come, mamãe!'.",
      "Use frases um pouco maiores que as de {nome}.",
    ],
    observe: "Se {nome} entra no faz de conta e usa novas palavras ou gestos.",
  },
  {
    title: "Hora de guardar",
    minutes: 5,
    material: "Caixas ou cestos para organizar",
    why: "Guardar juntos é rotina, vocabulário e trabalho em equipe.",
    steps: [
      "Cante uma musiquinha de guardar (sempre a mesma).",
      "Nomeie cada coisa: 'carrinho na caixa!', 'boneca na prateleira!'.",
      "Transforme em jogo: 'quem guarda primeiro?'.",
      "Comemore quando terminar.",
    ],
    observe: "Se {nome} ajuda a guardar e associa objetos aos lugares.",
  },
  {
    title: "Cadê a luz?",
    minutes: 5,
    material: "Interruptor de luz",
    why: "Causa e efeito com objetos reais ensina que ações têm consequências previsíveis.",
    steps: [
      "Leve {nome} até o interruptor e diga 'luz!'.",
      "Ajude a acender e diga 'acendeu!', apague e diga 'apagou!'.",
      "Repita várias vezes, fazendo pausas antes de falar.",
      "Deixe {nome} apertar o interruptor sozinho.",
    ],
    observe: "Se {nome} antecipa o resultado ou tenta dizer 'acendeu/apagou'.",
  },
  {
    title: "Imitar o carrinho",
    minutes: 10,
    material: "Um carrinho de brinquedo",
    why: "Imitar movimentos com sons combina coordenação motora e linguagem.",
    steps: [
      "Empurre o carrinho fazendo 'vrum vrum!' exagerado.",
      "Pare e espere {nome} imitar o som ou o movimento.",
      "Varie: rápido/lento, para cima/para baixo, batendo.",
      "Comemore cada tentativa de imitação.",
    ],
    observe: "Se {nome} imita o som do carro ou o movimento espontaneamente.",
  },
  {
    title: "Pedir ajuda",
    minutes: 5,
    material: "Um pote fechado com algo que {nome} quer dentro",
    why: "Criar uma situação onde pedir ajuda é necessário ensina comunicação funcional.",
    steps: [
      "Coloque algo desejado num pote que {nome} não consegue abrir.",
      "Entregue e espere sem ajudar imediatamente.",
      "Quando {nome} tentar comunicar (olhar, entregar, som), diga 'ajuda!' e abra.",
      "Repita em diferentes situações do dia.",
    ],
    observe: "Como {nome} pediu ajuda: gesto, entrega do objeto, som ou palavra.",
  },
  {
    title: "Cabaninha",
    minutes: 15,
    material: "Lençóis, cadeiras ou almofadas",
    why: "Construir juntos exige comunicação, planejamento compartilhado e brincadeira simbólica.",
    steps: [
      "Proponha: 'vamos fazer uma cabana?'.",
      "Construa junto, narrando: 'lençol aqui… cadeira ali… pronto!'.",
      "Brinque dentro: lanterna, histórias, piquenique de faz de conta.",
      "Deixe {nome} liderar parte da construção.",
    ],
    observe: "Quanto tempo {nome} fica engajado na construção e brincadeira dentro.",
  },
  // Semana 5 — Rotinas sem crise
  {
    title: "Ritual de dormir",
    minutes: 10,
    material: "Livro, musiquinha calma, luz baixa",
    why: "Um ritual previsível sinaliza ao corpo que é hora de desacelerar, reduzindo resistência.",
    steps: [
      "Estabeleça uma sequência fixa: pijama → escovar → livro → música → cama.",
      "Use sempre as mesmas palavras-chave: 'hora de dormir', 'boa noite'.",
      "Fale devagar e com voz calma durante todo o ritual.",
      "Mantenha o mesmo horário todos os dias.",
    ],
    observe: "Se {nome} começa a antecipar os passos do ritual com menos resistência.",
  },
  {
    title: "Mostra pra mim",
    minutes: 5,
    material: "Objetos variados pela casa",
    why: "Pedir para mostrar reforça compreensão de linguagem e atenção compartilhada.",
    steps: [
      "Peça: 'mostra pra mim o sapato!', 'cadê a bola?'.",
      "Espere {nome} buscar ou apontar.",
      "Se não souber, ajude apontando e nomeando juntos.",
      "Aumente a dificuldade: objetos em outro cômodo, categorias ('algo vermelho').",
    ],
    observe: "Quantos pedidos {nome} atende corretamente e se busca ativamente.",
  },
  {
    title: "Dança e congela",
    minutes: 10,
    material: "Uma música animada",
    why: "Parar sob comando treina regulação corporal e escuta ativa.",
    steps: [
      "Dance com {nome} ao som da música.",
      "Pause a música e diga 'congela!' ficando imóvel.",
      "Espere {nome} parar também, mesmo que precise de ajuda física no começo.",
      "Recomece e repita, variando os movimentos.",
    ],
    observe: "Se {nome} começa a parar sozinho quando a música para.",
  },
  {
    title: "Lanche das escolhas",
    minutes: 10,
    material: "3-4 opções de alimentos seguros",
    why: "Escolher entre múltiplas opções expande vocabulário e autonomia comunicativa.",
    steps: [
      "Disponha 3-4 alimentos na mesa.",
      "Nomeie cada um devagar: 'banana, maçã, biscoito, uva'.",
      "Pergunte 'qual você quer?' e espere a escolha.",
      "Ao entregar, repita o nome: 'maçã! Você escolheu maçã!'.",
    ],
    observe: "Se {nome} aponta, fala ou olha consistentemente para o escolhido.",
  },
  {
    title: "Boneco vai passear",
    minutes: 15,
    material: "Um boneco ou pelúcia favorito",
    why: "Narrar uma aventura do boneco cria contexto rico para novas palavras e frases.",
    steps: [
      "Proponha: 'o urso vai passear! Vamos juntos?'.",
      "Narre a jornada: 'olha a árvore!', 'cuidado, buraco!', 'chegamos no parque!'.",
      "Faça perguntas ao boneco e responda por ele.",
      "Deixe {nome} decidir o caminho ou o que acontece depois.",
    ],
    observe: "Se {nome} participa da narrativa, adiciona ideias ou usa palavras novas.",
  },
  {
    title: "Festa da colheita",
    minutes: 15,
    material: "Todas as figurinhas conquistadas na trilha",
    why: "Celebrar o progresso reforça motivação e dá senso de competência à criança e aos pais.",
    steps: [
      "Revise todas as figurinhas do álbum com {nome}.",
      "Nomeie cada conquista: 'dia 1 bolhas, dia 2 espelho…'.",
      "Conte quantas flores cresceram no jardim.",
      "Celebrem juntos com uma atividade especial escolhida por {nome}.",
    ],
    observe: "O orgulho de {nome} ao ver seu progresso e a conexão emocional entre vocês.",
  },
];

// Compatibilidade retroativa: o código antigo usava ACTIVITIES como Record<PillarKey, Activity>.
// Agora usamos MISSIONS como array indexado por dia. Este export mantém compatibilidade.
export const ACTIVITIES: Record<string, Activity> = Object.fromEntries(
  MISSIONS.map((m, i) => [`day-${i + 1}`, m])
);