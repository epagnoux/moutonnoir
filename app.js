/* Le Mouton Noir — interactions & ember shader-ish canvas */
(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Custom cursor ---------- */
  const cursor = document.querySelector(".cursor");
  let cx = -100, cy = -100, tx = cx, ty = cy;
  window.addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; });
  document.querySelectorAll("a, button, .card, .dish").forEach((el) => {
    el.addEventListener("pointerenter", () => cursor.classList.add("is-hover"));
    el.addEventListener("pointerleave", () => cursor.classList.remove("is-hover"));
  });
  (function cursorLoop() {
    cx += (tx - cx) * 0.2;
    cy += (ty - cy) * 0.2;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(cursorLoop);
  })();

  /* ---------- Nav scroll state ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Split titles into animated words ---------- */
  document.querySelectorAll(".split-title").forEach((title) => {
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((piece) => {
            if (!piece.trim()) { frag.appendChild(document.createTextNode(piece)); return; }
            const w = document.createElement("span");
            w.className = "word";
            const inner = document.createElement("span");
            inner.textContent = piece;
            w.appendChild(inner);
            frag.appendChild(w);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== "BR") {
          walk(child);
        }
      });
    };
    walk(title);
    // stagger delays
    title.querySelectorAll(".word > span").forEach((s, i) => {
      s.style.transitionDelay = `${i * 0.06}s`;
    });
  });

  /* ---------- IntersectionObserver reveals ---------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }),
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  document.querySelectorAll(".reveal, .split-title, .histoire__media").forEach((el) => io.observe(el));

  /* ---------- Gallery horizontal drift on scroll ---------- */
  const drift = document.querySelector("[data-drift]");
  if (drift && !prefersReduced) {
    window.addEventListener("scroll", () => {
      const r = drift.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const progress = 1 - (r.bottom / (innerHeight + r.height));
      const max = Math.max(drift.scrollWidth - innerWidth + 64, 0);
      drift.style.transform = `translateX(${-progress * max * 0.6}px)`;
    }, { passive: true });
  }

  /* ---------- Count-up facts ---------- */
  const counters = document.querySelectorAll(".fact__num");
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      cio.unobserve(en.target);
      const el = en.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || "";
      const t0 = performance.now(), dur = 1400;
      (function tick(t) {
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => cio.observe(c));

  /* ---------- Parallax on terrasse bg ---------- */
  const para = document.querySelector("[data-parallax]");
  if (para && !prefersReduced) {
    window.addEventListener("scroll", () => {
      const r = para.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      para.style.transform = `translateY(${r.top * -0.12}px)`;
    }, { passive: true });
  }

  /* ---------- Ember field (shader-style canvas) ---------- */
  const canvas = document.getElementById("ember-canvas");
  if (canvas) {
  const ctx = canvas.getContext("2d");
  let W, H, dpr;
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize);

  const mouse = { x: 0.5, y: 0.5, vx: 0, vy: 0 };
  window.addEventListener("pointermove", (e) => {
    const nx = e.clientX / innerWidth, ny = e.clientY / innerHeight;
    mouse.vx = nx - mouse.x; mouse.vy = ny - mouse.y;
    mouse.x = nx; mouse.y = ny;
  });

  // value-noise-ish drift using layered sines (cheap shader look)
  const EMBERS = Array.from({ length: 90 }, () => ({
    x: Math.random(), y: Math.random(),
    r: 0.6 + Math.random() * 2.2,
    s: 0.00006 + Math.random() * 0.00025,
    ph: Math.random() * Math.PI * 2,
    hue: 18 + Math.random() * 20,
  }));

  let heroVisible = true;
  new IntersectionObserver(([en]) => (heroVisible = en.isIntersecting)).observe(canvas);

  function drawEmbers(t) {
    ctx.clearRect(0, 0, W, H);

    // ambient ember glow (radial, follows mouse subtly)
    const gx = W * (0.5 + (mouse.x - 0.5) * 0.12);
    const gy = H * (0.72 + (mouse.y - 0.5) * 0.08);
    const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(W, H) * 0.55);
    glow.addColorStop(0, "rgba(224,102,42,0.20)");
    glow.addColorStop(0.4, "rgba(120,60,30,0.10)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // rising embers
    ctx.globalCompositeOperation = "lighter";
    for (const p of EMBERS) {
      const drift = Math.sin(t * p.s * 40 + p.ph) * 0.02 + mouse.vx * 0.3;
      p.y -= p.s * 16;
      p.x += drift * 0.001;
      if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
      const flicker = 0.55 + 0.45 * Math.sin(t * 0.004 + p.ph * 3);
      const x = p.x * W, y = p.y * H;
      const rad = p.r * (1 + flicker * 0.4);
      const g = ctx.createRadialGradient(x, y, 0, x, y, rad * 4);
      g.addColorStop(0, `hsla(${p.hue}, 85%, 60%, ${0.5 * flicker})`);
      g.addColorStop(1, "hsla(20, 80%, 50%, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, rad * 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";

    mouse.vx *= 0.9; mouse.vy *= 0.9;
  }

  if (prefersReduced) {
    drawEmbers(0);
  } else {
    (function loop(t) {
      if (heroVisible) drawEmbers(t);
      requestAnimationFrame(loop);
    })(0);
  }
  }

  /* ---------- Magnetic buttons ---------- */
  if (!prefersReduced) {
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
      });
      btn.addEventListener("pointerleave", () => (btn.style.transform = ""));
    });

    /* ---------- Subtle 3D tilt on media figures ---------- */
    document.querySelectorAll("[data-tilt]").forEach((fig) => {
      fig.addEventListener("pointermove", (e) => {
        const r = fig.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        fig.style.transform = `perspective(900px) rotateY(${px * 5}deg) rotateX(${-py * 5}deg)`;
      });
      fig.addEventListener("pointerleave", () => (fig.style.transform = ""));
    });
  }
})();
