import type { CSSProperties } from "react";

export const media = (name: string) => `/media/emege/${name}`;

export const whatsapp = (message: string) =>
  `https://wa.me/5546999302444?text=${encodeURIComponent(message)}`;

export const store = {
  instagram: "https://www.instagram.com/emege.modas",
  maps: "https://www.google.com/maps/search/?api=1&query=Av.+Brasília,+535,+Espigão+Alto+do+Iguaçu,+PR",
  hello: whatsapp("Olá! Conheci a Eme gê pelo site e quero descobrir as novidades."),
  offer: whatsapp(
    "Olá! Conheci a Eme gê pelo site e quero aproveitar os 20% OFF na minha primeira compra na loja.",
  ),
  vip: whatsapp("Olá! Quero entrar no Grupo VIP Eme gê para receber novidades e ofertas."),
  conditional: whatsapp("Olá! Gostaria de saber como funciona o condicional e o crediário Eme gê."),
};

export type Look = {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  video?: string;
  position?: string;
};

export type Collection = {
  id: string;
  label: string;
  headline: string;
  description: string;
  brands: string;
  looks: Look[];
};

export const collections: Collection[] = [
  {
    id: "feminino",
    label: "Feminino",
    headline: "Muitas versões. Todas suas.",
    description:
      "Do jeans que acompanha o dia ao detalhe que muda tudo. Encontre o que combina com o seu momento.",
    brands: "Zee Rucci · Bruna e Bia · Cativa · Pink Lu",
    looks: [
      {
        id: "chocolate",
        name: "Tons que abraçam",
        category: "Feminino",
        image: "feminino-chocolate",
        video: "chocolate-em-cena",
        description:
          "Chocolate, textura e acessórios dourados. Uma combinação para levar elegância aos dias mais simples.",
        position: "center 28%",
      },
      {
        id: "listras",
        name: "Leveza em cada linha",
        category: "Feminino",
        image: "vestido-listrado",
        description:
          "Vestido listrado com uma proposta leve e cheia de personalidade. Um look inteiro em uma só escolha.",
        position: "center 35%",
      },
      {
        id: "rosa",
        name: "Seu jeans, outra vez",
        category: "Feminino",
        image: "look-rosa",
        description:
          "Camisa rosa e jeans: a dupla que encontra espaço em diferentes momentos da sua rotina.",
        position: "center 38%",
      },
      {
        id: "preto",
        name: "Presença sem esforço",
        category: "Feminino",
        image: "look-preto",
        description:
          "O preto ganha presença com uma composição completa e acessórios que fazem a diferença.",
        position: "center 40%",
      },
    ],
  },
  {
    id: "infantil",
    label: "Infantil",
    headline: "Pequenos. Cheios de personalidade.",
    description:
      "Roupas para acompanhar descobertas, sorrisos e as histórias que eles ainda vão viver.",
    brands: "RalaKids · Trajadinhos · e outras descobertas",
    looks: [
      {
        id: "mini-jeans",
        name: "Jeans para descobrir",
        category: "Infantil",
        image: "infantil-jeans",
        video: "infantil-jeans-movimento",
        description: "Conjunto infantil em jeans para compor um visual cheio de charme.",
        position: "center 25%",
      },
      {
        id: "mini-linho",
        name: "Pequeno grande estilo",
        category: "Infantil",
        image: "infantil-linho",
        video: "infantil-linho-movimento",
        description:
          "Tons claros em um conjunto infantil que vai dos passeios aos momentos especiais.",
        position: "center 25%",
      },
      {
        id: "mini-lenco",
        name: "Um toque de alegria",
        category: "Infantil",
        image: "infantil-lenco-poster",
        video: "infantil-lenco",
        description: "Uma composição infantil com detalhes que deixam o look ainda mais divertido.",
        position: "center 25%",
      },
      {
        id: "mini-casual",
        name: "Dias de brincar",
        category: "Infantil",
        image: "infantil-verde-poster",
        video: "infantil-verde",
        description: "Um visual casual para os pequenos explorarem o dia com o próprio estilo.",
        position: "center 30%",
      },
    ],
  },
  {
    id: "masculino",
    label: "Masculino",
    headline: "O essencial também surpreende.",
    description:
      "Combinações descomplicadas, detalhes bem escolhidos e espaço para o seu jeito de vestir.",
    brands: "Casual · Essenciais · Combinações para a sua rotina",
    looks: [
      {
        id: "paco",
        name: "O casual bem resolvido",
        category: "Masculino",
        image: "masculino-paco",
        video: "masculino-em-cena",
        description:
          "Camiseta clara com detalhes contrastantes e calça escura. Uma combinação prática e versátil.",
        position: "center 24%",
      },
      {
        id: "casual",
        name: "Clareie os seus dias",
        category: "Masculino",
        image: "masculino-casual-poster",
        video: "masculino-casual",
        description: "Tons claros com uma proposta casual para diferentes ocasiões.",
        position: "center 24%",
      },
      {
        id: "social",
        name: "Uma nova presença",
        category: "Masculino",
        image: "masculino-social-poster",
        video: "masculino-social",
        description: "Camisa e calça em uma combinação que traz mais presença ao visual.",
        position: "center 38%",
      },
      {
        id: "tenis-casual",
        name: "O próximo passo",
        category: "Calçados",
        image: "tenis-casual",
        description:
          "Calçados casuais para completar o look. Consulte a equipe sobre modelos e numerações.",
      },
    ],
  },
  {
    id: "calcados",
    label: "Calçados",
    headline: "O próximo passo é seu.",
    description:
      "Leveza para os seus pés, personalidade para o look. Dos primeiros passos aos seus caminhos de todo dia.",
    brands: "Feminino · Infantil · Casual",
    looks: [
      {
        id: "verde",
        name: "Um laço com a leveza",
        category: "Calçados",
        image: "rasteira-verde",
        description:
          "Rasteira verde com detalhe de laço para dar um novo toque às suas combinações.",
      },
      {
        id: "caramelo",
        name: "Seu tom favorito",
        category: "Calçados",
        image: "rasteira-caramelo",
        description:
          "A versatilidade do caramelo em uma rasteira que complementa diferentes looks.",
      },
      {
        id: "coracao",
        name: "Pequenos grandes passos",
        category: "Calçados infantis",
        image: "tenis-coracao",
        description:
          "Tênis infantil com detalhes de coração. Fale com a equipe para consultar os tamanhos.",
      },
      {
        id: "clog",
        name: "Personalidade nos pés",
        category: "Calçados",
        image: "clog-preto",
        description: "Clog com aplicações para um visual descontraído e cheio de personalidade.",
      },
    ],
  },
  {
    id: "joias",
    label: "Joias & semijoias",
    headline: "O detalhe que diz tanto.",
    description:
      "Um brilho perto do rosto. Um detalhe nas mãos. Pequenas escolhas que fazem você se reconhecer.",
    brands: "Aleska · Joias & semijoias",
    looks: [
      {
        id: "joias-colar",
        name: "Delicadeza que ilumina",
        category: "Joias & semijoias",
        image: "joias-colar",
        description: "Colares e pulseiras em uma composição delicada para valorizar o seu estilo.",
        position: "center 32%",
      },
      {
        id: "joias-dourado",
        name: "Dourado, do seu jeito",
        category: "Joias & semijoias",
        image: "joias-dourado",
        video: "joias-em-cena",
        description: "Uma seleção de acessórios dourados para vestir a sua personalidade.",
        position: "center 25%",
      },
      {
        id: "aneis",
        name: "Nas suas mãos",
        category: "Joias & semijoias",
        image: "aneis",
        description: "Anéis e combinações para transformar até os menores detalhes do look.",
      },
      {
        id: "brincos",
        name: "Brilho na medida",
        category: "Joias & semijoias",
        image: "brincos",
        description: "Brincos com textura e brilho para dar destaque à sua próxima composição.",
      },
    ],
  },
];

export const films: Look[] = [
  {
    id: "filme-offwhite",
    name: "Leve para onde for",
    category: "Feminino",
    image: "offwhite-em-cena-poster",
    video: "offwhite-em-cena",
    description: "Tons claros, texturas e uma composição que ganha vida em cada movimento.",
  },
  {
    id: "filme-chocolate",
    name: "A beleza dos detalhes",
    category: "Feminino",
    image: "chocolate-em-cena-poster",
    video: "chocolate-em-cena",
    description:
      "Um look em tons de chocolate com acessórios dourados. Veja a composição por inteiro.",
  },
  {
    id: "filme-infantil",
    name: "Estilo desde pequeno",
    category: "Infantil",
    image: "infantil-jeans-movimento-poster",
    video: "infantil-jeans-movimento",
    description: "Pequenas descobertas, grandes sorrisos. Conheça o conjunto infantil em jeans.",
  },
  {
    id: "filme-joias",
    name: "Um brilho só seu",
    category: "Joias & semijoias",
    image: "detalhes-em-cena-poster",
    video: "detalhes-em-cena",
    description: "Aproxime o olhar dos detalhes e descubra novas combinações de acessórios.",
  },
];

export const conditionalSteps = [
  {
    title: "Conte o que procura",
    description:
      "Converse com a equipe e escolha as peças que combinam com o seu estilo, sua rotina e a ocasião.",
  },
  {
    title: "Leve para casa",
    description:
      "Combine com a equipe as condições e o prazo do seu condicional antes de levar a seleção.",
  },
  {
    title: "Experimente com calma",
    description:
      "Veja no seu espelho, combine com o que já tem e descubra o que realmente faz sentido para você.",
  },
  {
    title: "Fique com o que ama",
    description:
      "Devolva as peças que não escolher no prazo combinado e pague apenas por aquilo que vai ficar.",
  },
];

export const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;
