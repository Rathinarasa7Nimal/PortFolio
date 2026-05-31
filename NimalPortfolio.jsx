import { useState, useEffect, useRef, useCallback } from "react";

/* ─── DATA ─────────────────────────────────────────────────── */
const SKILLS = [
  { name: "Java", color: "#FF6B2B", glow: "#FF6B2B" },
  { name: "Spring Boot", color: "#00C472", glow: "#00C472" },
  { name: "React.js", color: "#61DAFB", glow: "#61DAFB" },
  { name: "Node.js", color: "#84CC16", glow: "#84CC16" },
  { name: "Express.js", color: "#A78BFA", glow: "#A78BFA" },
  { name: "REST APIs", color: "#F472B6", glow: "#F472B6" },
  { name: "MySQL", color: "#FFC107", glow: "#FFC107" },
  { name: "MongoDB", color: "#10B981", glow: "#10B981" },
  { name: "Git & GitHub", color: "#F97316", glow: "#F97316" },
  { name: "Docker", color: "#38BDF8", glow: "#38BDF8" },
  { name: "OOP", color: "#E879F9", glow: "#E879F9" },
  { name: "MVC", color: "#34D399", glow: "#34D399" },
  { name: "Agile", color: "#FB923C", glow: "#FB923C" },
  { name: "Microservices", color: "#818CF8", glow: "#818CF8" },
  { name: "SDLC", color: "#F9A8D4", glow: "#F9A8D4" },
];

const EXPERIENCE = [
  {
    role: "Intern Software Engineer",
    org: "Ceylon Electricity Board",
    period: "Nov 2025 – Apr 2026",
    grad: ["#FF6B2B", "#FF3CAC"],
    icon: "⚡",
    points: [
      "Developed RBAC-based system modules using Spring Boot and React",
      "Worked with structured system design and database integration",
      "Collaborated with team members using Git version control",
      "Gained exposure to scalable application architecture and enterprise workflows",
    ],
  },
  {
    role: "Bank Trainee",
    org: "People's Bank",
    period: "2022 – 2023",
    grad: ["#2196F3", "#00BCD4"],
    icon: "🏦",
    points: [
      "Assisted in customer operations and workflow coordination",
      "Improved communication and teamwork in a professional environment",
      "Worked in a fast-paced operational setting",
    ],
  },
];

const PROJECTS = [
  {
    name: "Carryz",
    tagline: "Parcel Delivery Platform",
    desc: "MERN-stack parcel delivery platform built with REST APIs and modular architecture using Agile-style workflows.",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs"],
    emoji: "📦",
    grad: ["#667eea", "#764ba2", "#f093fb"],
    demo: "#",
    repo: "#",
  },
  {
    name: "FixMe",
    tagline: "Vehicle Service Management",
    desc: "Full-stack platform connecting vehicle owners with technicians via PHP MVC architecture and MySQL.",
    tags: ["PHP", "MySQL", "JavaScript", "MVC"],
    emoji: "🔧",
    grad: ["#f5576c", "#f093fb", "#4facfe"],
    repo: "#",
  },
  {
    name: "SilverCare",
    tagline: "Elderly Care System",
    desc: "Web-based elderly care management system with user management and service coordination features.",
    tags: ["MySQL", "Express.js", "React", "Node.js"],
    emoji: "💙",
    grad: ["#0acffe", "#495aff", "#a18cd1"],
    repo: "#",
  },
];

const CERTS = [
  { title: "Python Programming — Code in Place", org: "Stanford University", icon: "🎓", color: "#FF6B2B" },
  { title: "AWS Educate — Cloud 101", org: "Amazon Web Services", icon: "☁️", color: "#FF9800" },
  { title: "President's Award", org: "Sri Lanka Scout Association · 2021", icon: "🏅", color: "#FFC107" },
  { title: "Gavelier of the Month — May 2024", org: "Gavel Club, University of Colombo", icon: "🎤", color: "#C084FC" },
  { title: "Organising Committee Member", org: "Oration 2024 — Logistics Team", icon: "📋", color: "#38BDF8" },
];

/* ─── HOOKS ──────────────────────────────────────────────── */
function useInView(opts = {}) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.12, ...opts });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, vis];
}

function useMouse() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return pos;
}

function useTypewriter(words, speed = 80) {
  const [idx, setIdx] = useState(0);
  const [char, setChar] = useState(0);
  const [del, setDel] = useState(false);
  const [txt, setTxt] = useState("");
  useEffect(() => {
    const t = setTimeout(() => {
      const w = words[idx];
      if (!del) {
        setTxt(w.slice(0, char + 1));
        if (char + 1 === w.length) { setTimeout(() => setDel(true), 1400); return; }
        setChar(c => c + 1);
      } else {
        setTxt(w.slice(0, char - 1));
        if (char - 1 === 0) { setDel(false); setIdx(i => (i + 1) % words.length); setChar(0); return; }
        setChar(c => c - 1);
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [idx, char, del, words, speed]);
  return txt;
}

/* ─── SMALL COMPONENTS ───────────────────────────────────── */
function Reveal({ children, delay = 0, y = 32 }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : `translateY(${y}px)`,
      transition: `opacity .7s ${delay}s cubic-bezier(.22,1,.36,1), transform .7s ${delay}s cubic-bezier(.22,1,.36,1)`,
    }}>{children}</div>
  );
}

function GlowCard({ children, style = {}, hoverColor = "#7C4DFF" }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        borderRadius: 20,
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${hov ? hoverColor + "55" : "rgba(255,255,255,0.08)"}`,
        boxShadow: hov ? `0 0 32px ${hoverColor}22, inset 0 0 32px ${hoverColor}08` : "none",
        transform: hov ? "translateY(-4px)" : "none",
        transition: "all .3s cubic-bezier(.22,1,.36,1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function AnimCounter({ to, suffix = "" }) {
  const [n, setN] = useState(0);
  const [ref, vis] = useInView();
  useEffect(() => {
    if (!vis) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      setN(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [vis, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ─── PARTICLE CANVAS ────────────────────────────────────── */
function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    let W = c.width = window.innerWidth;
    let H = c.height = window.innerHeight;
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.8 + .4,
      color: ["#FF6B2B","#FF3CAC","#7C4DFF","#2196F3","#00C472"][Math.floor(Math.random() * 5)],
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "99";
        ctx.fill();
      });
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(255,255,255,${(1 - d / 110) * 0.07})`;
          ctx.lineWidth = .5; ctx.stroke();
        }
      }));
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: .7 }} />;
}

/* ─── CURSOR GLOW ────────────────────────────────────────── */
function CursorGlow() {
  const mouse = useMouse();
  return (
    <div style={{
      position: "fixed", pointerEvents: "none", zIndex: 1,
      width: 400, height: 400, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(124,77,255,0.08) 0%, transparent 70%)",
      transform: "translate(-50%,-50%)",
      left: mouse.x, top: mouse.y,
      transition: "left .08s, top .08s",
    }} />
  );
}

/* ─── SECTION WRAPPER ────────────────────────────────────── */
function Section({ label, color, children }) {
  return (
    <div style={{ padding: "3.5rem 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <Reveal>
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          marginBottom: "2rem",
        }}>
          <div style={{ width: 32, height: 3, borderRadius: 2, background: color }} />
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: ".18em",
            textTransform: "uppercase", color,
          }}>{label}</span>
        </div>
      </Reveal>
      {children}
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────────────────── */
export default function Portfolio() {
  const typed = useTypewriter(["Full-Stack Developer", "MERN Stack Engineer", "Java & Spring Boot Dev", "Open to Opportunities"]);
  const [activeProj, setActiveProj] = useState(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ fontFamily: "'Outfit',sans-serif", background: "#070710", color: "#EEF0FF", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:none} }
        @keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:1} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        * { box-sizing: border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px }
        ::-webkit-scrollbar-track { background:#070710 }
        ::-webkit-scrollbar-thumb { background:linear-gradient(#FF6B2B,#7C4DFF); border-radius:3px }
        a { text-decoration:none }
      `}</style>

      <Particles />
      <CursorGlow />

      {/* ── HERO ────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 820, margin: "0 auto", padding: "7rem 2rem 5rem" }}>
        {/* glowing orbs */}
        <div style={{ position: "absolute", top: 60, right: -80, width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,77,255,.18) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 120, left: -120, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,60,172,.12) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div style={{ opacity: 0, animation: "fadeUp .8s .05s ease forwards" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "1.5rem",
            background: "rgba(255,107,43,.12)", border: "1px solid rgba(255,107,43,.3)",
            color: "#FF6B2B", borderRadius: 100, padding: "6px 18px", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF6B2B", animation: "pulse 1.5s infinite", display: "inline-block" }} />
            Available for work · Colombo, Sri Lanka
          </div>
        </div>

        <div style={{ opacity: 0, animation: "fadeUp .8s .15s ease forwards" }}>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(3rem,10vw,5.5rem)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-.03em", marginBottom: ".5rem" }}>
            Rathinarasa
          </h1>
          <h1 style={{
            fontFamily: "'Syne',sans-serif", fontSize: "clamp(3rem,10vw,5.5rem)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-.03em", marginBottom: "1.25rem",
            background: "linear-gradient(90deg,#FF6B2B 0%,#FF3CAC 40%,#7C4DFF 80%,#2196F3 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>Nimal</h1>
        </div>

        <div style={{ opacity: 0, animation: "fadeUp .8s .25s ease forwards" }}>
          <div style={{ fontSize: "clamp(1rem,3vw,1.35rem)", color: "rgba(238,240,255,.55)", marginBottom: "2rem", fontWeight: 300, height: "2em", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "#7C4DFF", fontWeight: 600 }}>&gt;</span>
            <span style={{ color: "#EEF0FF" }}>{typed}</span>
            <span style={{ animation: "blink 1s infinite", color: "#7C4DFF", fontWeight: 300 }}>|</span>
          </div>
        </div>

        <div style={{ opacity: 0, animation: "fadeUp .8s .35s ease forwards" }}>
          <p style={{ fontSize: "1.05rem", color: "rgba(238,240,255,.55)", lineHeight: 1.75, maxWidth: 520, marginBottom: "2.5rem", fontWeight: 300 }}>
            Computer Science undergraduate at UCSC skilled in Java, Spring Boot & MERN stack. Passionate about scalable systems, clean architecture, and shipping products that matter.
          </p>
        </div>

        <div style={{ opacity: 0, animation: "fadeUp .8s .45s ease forwards" }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { label: "Email Me", href: "mailto:rathinarasanimal@gmail.com", style: { background: "linear-gradient(90deg,#FF6B2B,#FF3CAC)", color: "#fff" } },
              { label: "LinkedIn", href: "#", style: { background: "rgba(255,255,255,.06)", color: "#EEF0FF", border: "1px solid rgba(255,255,255,.12)" } },
              { label: "GitHub", href: "#", style: { background: "rgba(255,255,255,.06)", color: "#EEF0FF", border: "1px solid rgba(255,255,255,.12)" } },
              { label: "+94 76 580 9268", href: "tel:+94765809268", style: { background: "rgba(124,77,255,.15)", color: "#A78BFA", border: "1px solid rgba(124,77,255,.3)" } },
            ].map(l => (
              <a key={l.label} href={l.href} style={{
                display: "inline-flex", alignItems: "center", padding: "11px 22px",
                borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: "pointer",
                transition: "transform .2s, box-shadow .2s", ...l.style,
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* stat counters */}
        <div style={{ opacity: 0, animation: "fadeUp .8s .55s ease forwards" }}>
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "3.5rem", flexWrap: "wrap" }}>
            {[
              { n: 3, suf: "+", label: "Projects Built" },
              { n: 2, suf: "", label: "Internships" },
              { n: 15, suf: "+", label: "Tech Skills" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "2.4rem", fontWeight: 800, lineHeight: 1, background: "linear-gradient(90deg,#FF6B2B,#7C4DFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  <AnimCounter to={s.n} suffix={s.suf} />
                </div>
                <div style={{ fontSize: 12, color: "rgba(238,240,255,.4)", marginTop: 4, fontWeight: 500, letterSpacing: ".06em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 820, margin: "0 auto", padding: "0 2rem 4rem" }}>

        {/* SKILLS */}
        <Section label="Technical Arsenal" color="#FF6B2B">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {SKILLS.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.04}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "8px 18px", borderRadius: 100,
                  background: s.color + "15",
                  border: `1px solid ${s.color}35`,
                  color: s.color, fontSize: 13, fontWeight: 600,
                  cursor: "default", transition: "all .2s",
                  boxShadow: "none",
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 18px ${s.glow}44`; e.currentTarget.style.transform = "scale(1.08) translateY(-2px)"; e.currentTarget.style.border = `1px solid ${s.color}80`; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; e.currentTarget.style.border = `1px solid ${s.color}35`; }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.color, boxShadow: `0 0 8px ${s.glow}` }} />
                  {s.name}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section label="Experience" color="#FF3CAC">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {EXPERIENCE.map((e, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <GlowCard hoverColor={e.grad[0]} style={{ overflow: "hidden" }}>
                  {/* gradient top bar */}
                  <div style={{ height: 3, background: `linear-gradient(90deg,${e.grad[0]},${e.grad[1]})` }} />
                  <div style={{ padding: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{
                          width: 48, height: 48, borderRadius: 14, fontSize: 22,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: `linear-gradient(135deg,${e.grad[0]}33,${e.grad[1]}33)`,
                          border: `1px solid ${e.grad[0]}44`,
                          animation: "float 4s ease-in-out infinite",
                          animationDelay: `${i * .5}s`,
                        }}>{e.icon}</div>
                        <div>
                          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.05rem", fontWeight: 700, marginBottom: 3 }}>{e.role}</div>
                          <div style={{ fontSize: 13, fontWeight: 600, background: `linear-gradient(90deg,${e.grad[0]},${e.grad[1]})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{e.org}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 100, background: `${e.grad[0]}18`, color: e.grad[0], border: `1px solid ${e.grad[0]}44`, letterSpacing: ".06em" }}>{e.period}</div>
                    </div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                      {e.points.map((p, j) => (
                        <li key={j} style={{ display: "flex", gap: 10, fontSize: 13.5, color: "rgba(238,240,255,.65)", lineHeight: 1.6 }}>
                          <span style={{ color: e.grad[0], flexShrink: 0, fontSize: 16, lineHeight: "1.45" }}>›</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* PROJECTS */}
        <Section label="Projects" color="#7C4DFF">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.25rem" }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div
                  style={{
                    borderRadius: 22, overflow: "hidden",
                    border: activeProj === i ? `1px solid ${p.grad[0]}66` : "1px solid rgba(255,255,255,.08)",
                    transition: "all .35s cubic-bezier(.22,1,.36,1)",
                    transform: activeProj === i ? "translateY(-6px) scale(1.01)" : "none",
                    boxShadow: activeProj === i ? `0 24px 50px ${p.grad[0]}33` : "none",
                  }}
                  onMouseEnter={() => setActiveProj(i)}
                  onMouseLeave={() => setActiveProj(null)}
                >
                  {/* gradient header */}
                  <div style={{
                    padding: "2rem 1.5rem 1.5rem",
                    background: `linear-gradient(135deg,${p.grad[0]},${p.grad[1]},${p.grad[2] || p.grad[1]})`,
                    position: "relative", overflow: "hidden",
                  }}>
                    {/* shine overlay */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(255,255,255,.15) 0%,transparent 60%)", pointerEvents: "none" }} />
                    <div style={{ fontSize: 40, marginBottom: 10, animation: "float 3s ease-in-out infinite", animationDelay: `${i * .4}s`, display: "inline-block" }}>{p.emoji}</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: 3 }}>{p.name}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.7)", marginBottom: "0.75rem" }}>{p.tagline}</div>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,.8)", lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
                  {/* tags + links */}
                  <div style={{ background: "#0E0E1A", padding: "1rem 1.5rem" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "0.85rem" }}>
                      {p.tags.map(t => (
                        <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 100, background: `${p.grad[0]}22`, color: p.grad[0], border: `1px solid ${p.grad[0]}40` }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 14 }}>
                      {p.demo && <a href={p.demo} style={{ fontSize: 12, fontWeight: 700, color: p.grad[0], letterSpacing: ".06em", textTransform: "uppercase" }}>Live Demo ↗</a>}
                      <a href={p.repo} style={{ fontSize: 12, fontWeight: 700, color: "rgba(238,240,255,.45)", letterSpacing: ".06em", textTransform: "uppercase" }}>GitHub ↗</a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* EDUCATION */}
        <Section label="Education" color="#00BCD4">
          <div style={{ display: "flex", flexDirection: "column", gap: ".85rem" }}>
            {[
              { deg: "BSc in Computer Science", school: "University of Colombo School of Computing", date: "2023 – 2026", color: "#2196F3" },
              { deg: "Secondary Education", school: "Jaffna Hindu College", date: "2012 – 2020", color: "#10B981" },
            ].map((e, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <GlowCard hoverColor={e.color} style={{ padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: e.color + "22", border: `1px solid ${e.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎓</div>
                    <div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1rem", fontWeight: 700 }}>{e.deg}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: e.color, marginTop: 2 }}>{e.school}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, padding: "5px 16px", borderRadius: 100, background: e.color + "18", color: e.color, border: `1px solid ${e.color}44` }}>{e.date}</div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* CERTS */}
        <Section label="Certifications & Achievements" color="#FFC107">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: ".85rem" }}>
            {CERTS.map((c, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <GlowCard hoverColor={c.color} style={{ padding: "1.1rem 1.25rem", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: c.color + "20", border: `1px solid ${c.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.3, marginBottom: 3 }}>{c.title}</div>
                    <div style={{ fontSize: 12, color: "rgba(238,240,255,.45)" }}>{c.org}</div>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Reveal>
          <div style={{
            marginTop: "2rem", borderRadius: 28, padding: "3.5rem 2rem",
            background: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
            border: "1px solid rgba(124,77,255,.3)",
            textAlign: "center", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,77,255,.25) 0%,transparent 65%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-60px", right: "10%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,60,172,.15) 0%,transparent 65%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 40, marginBottom: "0.75rem", animation: "float 3s ease-in-out infinite" }}>👋</div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.6rem,5vw,2.5rem)", fontWeight: 800, marginBottom: ".5rem", background: "linear-gradient(90deg,#FF6B2B,#FF3CAC,#7C4DFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Let's build something great
              </h2>
              <p style={{ fontSize: 14, color: "rgba(238,240,255,.45)", marginBottom: "2rem" }}>
                Open to internships, collaborations & full-time opportunities
              </p>
              <a href="mailto:rathinarasanimal@gmail.com" style={{
                display: "inline-block", padding: "14px 36px", borderRadius: 100,
                background: "linear-gradient(90deg,#FF6B2B,#FF3CAC,#7C4DFF)",
                color: "#fff", fontWeight: 700, fontSize: 15,
                boxShadow: "0 8px 32px rgba(124,77,255,.35)",
                transition: "transform .2s, box-shadow .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(124,77,255,.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(124,77,255,.35)"; }}>
                rathinarasanimal@gmail.com
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
