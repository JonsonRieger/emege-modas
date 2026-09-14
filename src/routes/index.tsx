import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowDown, ArrowRight, Instagram, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/712544399_17867221623685031_5817965705577672871_n.jpg.asset.json";
import facadeAsset from "@/assets/WhatsApp_Image_2026-09-14_at_15.46.27.jpeg.asset.json";
import whiteLookAsset from "@/assets/WhatsApp_Image_2026-09-14_at_15.20.05.jpeg.asset.json";
import denimLookAsset from "@/assets/WhatsApp_Image_2026-09-11_at_09.22.10.jpeg.asset.json";
import blouseAsset from "@/assets/WhatsApp_Image_2026-09-04_at_16.52.18.jpeg.asset.json";
import mensAsset from "@/assets/WhatsApp_Image_2026-09-10_at_10.54.26.jpeg.asset.json";
import shoesAsset from "@/assets/WhatsApp_Image_2026-09-01_at_08.36.12.jpeg.asset.json";
import testimonialOneAsset from "@/assets/WhatsApp_Image_2026-09-14_at_15.56.16.jpeg.asset.json";
import testimonialTwoAsset from "@/assets/WhatsApp_Image_2026-09-14_at_15.59.56.jpeg.asset.json";

const whatsapp = (message: string) =>
  `https://wa.me/5546999302444?text=${encodeURIComponent(message)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eme gê modas | Moda e beleza em Espigão Alto" },
      { name: "description", content: "Descubra moda, calçados, joias e beleza na Eme gê modas. Ganhe 20% OFF na primeira compra e fale conosco pelo WhatsApp." },
      { property: "og:title", content: "Eme gê modas | Vista quem você é" },
      { property: "og:description", content: "Elegância, acolhimento e estilo em Espigão Alto do Iguaçu. 20% OFF na primeira compra." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function Index() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <main className="bg-background text-foreground">
      <div className="fixed left-0 top-0 z-[70] h-0.5 bg-gold transition-[width] duration-150" style={{ width: `${progress}%` }} />

      <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-5 text-primary-foreground sm:px-10 lg:px-16">
        <a href="#inicio" aria-label="Eme gê modas — início" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Logo Eme gê modas" className="h-14 w-14 rounded-full border border-primary-foreground/30 object-cover shadow-editorial" />
        </a>
        <a href="#visite" className="hidden text-[0.67rem] font-medium tracking-[0.2em] story-link sm:block">ESPIGÃO ALTO DO IGUAÇU · PR</a>
      </header>

      <section id="inicio" className="relative min-h-[94svh] overflow-hidden bg-wine text-primary-foreground">
        <img src={whiteLookAsset.url} alt="Look feminino branco da Eme gê modas" className="hero-image absolute inset-0 h-full w-full object-cover object-[52%_35%] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-wine/90 via-wine/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-wine/80 via-transparent to-wine/20" />
        <div className="relative z-10 mx-auto flex min-h-[94svh] max-w-[1480px] flex-col justify-end px-5 pb-14 pt-28 sm:px-10 lg:px-16 lg:pb-20">
          <p className="mb-5 text-[0.65rem] font-medium tracking-[0.28em] text-primary-foreground/80">MODA · BELEZA · DESCOBERTA</p>
          <h1 className="max-w-4xl font-display text-[clamp(3rem,7.5vw,7.8rem)] leading-[0.92]">
            <span className="hero-word block">Vista quem você é.</span>
            <span className="hero-word block italic text-blush-soft">Descubra quem pode ser.</span>
          </h1>
          <div className="mt-7 flex max-w-3xl flex-col gap-6 border-t border-primary-foreground/25 pt-6 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-xl text-sm font-light leading-relaxed text-primary-foreground/85 sm:text-base">Moda, beleza e estilo para você se sentir ainda mais você — com qualidade, elegância e preços que fazem sentido.</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild variant="cream" size="editorial"><a href="#visite">QUERO CONHECER <ArrowDown /></a></Button>
              <Button asChild variant="editorialOutline" size="editorial"><a href={whatsapp("Olá! Conheci a Eme gê pela landing page e quero saber mais.")} target="_blank" rel="noreferrer">FALAR NO WHATSAPP</a></Button>
            </div>
          </div>
          <div className="mt-7 flex max-w-3xl items-center gap-4 border-l border-gold pl-4">
            <strong className="font-display text-3xl font-normal text-blush-soft sm:text-4xl">20% OFF</strong>
            <p className="max-w-sm text-xs leading-relaxed text-primary-foreground/80"><span className="font-semibold text-primary-foreground">na primeira compra.</span> Na loja, diga que conheceu a Eme gê por esta página.</p>
          </div>
          <div className="absolute bottom-4 right-7 hidden items-center gap-3 text-[0.58rem] tracking-[0.2em] lg:flex"><span>DESCUBRA</span><span className="scroll-line h-10 w-px bg-primary-foreground/70" /></div>
        </div>
      </section>

      <section className="flex min-h-[45vh] items-center justify-center px-6 py-28 text-center">
        <Reveal><p className="font-display text-[clamp(2.2rem,5vw,5rem)] italic leading-tight text-primary">“Porque se amar é<br />o seu melhor look.”</p></Reveal>
      </section>

      <section className="overflow-hidden bg-cream py-24 lg:py-36">
        <div className="mx-auto grid max-w-[1380px] gap-14 px-5 sm:px-10 lg:grid-cols-12 lg:px-16">
          <Reveal className="lg:col-span-5 lg:pt-20">
            <p className="mb-4 text-[0.65rem] tracking-[0.22em] text-primary">A EXPERIÊNCIA EME GÊ</p>
            <h2 className="font-display text-5xl leading-[1.02] sm:text-6xl">Você não precisa saber exatamente o que procura.</h2>
            <p className="mt-7 max-w-md text-base font-light leading-8 text-muted-foreground">Às vezes você chega procurando uma peça. E sai encontrando um look, uma ideia, uma descoberta — e uma versão de você que ainda não tinha imaginado.</p>
          </Reveal>
          <div className="grid grid-cols-7 gap-3 lg:col-span-7 lg:gap-5">
            <Reveal className="editorial-image col-span-4 aspect-[3/5]"><img src={denimLookAsset.url} alt="Cliente experimentando look feminino na Eme gê" loading="lazy" /></Reveal>
            <div className="col-span-3 flex flex-col gap-3 pt-16 lg:gap-5 lg:pt-28">
              <Reveal className="editorial-image aspect-[3/4]"><img src={blouseAsset.url} alt="Blusinha feminina em destaque na Eme gê" loading="lazy" /></Reveal>
              <Reveal><p className="border-l border-gold pl-4 font-display text-xl italic leading-snug">Um provador gostoso.<br />Um atendimento que escuta.<br />Um café que acolhe.</p></Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-wine py-24 text-primary-foreground lg:py-36">
        <div className="mx-auto grid max-w-[1380px] items-center gap-12 px-5 sm:px-10 lg:grid-cols-2 lg:px-16">
          <Reveal className="editorial-image aspect-[4/5] max-h-[760px]"><img src={facadeAsset.url} alt="Fachada da loja Eme gê modas em Espigão Alto do Iguaçu" loading="lazy" /></Reveal>
          <Reveal className="lg:pl-14">
            <p className="mb-4 text-[0.65rem] tracking-[0.22em] text-blush-soft">ENTRE. RESPIRE. FIQUE À VONTADE.</p>
            <h2 className="font-display text-5xl leading-none sm:text-7xl">Aqui, você é mais do que uma cliente.</h2>
            <p className="mt-8 max-w-xl text-base font-light leading-8 text-primary-foreground/75">A Eme gê nasceu para fazer cada pessoa se sentir bem ao entrar pela porta. Nossa missão é ajudar você a encontrar aquilo que combina com seu estilo, seu momento e com a pessoa que você é.</p>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-primary-foreground/20 pt-7 text-xs tracking-[0.1em] text-primary-foreground/80"><span>ILUMINAÇÃO QUENTE</span><span>PROVADOR AGRADÁVEL</span><span>ATENDIMENTO RECEPTIVO</span><span>CAFÉ E BOLACHINHA</span><span>AMBIENTE CLIMATIZADO</span><span>ORGANIZAÇÃO E CUIDADO</span></div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-10 lg:px-16">
          <Reveal className="max-w-4xl"><p className="mb-4 text-[0.65rem] tracking-[0.22em] text-primary">O UNIVERSO EME GÊ</p><h2 className="font-display text-5xl leading-none sm:text-7xl">Um universo de estilo para você e para quem você ama.</h2></Reveal>
          <div className="mt-16 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[250px] md:grid-cols-4 lg:gap-5">
            <Reveal className="editorial-image relative col-span-2 row-span-2"><img src={whiteLookAsset.url} alt="Moda feminina Eme gê" loading="lazy" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-wine/85 to-transparent p-6 pt-24 text-primary-foreground"><p className="text-xs tracking-[0.2em]">FEMININO</p><p className="mt-2 text-xs text-primary-foreground/70">Zee Rucci · Bruna e Bia · Cativa · Pink Lu</p></div></Reveal>
            <Reveal className="relative col-span-2 overflow-hidden bg-blush-soft p-7 md:row-span-1"><p className="text-xs tracking-[0.2em] text-primary">INFANTIL</p><h3 className="mt-4 max-w-xs font-display text-3xl">Pequenos estilos, grandes descobertas.</h3><p className="mt-4 text-xs text-muted-foreground">RalaKids · Trajadinhos · entre outras</p></Reveal>
            <Reveal className="editorial-image relative"><img src={mensAsset.url} alt="Moda masculina Eme gê" loading="lazy" /><p className="absolute bottom-4 left-4 text-xs tracking-[0.18em] text-primary-foreground drop-shadow">MASCULINO</p></Reveal>
            <Reveal className="editorial-image relative"><img src={shoesAsset.url} alt="Calçados Eme gê" loading="lazy" /><p className="absolute bottom-4 left-4 text-xs tracking-[0.18em] text-primary-foreground drop-shadow">CALÇADOS</p></Reveal>
            <Reveal className="col-span-2 flex items-center justify-between border-y border-border px-5"><div><p className="text-xs tracking-[0.18em]">JOIAS & SEMIJOIAS</p><p className="mt-2 text-sm text-muted-foreground">Aleska</p></div><div className="text-right"><p className="text-xs tracking-[0.18em]">BELEZA</p><p className="mt-2 text-sm text-muted-foreground">Quem Disse Berenice? · Eudora · O.U.I.</p></div></Reveal>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-blush-soft py-24 lg:py-36">
        <div className="mx-auto grid max-w-[1380px] gap-10 px-5 sm:px-10 lg:grid-cols-12 lg:px-16">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start"><p className="mb-4 text-[0.65rem] tracking-[0.22em] text-primary">FEMININO</p><h2 className="font-display text-6xl leading-[0.95] sm:text-8xl">Seu estilo começa aqui.</h2><p className="mt-8 font-display text-2xl italic text-primary">Qualidade que você sente.<br />Elegância que você veste.</p></Reveal>
          <div className="grid grid-cols-2 gap-4 lg:col-span-7">
            <Reveal className="editorial-image col-span-2 aspect-[4/3]"><img src={denimLookAsset.url} alt="Look feminino com blusa e jeans" loading="lazy" /></Reveal>
            <Reveal className="editorial-image aspect-[3/4]"><img src={blouseAsset.url} alt="Blusinha feminina clara" loading="lazy" /></Reveal>
            <Reveal className="editorial-image mt-12 aspect-[3/4]"><img src={whiteLookAsset.url} alt="Conjunto feminino branco" loading="lazy" /></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground lg:py-28">
        <Reveal className="mx-auto flex max-w-[1200px] flex-col items-center px-5 text-center sm:px-10">
          <p className="text-[0.65rem] tracking-[0.24em] text-blush-soft">ELEGÂNCIA POSSÍVEL</p>
          <h2 className="mt-5 font-display text-4xl sm:text-6xl">Elegância não precisa ser inacessível.</h2>
          <p className="mt-10 border-y border-primary-foreground/25 py-7 font-display text-[clamp(3.2rem,8vw,7rem)] leading-none">Looks a partir de <span className="text-blush-soft">R$ 59,90</span></p>
          <p className="mt-7 max-w-2xl text-sm font-light leading-7 text-primary-foreground/80">Peças selecionadas, diferentes estilos e uma curadoria pensada para oferecer qualidade e custo-benefício — sem abrir mão da elegância.</p>
        </Reveal>
      </section>

      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
          <Reveal className="text-center"><p className="text-[0.65rem] tracking-[0.22em] text-primary">PALAVRAS REAIS</p><h2 className="mt-4 font-display text-5xl sm:text-7xl">Qualidade que faz você voltar.</h2></Reveal>
          <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal className="lg:pr-12"><blockquote className="font-display text-3xl leading-snug sm:text-4xl">“Adoro ser atendida por você. Muito sucesso nessa jornada de vocês.”</blockquote><p className="mt-6 text-xs tracking-[0.18em] text-muted-foreground">MENSAGEM REAL DE CLIENTE · WHATSAPP</p></Reveal>
            <div className="grid grid-cols-2 gap-3"><Reveal className="editorial-image aspect-[9/16] shadow-editorial"><img src={testimonialOneAsset.url} alt="Depoimento real de cliente sobre o atendimento da Eme gê" loading="lazy" /></Reveal><Reveal className="editorial-image mt-10 aspect-[9/16] shadow-editorial"><img src={testimonialTwoAsset.url} alt="Depoimento real de cliente sobre look da Eme gê" loading="lazy" /></Reveal></div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 lg:py-36">
        <div className="mx-auto max-w-[1250px] px-5 sm:px-10 lg:px-16">
          <Reveal className="max-w-3xl"><p className="text-[0.65rem] tracking-[0.22em] text-primary">O CONDICIONAL EME GÊ</p><h2 className="mt-4 font-display text-5xl leading-none sm:text-7xl">E se o seu provador pudesse ser a sua casa?</h2></Reveal>
          <div className="mt-16 grid gap-px bg-border md:grid-cols-4">
            {["Escolha", "Leve", "Experimente", "Fique com o que ama"].map((step, index) => <Reveal key={step} className="group bg-cream p-7 transition-colors hover:bg-blush-soft"><span className="font-display text-4xl text-gold">0{index + 1}</span><h3 className="mt-12 font-display text-2xl">{step}</h3><ArrowRight className="mt-5 text-primary transition-transform group-hover:translate-x-2" /></Reveal>)}
          </div>
          <Reveal><p className="mt-8 max-w-3xl text-sm leading-7 text-muted-foreground">Para clientes que possuem crediário Eme gê, existe a possibilidade de levar peças para casa, experimentar com calma e devolver aquilo que não vai ficar, pagando apenas pelo que escolheu.</p></Reveal>
        </div>
      </section>

      <section className="bg-wine py-24 text-primary-foreground">
        <Reveal className="mx-auto flex max-w-[1100px] flex-col items-start gap-10 px-5 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16">
          <div><p className="text-[0.65rem] tracking-[0.22em] text-blush-soft">GRUPO VIP EME GÊ</p><h2 className="mt-4 max-w-2xl font-display text-5xl leading-none sm:text-7xl">Chegue antes. Aproveite primeiro.</h2><p className="mt-6 max-w-xl text-sm font-light leading-7 text-primary-foreground/75">Receba novidades, ofertas e descontos especiais diretamente no WhatsApp.</p></div>
          <Button asChild variant="cream" size="editorial"><a href={whatsapp("Olá! Quero entrar no Grupo VIP Eme gê e receber as novidades.")} target="_blank" rel="noreferrer">QUERO ENTRAR NO GRUPO VIP <ArrowRight /></a></Button>
        </Reveal>
      </section>

      <section className="py-24 lg:py-40">
        <div className="mx-auto grid max-w-[1300px] gap-14 px-5 sm:px-10 lg:grid-cols-2 lg:px-16">
          <Reveal className="editorial-image aspect-[3/4] lg:order-2"><img src={facadeAsset.url} alt="Loja Eme gê modas, inaugurada em março de 2026" loading="lazy" /></Reveal>
          <Reveal className="lg:pt-20"><p className="text-[0.65rem] tracking-[0.22em] text-primary">NOSSA HISTÓRIA</p><h2 className="mt-4 font-display text-5xl leading-none sm:text-7xl">Antes da Eme gê, já existia uma coisa: confiança.</h2><div className="mt-8 space-y-5 text-sm font-light leading-7 text-muted-foreground"><p>A sogra das proprietárias trabalhou durante muitos anos no comércio da cidade, construindo relações de confiança e amizade com suas clientes.</p><p>Quando deixou seu antigo trabalho, ela e sua filha transformaram essa experiência em algo próprio. Compraram uma loja, repaginaram completamente o espaço e, em março de 2026, nasceu a Eme gê modas.</p><p>Uma loja renovada, elegante, acolhedora e completa — feita para Espigão Alto do Iguaçu e toda a região.</p></div><p className="mt-10 border-l border-gold pl-5 font-display text-2xl italic leading-snug">“Porque uma loja pode mudar. Um ambiente pode crescer. Mas confiança é algo que se constrói com o tempo.”</p></Reveal>
        </div>
      </section>

      <section id="visite" className="relative min-h-[80vh] overflow-hidden bg-wine text-primary-foreground">
        <img src={denimLookAsset.url} alt="Look Eme gê modas" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-wine via-wine/80 to-transparent" />
        <Reveal className="relative z-10 mx-auto flex min-h-[80vh] max-w-[1380px] flex-col justify-center px-5 py-24 sm:px-10 lg:px-16">
          <p className="text-[0.65rem] tracking-[0.22em] text-blush-soft">SEU PRÓXIMO LOOK</p><h2 className="mt-4 max-w-4xl font-display text-5xl leading-none sm:text-7xl lg:text-8xl">Pode estar esperando por você.</h2>
          <div className="mt-8 max-w-2xl border-l border-gold pl-5"><p className="font-display text-4xl text-blush-soft">20% OFF na primeira compra</p><p className="mt-3 text-sm font-light leading-7 text-primary-foreground/75">Ao visitar nossa loja, diga que veio pela landing page e ganhe 20% OFF na sua primeira compra.</p></div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild variant="cream" size="editorial"><a href={whatsapp("Olá! Conheci a Eme gê pela landing page e quero aproveitar 20% OFF na minha primeira compra.")} target="_blank" rel="noreferrer">QUERO CONHECER A EME GÊ</a></Button><Button asChild variant="editorialOutline" size="editorial"><a href={whatsapp("Olá! Quero conversar com a Eme gê.")} target="_blank" rel="noreferrer">FALAR PELO WHATSAPP</a></Button></div>
          <p className="mt-12 font-display text-2xl italic">Porque se amar é o seu melhor look.</p>
        </Reveal>
      </section>

      <footer className="bg-foreground px-5 py-14 text-background sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1380px] gap-10 md:grid-cols-3 md:items-end"><div><img src={logoAsset.url} alt="Eme gê modas" className="h-20 w-20 rounded-full object-cover" /><p className="mt-4 text-xs tracking-[0.18em] text-background/60">MODA · CALÇADOS · JOIAS · BELEZA</p></div><address className="not-italic text-sm leading-7 text-background/70"><strong className="text-background">Eme gê modas</strong><br />Av. Brasília, 535 - Centro<br />Espigão Alto do Iguaçu - PR<br />WhatsApp: (46) 9 9930-2444</address><div className="flex gap-3 md:justify-end"><Button asChild variant="cream" size="icon"><a href="https://www.instagram.com/emege.modas" target="_blank" rel="noreferrer" aria-label="Instagram da Eme gê"><Instagram /></a></Button><Button asChild variant="cream" size="icon"><a href={whatsapp("Olá! Vim pelo site da Eme gê.")} target="_blank" rel="noreferrer" aria-label="WhatsApp da Eme gê"><MessageCircle /></a></Button><Button asChild variant="cream" size="icon"><a href="https://www.google.com/maps/search/?api=1&query=Av.+Brasília,+535,+Espigão+Alto+do+Iguaçu,+PR" target="_blank" rel="noreferrer" aria-label="Como chegar à Eme gê"><MapPin /></a></Button></div></div>
      </footer>

      <Button asChild variant="editorial" className="whatsapp-float fixed bottom-4 right-4 z-50 rounded-full px-4 shadow-editorial sm:bottom-6 sm:right-6" aria-label="Falar com a Eme gê no WhatsApp"><a href={whatsapp("Olá! Quero conhecer a Eme gê.")} target="_blank" rel="noreferrer"><MessageCircle /><span className="hidden sm:inline">FALAR COM A EME GÊ</span></a></Button>
    </main>
  );
}
