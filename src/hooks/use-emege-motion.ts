import { useEffect } from "react";

export function useExperienceMotion(paused: boolean) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (paused) {
      nodes.forEach((n) => n.classList.remove("reveal-ready"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    nodes.forEach((node) => {
      if (node.getBoundingClientRect().top > window.innerHeight) node.classList.add("reveal-ready");
      observer.observe(node);
    });
    return () => {
      observer.disconnect();
      nodes.forEach((n) => n.classList.remove("reveal-ready"));
    };
  }, [paused]);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const update = () => {
      frame = 0;
      const total = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--page-progress", String(total > 0 ? window.scrollY / total : 0));
      root.style.setProperty(
        "--hero-drift",
        `${paused ? 0 : Math.min(window.scrollY * 0.08, 70)}px`,
      );
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      root.style.removeProperty("--hero-drift");
      root.style.removeProperty("--page-progress");
    };
  }, [paused]);
}
