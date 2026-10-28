// Scroll-driven motion: parallax depth, heading reveals, and the "YOU" cursor
// that walks across the Selected Work canvas. Re-runs on every Astro page load.

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

let cleanup: (() => void) | undefined;

function init() {
  cleanup?.();
  if (reduced()) {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
    return;
  }
  const mobile = window.innerWidth < 1024;

  // Heading reveals — once, when they enter
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }),
    { rootMargin: '0px 0px -12% 0px' },
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

  // Parallax: data-parallax="0.15" moves the element by 15% of its scroll offset from the viewport centre
  const layers = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];

  // Selected-work cursor
  const canvas = document.querySelector<HTMLElement>('[data-canvas]');
  const cursor = canvas?.querySelector<HTMLElement>('[data-cursor]');
  const frames = canvas ? [...canvas.querySelectorAll<HTMLElement>('[data-frame]')] : [];

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    for (const el of layers) {
      const speed = Number(el.dataset.parallax) * (mobile ? 0.5 : 1);
      let y: number;
      if (el.closest('[data-parallax-scroll]')) {
        // Hero: starts exactly at its designed position, drifts as you scroll away
        y = window.scrollY * speed;
      } else {
        // In-content: shift around the viewport centre, kept inside the image's spare edge
        const r = el.parentElement!.getBoundingClientRect();
        y = clamp(-(r.top + r.height / 2 - vh / 2) * speed, -r.height * 0.035, r.height * 0.035);
      }
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    }
    if (canvas && cursor && frames.length) {
      const c = canvas.getBoundingClientRect();
      // 0 when the canvas top reaches 70% of the viewport, 1 when its bottom reaches 55%
      const p = clamp((vh * 0.7 - c.top) / (c.height + vh * 0.15));
      const pts = frames.map((f) => {
        const r = f.getBoundingClientRect();
        return { x: r.left - c.left + r.width * 0.78, y: r.top - c.top + r.height * 0.62 };
      });
      const seg = Math.min(frames.length - 1.0001, p * (frames.length - 1));
      const i = Math.floor(seg);
      const t = easeInOut(seg - i);
      const a = pts[i], b = pts[i + 1] ?? pts[i];
      cursor.style.transform = `translate3d(${a.x + (b.x - a.x) * t}px, ${a.y + (b.y - a.y) * t}px, 0)`;
      const active = Math.round(seg);
      frames.forEach((f, k) => f.classList.toggle('is-selected', k === active));
    }
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  cleanup = () => {
    io.disconnect();
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}

document.addEventListener('astro:page-load', init);
