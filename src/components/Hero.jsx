import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Mail, ArrowDown, Zap } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import ParticleBackground from "./ParticleBackground";

// ── Inline typewriter — no external dep ──────────────────────────────────────
const PHRASES = [
  "distributed systems.",
  "scalable backends.",
  "React frontends.",
  "AWS pipelines.",
  "full-stack products.",
];

function Typewriter() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = PHRASES[phraseIdx];
    let timeout;
    if (!deleting && displayed.length < full.length) {
      timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 55);
    } else if (!deleting && displayed.length === full.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % PHRASES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIdx]);

  return (
    <span className="font-display text-lg md:text-2xl text-[#4f8ef7] font-semibold">
      {displayed}
      <span className="blink text-[#a78bfa]">|</span>
    </span>
  );
}

// ── Inline count-up — no external dep ────────────────────────────────────────
function CountUp({ end, suffix = "", duration = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(ease * end));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

// ── Framer variants ───────────────────────────────────────────────────────────
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero({ user, totalStars, reposCount }) {
  return (
    <section id="about" className="relative min-h-screen flex items-center overflow-hidden">
      <ParticleBackground />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-60 z-0" />

      {/* Radial glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-64 md:h-[480px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 65%)" }}
        />
        <div
          className="absolute top-2/3 right-0 w-64 h-64 md:w-80 md:h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 65%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20 w-full relative z-10">
        <div className="grid lg:grid-cols-[1fr,360px] gap-10 xl:gap-16 items-center">

          {/* ── LEFT ── */}
          <motion.div variants={stagger} initial="hidden" animate="show">

            {/* Status badge */}
            <motion.div variants={item} className="mb-6">
              <span className="inline-flex items-center gap-2.5 text-xs font-mono px-3 sm:px-4 py-2 rounded-full glass border border-[rgba(52,211,153,0.25)] text-[#34d399]">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]" />
                </span>
                Available for SDE-II opportunities
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p variants={item} className="font-mono text-[#4f8ef7] text-sm tracking-widest mb-3">
              Hi there, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={item}
              className="font-display font-bold leading-[0.95] mb-4"
              style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)" }}
            >
              <span className="text-white text-glow">Rajeshwar</span>
              <br />
              <span className="gradient-text">Singh</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={item} className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 min-h-[2rem]">
              <span className="font-display text-lg md:text-2xl text-[#6b7fa3]">I build</span>
              <Typewriter />
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={item}
              className="text-[#8898b8] text-sm sm:text-base leading-relaxed max-w-xl mb-8"
            >
              Full-Stack SDE at{" "}
              <span className="text-white font-medium">Bimaplan (YC-backed)</span>.
              Architecting claims automation pipelines with AES-256 encryption, SQS FIFO & OCR —
              cutting claim time by{" "}
              <span className="text-[#34d399] font-mono">65%</span> and errors by{" "}
              <span className="text-[#34d399] font-mono">90%</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-2 sm:gap-3 mb-10">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm font-display text-[#050810]"
                style={{ background: "linear-gradient(135deg, #4f8ef7, #a78bfa)" }}
              >
                <Zap size={14} /> View Projects
              </motion.a>
              <motion.a
                href="mailto:Singhrajeshwar28@gmail.com"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm font-display neon-border text-[#a8c3ff] hover:text-white transition-all"
              >
                <Mail size={14} /> Hire Me
              </motion.a>
              <motion.a
                href={user?.html_url || "https://github.com/Raj4478"}
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                className="flex items-center justify-center w-10 h-10 rounded-xl text-[#6b7fa3] glass hover:text-white transition-all"
              >
                <GithubIcon size={16} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/rajeshwar-singh-b6990419a"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                className="flex items-center justify-center w-10 h-10 rounded-xl text-[#6b7fa3] glass hover:text-[#0077b5] transition-all"
              >
                <LinkedinIcon size={16} />
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="flex gap-6 sm:gap-10">
              {[
                { end: reposCount || 0, suffix: "+", label: "Repos" },
                { end: totalStars || 0, suffix: "", label: "Stars" },
                { end: 99, suffix: ".8%", label: "Uptime" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display font-bold text-xl sm:text-2xl text-white">
                    <CountUp end={s.end} suffix={s.suffix} />
                  </div>
                  <div className="text-xs font-mono text-[#6b7fa3] mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT — profile card, desktop only ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-25"
                style={{ background: "linear-gradient(135deg, #4f8ef7, #a78bfa)" }}
              />
              <div className="relative glass rounded-3xl p-6 neon-border">
                {/* Terminal dots */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[rgba(99,130,195,0.12)]">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="ml-2 font-mono text-xs text-[#6b7fa3]">raj4478.profile</span>
                </div>

                {/* Avatar */}
                <div className="relative mx-auto w-36 h-36 mb-5 float">
                  <div
                    className="absolute inset-0 rounded-full blur-xl opacity-50"
                    style={{ background: "linear-gradient(135deg, #4f8ef7, #a78bfa)" }}
                  />
                  <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-[rgba(79,142,247,0.4)]">
                    {user?.avatar_url ? (
                      <img src={user.avatar_url} alt="Rajeshwar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#4f8ef7] to-[#a78bfa] flex items-center justify-center text-4xl font-display font-bold text-white">R</div>
                    )}
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-14px] rounded-full border border-dashed border-[rgba(79,142,247,0.2)]"
                  >
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#4f8ef7]"
                      style={{ boxShadow: "0 0 8px #4f8ef7" }}
                    />
                  </motion.div>
                </div>

                {/* Info */}
                <div className="text-center mb-5">
                  <p className="font-display font-bold text-white text-lg">Rajeshwar Singh</p>
                  <p className="text-sm text-[#4f8ef7] font-mono mt-1">Full-Stack Engineer</p>
                  <p className="text-xs text-[#6b7fa3] mt-1">📍 Chandigarh, India</p>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {["NestJS", "TypeScript", "AWS", "React", "PostgreSQL"].map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#4f8ef715] text-[#4f8ef7] border border-[rgba(79,142,247,0.2)]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Terminal lines */}
                <div className="font-mono text-[11px] space-y-1.5 text-[#6b7fa3]">
                  <div><span className="text-[#34d399]">→</span> <span className="text-white">Bimaplan</span> SDE-I · YC-backed</div>
                  <div><span className="text-[#34d399]">→</span> MCA · CGC Jhanjeri</div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#34d399]">→</span>
                    <span className="text-[#a78bfa]">status:</span>
                    <span className="text-[#34d399]">open to work</span>
                    <span className="blink text-[#4f8ef7]">_</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile avatar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex lg:hidden justify-center mt-8"
        >
          <div className="relative w-24 h-24">
            <div
              className="absolute inset-0 rounded-full blur-lg opacity-50"
              style={{ background: "linear-gradient(135deg, #4f8ef7, #a78bfa)" }}
            />
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[rgba(79,142,247,0.4)]">
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt="Rajeshwar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#4f8ef7] to-[#a78bfa] flex items-center justify-center text-3xl font-display font-bold text-white">R</div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#4f8ef7] to-transparent scroll-line" />
          <ArrowDown size={12} className="text-[#4f8ef7]" />
        </motion.div>
      </div>
    </section>
  );
}
