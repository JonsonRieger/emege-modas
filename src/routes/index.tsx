import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Coffee,
  Heart,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Play,
  Plus,
  X,
} from "lucide-react";
import {
  Action,
  AmbientVideo,
  LookDialog,
  MotionControl,
  Photo,
  Spark,
  Wordmark,
  type Selection,
} from "@/components/emege-experience";
import { collections, conditionalSteps, films, store, delay } from "@/lib/emege";

import { useExperienceMotion } from "@/hooks/use-emege-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eme gê modas | Vista quem você é" },
      {
        name: "description",
        content:
          "Moda feminina, masculina, infantil, calçados, joias e beleza em Espigão Alto do Iguaçu. Descubra a Eme gê e aproveite 20% OFF na primeira compra na loja.",
      },
      { property: "og:title", content: "Eme gê modas — Vista quem você é." },
      {
        property: "og:description",
        content:
          "Muitas versões. Todas suas. Conheça os looks, descubra os detalhes e encontre seu estilo na Eme gê modas.",
      },
      { property: "og:locale", content: "pt_BR" },
    ],
  }),
  component: Index,
});

function Index() {
  // Start without autoplay until motion and data-saving preferences are known.
  const [paused, setPaused] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState(0);
  const [selection, setSelection] = useState<Selection>(null);
  const [step, setStep] = useState(0);
  const [hoveredFilm, setHoveredFilm] = useState<number | null>(null);
  const filmRail = useRef<HTMLDivElement>(null);
  const collection = collections[category] ?? collections[0]!;
  useExperienceMotion(paused);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    setPaused(preference.matches || Boolean(connection?.saveData));
    const update = () => setPaused(preference.matches || Boolean(connection?.saveData));
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  const selectCategory = (index: number) => {
    setCategory(index);
    document
      .getElementById("colecoes")
      ?.scrollIntoView({ behavior: paused ? "instant" : "smooth", block: "start" });
  };
  const moveFilms = (direction: number) =>
    filmRail.current?.scrollBy({
      left: direction * filmRail.current.clientWidth * 0.72,
      behavior: paused ? "instant" : "smooth",
    });

  return (
    <div className={`emege-site${paused ? " motion-paused" : ""}`}>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <div className="reading-progress" aria-hidden="true" />
      <div className="announcement">
        <span>Um convite para se descobrir.</span>
        <a href="#seu-presente">
          20% OFF na sua primeira compra <ArrowUpRight size={13} />
        </a>
        <span>ESPIGÃO ALTO DO IGUAÇU · PR</span>
      </div>
      <header className="site-header">
        <a
          href="#inicio"
          className="brand"
          aria-label="Eme gê modas — início"
          onClick={() => setMenuOpen(false)}
        >
          <Wordmark />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#colecoes">Nossas coleções</a>
          <a href="#em-movimento">Em movimento</a>
          <a href="#experiencia">O jeito Eme gê</a>
          <a href="#visite">Visite a loja</a>
        </nav>
        <div className="header-actions">
          <a
            className="header-contact"
            href={store.hello}
            target="_blank"
            rel="noopener noreferrer"
          >
            Vamos conversar <ArrowUpRight size={17} />
          </a>
          <button
            id="menu-toggle"
            type="button"
            className="menu-toggle circle-button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <nav
          id="mobile-navigation"
          className="mobile-navigation"
          hidden={!menuOpen}
          aria-label="Navegação no celular"
        >
          <a href="#colecoes" onClick={() => setMenuOpen(false)}>
            Nossas coleções <ArrowUpRight />
          </a>
          <a href="#em-movimento" onClick={() => setMenuOpen(false)}>
            Em movimento <ArrowUpRight />
          </a>
          <a href="#experiencia" onClick={() => setMenuOpen(false)}>
            O jeito Eme gê <ArrowUpRight />
          </a>
          <a href="#visite" onClick={() => setMenuOpen(false)}>
            Visite a loja <ArrowUpRight />
          </a>
          <a
            href={store.hello}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Falar pelo WhatsApp <MessageCircle />
          </a>
        </nav>
      </header>

      <main id="conteudo">
        <section id="inicio" className="hero">
          <div className="hero-copy">
            <p className="eyebrow hero-entrance">
              <span className="small-line" /> MODA, BELEZA & MUITO DE VOCÊ
            </p>
            <h1 className="hero-entrance">
              Vista quem
              <br />
              <em>você é.</em>
              <Spark className="hero-spark" />
            </h1>
            <p className="hero-description hero-entrance">
              E descubra tudo o que pode ser.
              <br />
              Looks que encantam. Detalhes que surpreendem.
              <br className="desktop-break" /> Um lugar para se sentir bem.
            </p>
            <div className="hero-actions hero-entrance">
              <Action href="#colecoes" external={false}>
                Encontre seu próximo look
              </Action>
              <a className="text-link" href={store.hello} target="_blank" rel="noopener noreferrer">
                Converse com a gente <ArrowUpRight size={16} />
              </a>
            </div>
            <a href="#seu-presente" className="hero-gift hero-entrance">
              <span className="gift-number">
                20<span>%</span>
              </span>
              <span>
                <strong>Um presente de boas-vindas.</strong>
                <small>OFF na sua primeira compra na loja.</small>
              </span>
              <ArrowUpRight size={19} />
            </a>
          </div>
          <div className="hero-visual">
            <div className="hero-image-frame">
              <AmbientVideo
                name="chocolate-em-cena"
                poster="feminino-chocolate"
                alt="Look em tom chocolate com acessórios dourados da Eme gê"
                enabled={!paused && !selection}
                priority
              />
              <div className="hero-image-caption">
                <span>O ESTILO É SEU.</span>
                <span>A DESCOBERTA É AQUI.</span>
              </div>
            </div>
            <div className="hero-detail">
              <Photo
                name="jeans-detalhe"
                alt="Detalhe de jeans com lenço verde e acessórios"
                priority
                sizes="180px"
              />
              <span>É sobre os detalhes.</span>
            </div>
            <div className="hero-seal" aria-hidden="true">
              <svg className="seal-ring" viewBox="0 0 120 120">
                <defs>
                  <path id="seal-circle" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
                </defs>
                <text>
                  <textPath href="#seal-circle" textLength="280">
                    VISTA QUEM VOCÊ É • EME GÊ MODAS •{" "}
                  </textPath>
                </text>
              </svg>
              <Spark />
            </div>
            <span className="hero-side-note" aria-hidden="true">
              EME GÊ / UMA NOVA DESCOBERTA
            </span>
          </div>
          <div className="hero-bottom">
            <a href="#colecoes">
              CONTINUE A DESCOBERTA <ArrowDown size={15} />
            </a>
            <MotionControl paused={paused} onToggle={() => setPaused((value) => !value)} />
          </div>
        </section>

        <div className="style-ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((i) => (
              <div className="ticker-group" key={i}>
                <span>Seu estilo.</span>
                <Spark />
                <span>Seu momento.</span>
                <Spark />
                <span>Seu jeito de ser.</span>
                <Spark />
                <span>Sua Eme gê.</span>
                <Spark />
              </div>
            ))}
          </div>
        </div>

        <section id="colecoes" className="collections section-space">
          <div className="section-heading container" data-reveal>
            <div>
              <p className="eyebrow">01 / ESCOLHA A SUA DESCOBERTA</p>
              <h2>
                Um universo.
                <br />
                <em>Todo seu.</em>
              </h2>
            </div>
            <p>
              Para você, para os pequenos,
              <br />
              para quem faz parte da sua vida.
              <br />
              <strong>Deixe o seu olhar escolher.</strong>
            </p>
          </div>
          <div className="collection-tabs container" role="group" aria-label="Filtrar coleção">
            {collections.map((item, index) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={category === index}
                aria-controls="collection-panel"
                onClick={() => setCategory(index)}
              >
                <span>{item.label}</span>
                <span className="tab-number">0{index + 1}</span>
              </button>
            ))}
          </div>
          <div id="collection-panel" className="container collection-panel" key={collection.id}>
            <div className="collection-intro">
              <h3>{collection.headline}</h3>
              <p>{collection.description}</p>
            </div>
            <div className="look-grid">
              {collection.looks.map((look, index) => (
                <button
                  type="button"
                  key={look.id}
                  className="look-card"
                  aria-label={`Ver ${look.name}`}
                  onClick={() => setSelection({ looks: collection.looks, index })}
                  style={delay(index * 80)}
                >
                  <div className="look-image">
                    <Photo
                      name={look.image}
                      alt={look.name}
                      position={look.position}
                      sizes="(max-width: 700px) 47vw, 25vw"
                    />
                    <span className="look-index">0{index + 1}</span>
                    {look.video && (
                      <span className="video-label">
                        <Play size={11} fill="currentColor" /> COM VÍDEO
                      </span>
                    )}
                    <span className="look-expand">
                      <Plus size={20} />
                    </span>
                  </div>
                  <div className="look-caption">
                    <div>
                      <span>{look.category}</span>
                      <h4>{look.name}</h4>
                    </div>
                    <ArrowUpRight size={19} />
                  </div>
                </button>
              ))}
            </div>
            <div className="collection-bottom">
              <span>{collection.brands}</span>
              <a className="text-link" href={store.hello} target="_blank" rel="noopener noreferrer">
                Vamos encontrar o seu? <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="beauty-note container">
            <Spark />
            <p>
              E o toque final? <strong>Beleza que acompanha você.</strong>
            </p>
            <span>Quem Disse, Berenice? · Eudora · O.U.I.</span>
            <a
              href={store.hello}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Consultar produtos de beleza"
            >
              <ArrowUpRight />
            </a>
          </div>
        </section>

        <section id="em-movimento" className="motion-section section-space">
          <div className="container section-heading" data-reveal>
            <div>
              <p className="eyebrow">02 / DÊ PLAY NO SEU PRÓXIMO LOOK</p>
              <h2>
                Moda que <em>se move.</em>
                <br />
                Com você.
              </h2>
            </div>
            <div className="film-heading-aside">
              <p>
                O caimento. O brilho. O movimento.
                <br />
                Tem coisa que você precisa ver de perto.
              </p>
              <div className="rail-buttons">
                <button
                  type="button"
                  className="circle-button"
                  aria-label="Vídeos anteriores"
                  onClick={() => moveFilms(-1)}
                >
                  <ArrowLeft />
                </button>
                <button
                  type="button"
                  className="circle-button"
                  aria-label="Próximos vídeos"
                  onClick={() => moveFilms(1)}
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
          <div className="film-rail" ref={filmRail} aria-label="Looks em vídeo">
            {films.map((film, index) => (
              <button
                type="button"
                className="film-card"
                key={film.id}
                onClick={() => setSelection({ looks: films, index, film: true })}
                onPointerEnter={() => setHoveredFilm(index)}
                onPointerLeave={() => setHoveredFilm(null)}
                onFocus={() => setHoveredFilm(index)}
                onBlur={() => setHoveredFilm(null)}
                aria-label={`Assistir ${film.name}`}
              >
                <AmbientVideo
                  name={film.video!}
                  poster={film.image}
                  alt={film.name}
                  enabled={
                    !paused &&
                    !selection &&
                    (hoveredFilm === index || (hoveredFilm === null && index === 0))
                  }
                />
                <span className="film-top">
                  <span>EME GÊ EM CENA</span>
                  <span>0{index + 1}</span>
                </span>
                <span className="film-play">
                  <Play size={22} fill="currentColor" />
                </span>
                <span className="film-caption">
                  <small>{film.category}</small>
                  <strong>{film.name}</strong>
                  <span>
                    VER O LOOK <ArrowUpRight size={14} />
                  </span>
                </span>
              </button>
            ))}
          </div>
          <div className="container film-bottom">
            <span>Looks reais. Detalhes de verdade.</span>
            <span>
              TOQUE PARA VER MAIS <ArrowUpRight size={14} />
            </span>
          </div>
        </section>

        <section className="detail-story section-space">
          <div className="container detail-layout">
            <div className="detail-composition" data-reveal>
              <div className="detail-main">
                <Photo
                  name="joias-colar"
                  alt="Detalhes de colar e pulseiras da Eme gê"
                  sizes="(max-width: 700px) 80vw, 40vw"
                />
              </div>
              <div className="detail-small">
                <Photo name="rasteira-caramelo" alt="Rasteiras caramelo com laço" sizes="240px" />
              </div>
              <span className="detail-script">Um toque de você.</span>
              <Spark className="detail-spark" />
            </div>
            <div className="detail-copy" data-reveal>
              <p className="eyebrow">03 / NADA AQUI É SÓ UM DETALHE</p>
              <h2>
                O look muda.
                <br />
                <em>
                  A essência
                  <br />é sua.
                </em>
              </h2>
              <p>
                A peça que veste bem. O sapato que fecha a combinação. O acessório que parece ter
                sido feito para você.
              </p>
              <p>
                Na Eme gê, cada escolha abre uma possibilidade. E a gente está aqui para descobrir a
                sua, junto com você.
              </p>
              <button type="button" className="text-link" onClick={() => selectCategory(4)}>
                Descubra os detalhes <ArrowUpRight size={17} />
              </button>
              <div className="detail-price">
                <span>ESTILO QUE CABE NA VIDA REAL</span>
                <p>
                  Peças a partir de <strong>R$ 59,90</strong>
                </p>
                <small>Consulte modelos e disponibilidade com a equipe.</small>
              </div>
            </div>
          </div>
        </section>

        <section id="experiencia" className="store-story section-space">
          <div className="container store-layout">
            <div className="store-copy" data-reveal>
              <p className="eyebrow">04 / O JEITO EME GÊ</p>
              <h2>
                Entre pelo look.
                <br />
                Fique pelo
                <br />
                <em>acolhimento.</em>
              </h2>
              <p>
                Você não precisa chegar sabendo o que procura. Pode vir para olhar, experimentar,
                conversar. O café e a atenção já fazem parte da experiência.
              </p>
              <div className="store-features">
                <span>
                  <Coffee size={19} /> Café e bolachinha
                </span>
                <span>
                  <Heart size={19} /> Atendimento que escuta
                </span>
                <span>
                  <Check size={19} /> Provador agradável
                </span>
                <span>
                  <Check size={19} /> Ambiente climatizado
                </span>
              </div>
              <a className="text-link" href="#visite">
                Faça uma visita <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="store-photo" data-reveal>
              <Photo
                name="fachada"
                alt="Fachada real da Eme gê modas na Avenida Brasília, em Espigão Alto do Iguaçu"
                sizes="(max-width: 700px) 100vw, 50vw"
              />
              <div className="store-photo-label">
                <span>UM LUGAR PARA CHAMAR DE SEU.</span>
                <MapPin size={18} />
              </div>
              <span className="store-tag">
                Pode entrar.
                <br />
                <em>A casa é sua.</em>
              </span>
            </div>
          </div>
          <div className="container store-history" data-reveal>
            <div>
              <span className="history-year">
                2026<span>UM NOVO CAPÍTULO.</span>
              </span>
            </div>
            <div>
              <h3>
                Uma nova loja.
                <br />
                Uma confiança de muitos anos.
              </h3>
              <p>
                Depois de anos de relações e amizade no comércio da cidade, mãe e filha deram vida a
                um espaço próprio. Em março de 2026, a Eme gê abriu as portas: uma loja renovada,
                feita para Espigão Alto do Iguaçu e toda a região.
              </p>
            </div>
            <blockquote>
              <span aria-hidden="true">“</span>
              <p>Adoro ser atendida por você. Muito sucesso nessa jornada de vocês.</p>
              <cite>MENSAGEM DE CLIENTE · WHATSAPP</cite>
            </blockquote>
          </div>
        </section>

        <section className="conditional section-space">
          <div className="container conditional-layout">
            <div data-reveal>
              <p className="eyebrow">05 / NO SEU TEMPO, DO SEU JEITO</p>
              <h2>
                Seu provador.
                <br />
                <em>Seu endereço.</em>
              </h2>
              <p className="conditional-intro">
                Experimente com calma, combine com o que já ama e escolha no conforto da sua casa.
              </p>
              <div className="conditional-note">
                <span>O CONDICIONAL EME GÊ</span>
                <p>
                  Disponível para clientes com crediário Eme gê. Combine condições e prazo com a
                  nossa equipe.
                </p>
              </div>
              <Action href={store.conditional} light>
                Quero conhecer o condicional
              </Action>
            </div>
            <div className="steps" data-reveal>
              {conditionalSteps.map((item, index) => (
                <div className={`step${step === index ? " step-active" : ""}`} key={item.title}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={step === index}
                      aria-controls={`step-panel-${index}`}
                      id={`step-button-${index}`}
                      onClick={() => setStep(index)}
                    >
                      <span className="step-number">0{index + 1}</span>
                      <span>{item.title}</span>
                      <Plus size={20} />
                    </button>
                  </h3>
                  <div
                    id={`step-panel-${index}`}
                    role="region"
                    aria-labelledby={`step-button-${index}`}
                    hidden={step !== index}
                  >
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
              <div className="step-track" aria-hidden="true">
                {conditionalSteps.map((item, index) => (
                  <span key={item.title} className={index <= step ? "filled" : ""} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="seu-presente" className="offer-section section-space">
          <div className="container offer-layout" data-reveal>
            <div className="offer-visual">
              <span className="offer-eyebrow">SEJA BEM-VINDA. SEJA BEM-VINDO.</span>
              <div className="offer-number">
                <span>20</span>
                <span>
                  <b>%</b>
                  <small>OFF</small>
                </span>
              </div>
              <div className="offer-underline">
                <Spark />
                <span>NA SUA PRIMEIRA COMPRA</span>
                <Spark />
              </div>
            </div>
            <div className="offer-copy">
              <p className="eyebrow">06 / SUA PRIMEIRA DESCOBERTA</p>
              <h2>
                O prazer é nosso.
                <br />
                <em>O presente é seu.</em>
              </h2>
              <p>
                Seu próximo look vem com um convite especial:{" "}
                <strong>20% de desconto na primeira compra na loja.</strong>
              </p>
              <p>É só contar no atendimento que conheceu a Eme gê por esta página.</p>
              <Action href={store.offer}>Quero aproveitar meus 20% OFF</Action>
              <small>Válido na primeira compra na loja física.</small>
            </div>
          </div>
        </section>

        <section className="vip-section">
          <div className="vip-photos" aria-hidden="true">
            <Photo name="blusa-lilas" alt="" />
            <Photo name="joias-dourado" alt="" />
            <Photo name="look-rosa" alt="" />
          </div>
          <div className="vip-copy" data-reveal>
            <p className="eyebrow">GRUPO VIP EME GÊ</p>
            <h2>
              Viu primeiro.
              <br />
              <em>Se apaixonou primeiro.</em>
            </h2>
            <p>Novidades, ofertas e achados especiais, direto no seu WhatsApp.</p>
            <Action href={store.vip}>Quero fazer parte do VIP</Action>
          </div>
          <Spark className="vip-spark" />
        </section>

        <section id="visite" className="visit-section section-space">
          <div className="container visit-heading" data-reveal>
            <p className="eyebrow">A PRÓXIMA DESCOBERTA É PESSOALMENTE.</p>
            <h2>
              Seu melhor look
              <br />
              começa com um <em>olá.</em>
              <Spark />
            </h2>
          </div>
          <div className="container visit-grid">
            <div className="visit-invitation" data-reveal>
              <p>
                Passe para um café.
                <br />
                Fique para se descobrir.
              </p>
              <a className="text-link" href={store.hello} target="_blank" rel="noopener noreferrer">
                Mande um olá no WhatsApp <ArrowUpRight size={19} />
              </a>
            </div>
            <address data-reveal>
              <MapPin />
              <div>
                <span>ENCONTRE A EME GÊ</span>
                <strong>Av. Brasília, 535 · Centro</strong>
                <p>Espigão Alto do Iguaçu · PR</p>
                <a
                  className="text-link"
                  href={store.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Como chegar <ArrowUpRight size={16} />
                </a>
              </div>
            </address>
            <div className="visit-social" data-reveal>
              <Instagram />
              <div>
                <span>CONTINUE A DESCOBERTA</span>
                <strong>@emege.modas</strong>
                <p>Inspirações para os seus dias.</p>
                <a
                  className="text-link"
                  href={store.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nos encontre no Instagram <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top">
          <span>MODA · CALÇADOS · JOIAS · BELEZA</span>
          <a href="#inicio">
            DE VOLTA AO INÍCIO <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="container footer-wordmark">
          <Wordmark footer />
          <p>
            Porque se amar
            <br />é o seu melhor look.
          </p>
        </div>
        <div className="container footer-bottom">
          <span>Eme gê modas · Espigão Alto do Iguaçu, PR</span>
          <a href={store.hello} target="_blank" rel="noopener noreferrer">
            (46) 9 9930-2444
          </a>
          <MotionControl paused={paused} onToggle={() => setPaused((value) => !value)} />
        </div>
      </footer>
      <a
        className="floating-contact"
        href={store.hello}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Eme gê pelo WhatsApp"
      >
        <MessageCircle size={22} />
        <span>
          Vamos encontrar
          <br />
          <strong>o seu próximo look?</strong>
        </span>
        <ArrowUpRight size={17} />
      </a>
      <LookDialog selection={selection} onChange={setSelection} />
    </div>
  );
}
