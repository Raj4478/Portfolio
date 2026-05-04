import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { langColor } from "../lib/utils";

const EXPERTISE = [
  { area: "Backend Engineering", icon: "⚙️", skills: ["NestJS", "Node.js", "Express", "FastAPI", "Django"], level: 92, color: "#4f8ef7" },
  { area: "Frontend Development", icon: "🎨", skills: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Redux"], level: 85, color: "#a78bfa" },
  { area: "Cloud & DevOps", icon: "☁️", skills: ["AWS SQS", "S3", "EC2", "Lambda", "Docker", "CI/CD"], level: 82, color: "#34d399" },
  { area: "Databases", icon: "🗄️", skills: ["PostgreSQL", "MongoDB", "TypeORM", "Query Opt.", "Redis"], level: 85, color: "#f59e0b" },
];

const TECH_STACK = [
  { name: "TypeScript", icon: "🔷" },
  { name: "JavaScript", icon: "🟡" },
  { name: "Python", icon: "🐍" },
  { name: "NestJS", icon: "🚀" },
  { name: "React.js", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Node.js", icon: "💚" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "MongoDB", icon: "🍃" },
  { name: "AWS", icon: "☁️" },
  { name: "Docker", icon: "🐳" },
  { name: "TypeORM", icon: "🔧" },
  { name: "Redux", icon: "💜" },
  { name: "Tailwind", icon: "💨" },
  { name: "Git", icon: "🔀" },
  { name: "WebSockets", icon: "🔌" },
  { name: "JWT Auth", icon: "🔐" },
  { name: "REST APIs", icon: "🌐" },
  { name: "GraphQL", icon: "◈" },
  { name: "FastAPI", icon: "⚡" },
];

function BarCard({ area, icon, skills, level, color, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass rounded-2xl p-5 neon-border hover:border-[rgba(79,142,247,0.3)] transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <h4 className="font-display font-semibold text-white text-sm">{area}</h4>
        </div>
        <span className="font-mono text-sm font-bold" style={{ color }}>{level}%</span>
      </div>

      <div className="w-full h-1.5 bg-[#162033] rounded-full mb-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: index * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full shimmer-bar"
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {skills.map((s) => (
          <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#162033] text-[#6b7fa3] border border-[rgba(99,130,195,0.1)]">{s}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills({ languages }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="skills" className="py-32 relative">
      <div className="section-divider" />
      <div className="max-w-6xl mx-auto px-6 pt-16">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-16">
          <p className="font-mono text-xs text-[#4f8ef7] tracking-[0.2em] uppercase mb-3">04. skills</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Tech <span className="gradient-text">Arsenal</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {EXPERTISE.map((e, i) => <BarCard key={e.area} {...e} index={i} />)}
        </div>

        {/* Marquee strip */}
        <div className="relative overflow-hidden py-4 mb-4">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050810] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050810] to-transparent z-10 pointer-events-none" />
          <div className="flex gap-4 marquee whitespace-nowrap">
            {[...TECH_STACK, ...TECH_STACK].map((t, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl border border-[rgba(99,130,195,0.12)] flex-shrink-0">
                <span className="text-sm">{t.icon}</span>
                <span className="text-sm font-medium text-[#a8c3ff]">{t.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub languages from actual repos */}
        {languages.length > 0 && (
          <div className="mt-8">
            <p className="font-mono text-xs text-[#6b7fa3] tracking-widest uppercase mb-4">Languages from my GitHub</p>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang, i) => (
                <motion.div key={lang}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass border border-[rgba(99,130,195,0.12)]"
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: langColor(lang) }} />
                  <span className="text-xs font-mono text-[#a8c3ff]">{lang}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
