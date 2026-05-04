import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Mail,  ArrowDown, Zap } from "lucide-react";
import ParticleBackground from "./ParticleBackground";
import CountUp from "react-countup";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } } };

export default function Hero({ user, totalStars, reposCount }) {
  return (
    <section id="about" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Particles */}
      <ParticleBackground />

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-60 z-0" />

      {/* Radial glow center */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(79,142,247,0.07) 0%, transparent 65%)" }} />
        <div className="absolute top-2/3 right-10 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 65%)" }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 w-full relative z-10">
        <div className="grid lg:grid-cols-[1fr,380px] gap-16 items-center">

          {/* LEFT */}
          <motion.div variants={stagger} initial="hidden" animate="show">

            {/* Badge */}
            <motion.div variants={item} className="mb-6">
              <span className="inline-flex items-center gap-2.5 text-xs font-mono px-4 py-2 rounded-full glass border border-[rgba(52,211,153,0.25)] text-[#34d399]">
                <span className="relative flex h-2 w-2">
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
            <motion.h1 variants={item}
              className="font-display font-bold leading-[0.95] mb-4"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>
              <span className="text-white text-glow">Rajeshwar</span><br />
              <span className="gradient-text">Singh</span>
            </motion.h1>

            {/* Type animation */}
            <motion.div variants={item} className="mb-6 h-10 flex items-center">
              <span className="font-display text-xl md:text-2xl text-[#6b7fa3] mr-2">I build</span>
              <TypeAnimation
                sequence={[
                  "distributed systems.", 2000,
                  "scalable backends.", 2000,
                  "React frontends.", 2000,
                  "AWS pipelines.", 2000,
                  "full-stack products.", 2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="font-display text-xl md:text-2xl text-[#4f8ef7] font-semibold"
              />
            </motion.div>

            {/* Bio */}
            <motion.p variants={item}
              className="text-[#8898b8] text-base leading-relaxed max-w-lg mb-8">
              Full-Stack SDE at <span className="text-white font-medium">Bimaplan (YC-backed)</span>. 
              Architecting claims automation pipelines integrating 4 insurers — AES-256 encryption, SQS FIFO, OCR processing — 
              cutting claim time by <span className="text-[#34d399] font-mono">65%</span> and errors by <span className="text-[#34d399] font-mono">90%</span>.
            </motion.p>

            {/* CTA row */}
            <motion.div variants={item} className="flex flex-wrap gap-3 mb-10">
              <motion.a href="#projects" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm font-display text-[#050810] relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #4f8ef7, #a78bfa)" }}>
                <span className="relative z-10 flex items-center gap-2">
                  <Zap size={14} /> View Projects
                </span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              </motion.a>

              <motion.a href={`mailto:${user?.email || "Singhrajeshwar28@gmail.com"}`}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm font-display neon-border text-[#a8c3ff] hover:text-white transition-all">
                <Mail size={14} /> Hire Me
              </motion.a>

              <motion.a href={user?.html_url || "https://github.com/Raj4478"}
                target="_blank" whileHover={{ scale: 1.04 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-[#6b7fa3] glass hover:text-white transition-all">
                <GithubIcon size={16} />
              </motion.a>

              <motion.a href="https://linkedin.com/in/rajeshwar-singh-b6990419a"
                target="_blank" whileHover={{ scale: 1.04 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-[#6b7fa3] glass hover:text-[#0077b5] transition-all">
                <LinkedinIcon2 size={16} />
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="flex gap-8">
              {[
                { end: reposCount || 0, suffix: "+", label: "Repositories" },
                { end: totalStars || 0, suffix: "", label: "Total Stars" },
                { end: 99, suffix: ".8%", label: "System Uptime" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display font-bold text-2xl text-white">
                    <CountUp end={s.end} duration={2.5} suffix={s.suffix} enableScrollSpy scrollSpyOnce />
                  </div>
                  <div className="text-xs font-mono text-[#6b7fa3] mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — avatar card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22,1,0.36,1] }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-30"
                style={{ background: "linear-gradient(135deg, #4f8ef7, #a78bfa)" }} />

              <div className="relative glass rounded-3xl p-6 neon-border">
                {/* Terminal header */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[rgba(99,130,195,0.12)]">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="ml-2 font-mono text-xs text-[#6b7fa3]">raj4478.profile</span>
                </div>

                {/* Avatar */}
                <div className="relative mx-auto w-36 h-36 mb-5 float">
                  <div className="absolute inset-0 rounded-full blur-xl opacity-60"
                    style={{ background: "linear-gradient(135deg, #4f8ef7, #a78bfa)" }} />
                  <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-[rgba(79,142,247,0.4)]">
                    {user?.avatar_url
                      ? <img src={user.avatar_url} alt="Rajeshwar" className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-gradient-to-br from-[#4f8ef7] to-[#a78bfa] flex items-center justify-center text-4xl font-display font-bold text-white">R</div>
                    }
                  </div>
                  {/* Orbit */}
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-14px] rounded-full border border-dashed border-[rgba(79,142,247,0.2)]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#4f8ef7]"
                      style={{ boxShadow: "0 0 8px #4f8ef7" }} />
                  </motion.div>
                </div>

                {/* Info */}
                <div className="text-center mb-5">
                  <p className="font-display font-bold text-white text-lg">Rajeshwar Singh</p>
                  <p className="text-sm text-[#4f8ef7] font-mono mt-1">Full-Stack Engineer</p>
                  <p className="text-xs text-[#6b7fa3] mt-1">📍 Chandigarh, India</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {["NestJS","TypeScript","AWS","React","PostgreSQL"].map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#4f8ef715] text-[#4f8ef7] border border-[rgba(79,142,247,0.2)]">{t}</span>
                  ))}
                </div>

                {/* Terminal lines */}
                <div className="font-mono text-[11px] space-y-1.5 text-[#6b7fa3]">
                  <div><span className="text-[#34d399]">→</span> <span className="text-white">Bimaplan</span> SDE-I</div>
                  <div><span className="text-[#34d399]">→</span> MCA · CGC Jhanjeri</div>
                  <div><span className="text-[#34d399]">→</span> YC-backed company</div>
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

        {/* Scroll cue */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#4f8ef7] to-transparent scroll-line" />
          <ArrowDown size={12} className="text-[#4f8ef7]" />
        </motion.div>
      </div>
    </section>
  );
}
