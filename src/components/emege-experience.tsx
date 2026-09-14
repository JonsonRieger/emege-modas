import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, X } from "lucide-react";
import { media, whatsapp, type Look } from "@/lib/emege";

export function Wordmark({ footer = false }: { footer?: boolean }) {
  return (
    <span className={`wordmark${footer ? " wordmark-large" : ""}`}>
      <span>
        Eme gê<span className="wordmark-dot">.</span>
      </span>
      <small>MODAS</small>
    </span>
  );
}

export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <path
        d="M40 0c0 28-12 40-40 40 28 0 40 12 40 40 0-28 12-40 40-40C52 40 40 28 40 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Action({
  href,
  children,
  light = false,
  className = "",
  external = true,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      className={`action ${light ? "action-light" : ""} ${className}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={19} />
    </a>
  );
}

export function Photo({
  name,
  alt,
  className = "",
  priority = false,
  position,
  sizes = "(max-width: 700px) 80vw, 35vw",
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
  position?: string | undefined;
  sizes?: string;
}) {
  const poster = name.endsWith("-poster");
  return (
    <img
      className={className}
      src={media(`${name}.webp`)}
      {...(!poster
        ? { srcSet: `${media(`${name}-sm.webp`)} 560w, ${media(`${name}.webp`)} 1100w`, sizes }
        : {})}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      width={poster ? 576 : 1100}
      height={poster ? 1024 : 1650}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}

/** Downloads ambient video only near the viewport, and pauses it when hidden. */
export function AmbientVideo({
  name,
  poster,
  alt,
  enabled,
  className = "",
  priority = false,
}: {
  name: string;
  poster: string;
  alt: string;
  enabled: boolean;
  className?: string;
  priority?: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const node = video.current;
    if (!node) return;
    let visible = false;
    const update = () => {
      if (visible && enabled && !document.hidden) {
        setLoaded(true);
        if (node.getAttribute("src")) void node.play().catch(() => setPlaying(false));
      } else node.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        update();
      },
      { threshold: 0.18 },
    );
    observer.observe(node);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      node.pause();
    };
  }, [enabled, loaded]);
  return (
    <div className={`ambient ${className}`}>
      <Photo name={poster} alt={alt} priority={priority} />
      <video
        ref={video}
        {...(loaded ? { src: media(`${name}.mp4`) } : {})}
        poster={media(`${poster}.webp`)}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        className={playing ? "is-playing" : ""}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setPlaying(false)}
      />
    </div>
  );
}

export function MotionControl({ paused, onToggle }: { paused: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className="motion-control"
      onClick={onToggle}
      aria-label={paused ? "Ativar movimentos da página" : "Pausar movimentos da página"}
      aria-pressed={paused}
    >
      {paused ? <Play size={13} /> : <Pause size={13} />}
      <span>{paused ? "Ativar movimento" : "Pausar movimento"}</span>
    </button>
  );
}

export type Selection = { looks: Look[]; index: number; film?: boolean } | null;

export function LookDialog({
  selection,
  onChange,
}: {
  selection: Selection;
  onChange: (value: Selection) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [showFilm, setShowFilm] = useState(false);
  const item = selection?.looks[selection.index];
  const open = Boolean(selection);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  useEffect(() => {
    setShowFilm(Boolean(selection?.film));
  }, [selection?.index, selection?.looks, selection?.film]);

  const move = (direction: number) => {
    if (!selection) return;
    onChange({
      ...selection,
      index: (selection.index + direction + selection.looks.length) % selection.looks.length,
    });
  };

  return (
    <dialog
      ref={dialog}
      className="look-dialog"
      aria-labelledby="look-title"
      onCancel={() => onChange(null)}
      onClose={() => onChange(null)}
      onClick={(e) => {
        if (e.target === e.currentTarget) onChange(null);
      }}
      onKeyDown={(e) => {
        if ((e.target as HTMLElement).tagName === "VIDEO") return;
        if (e.key === "ArrowLeft") move(-1);
        if (e.key === "ArrowRight") move(1);
      }}
    >
      {item && selection && (
        <div className="dialog-content">
          <button
            type="button"
            className="dialog-close circle-button"
            aria-label="Fechar visualização"
            onClick={() => onChange(null)}
            autoFocus
          >
            <X />
          </button>
          <div className="dialog-media">
            {showFilm && item.video ? (
              <video
                key={item.video}
                src={media(`${item.video}.mp4`)}
                poster={media(`${item.image}.webp`)}
                controls
                autoPlay
                muted
                playsInline
                preload="metadata"
                aria-label={`Vídeo: ${item.name}`}
              />
            ) : (
              <Photo
                name={item.image}
                alt={item.name}
                priority
                sizes="(max-width: 700px) 100vw, 50vw"
              />
            )}
            {item.video && !showFilm && (
              <button type="button" className="watch-button" onClick={() => setShowFilm(true)}>
                <Play size={15} fill="currentColor" /> Ver em movimento
              </button>
            )}
          </div>
          <div className="dialog-copy">
            <p className="eyebrow">EME GÊ / {item.category}</p>
            <h2 id="look-title">{item.name}</h2>
            <p>{item.description}</p>
            <p className="availability">
              Gostou? Nossa equipe ajuda com valores, tamanhos e disponibilidade.
            </p>
            <Action
              href={whatsapp(
                `Olá! Vi "${item.name}" (${item.category}) no site da Eme gê e gostaria de consultar valores e disponibilidade.`,
              )}
            >
              Quero saber mais sobre este look
            </Action>
            <div className="dialog-navigation">
              <span>
                {String(selection.index + 1).padStart(2, "0")} /{" "}
                {String(selection.looks.length).padStart(2, "0")}
              </span>
              <div>
                <button
                  type="button"
                  className="circle-button"
                  aria-label="Ver item anterior"
                  onClick={() => move(-1)}
                >
                  <ArrowLeft />
                </button>
                <button
                  type="button"
                  className="circle-button"
                  aria-label="Ver próximo item"
                  onClick={() => move(1)}
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
