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

  /* ---------- Count-up facts (removed) ---------- */

  /* ---------- Parallax on terrasse bg ---------- */
  const para = document.querySelector("[data-parallax]");
  if (para && !prefersReduced) {
    window.addEventListener("scroll", () => {
      const r = para.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      para.style.transform = `translateY(${r.top * -0.12}px)`;
    }, { passive: true });
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
