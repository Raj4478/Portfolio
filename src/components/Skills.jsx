import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { langColor } from "../lib/utils";

const EXTRA_SKILLS = [
  { name: "React", color: "#61dafb" },
  { name: "Node.js", color: "#68a063" },
  { name: "Docker", color: "#2496ed" },
  { name: "Git", color: "#f05032" },
  { name: "REST APIs", color: "#4f8ef7" },
  { name: "SQL", color: "#336791" },
  { name: "Linux", color: "#fcc624" },
  { name: "CI/CD", color: "#34d399" },
  { name: "System Design", color: "#a78bfa" },
  { name: "Agile / Scrum", color: "#f59e0b" },
];

function SkillPill({ name, color, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06, y: -2 }}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0f1622] border border-[rgba(99,130,195,0.12)] cursor-default select-none hover:border-[rgba(79,142,247,0.3)] transition-all duration-200"
    >
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
      <span className="text-sm font-medium text-[#a8c3ff]">{name}</span>
    </motion.div>
  );
}

const EXPERTISE = [
  { area: "Frontend", skills: ["React", "TypeScript", "CSS/Tailwind", "Framer Motion"], level: 90 },
  { area: "Backend", skills: ["Node.js", "Python", "REST APIs", "GraphQL"], level: 85 },
  { area: "DevOps", skills: ["Docker", "CI/CD", "Linux", "Cloud"], level: 75 },
  { area: "Database", skills: ["SQL", "MongoDB", "Redis", "Query Opt."], level: 80 },
];

function ExpertiseBar({ area, skills, level, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="p-5 rounded-2xl bg-[#0f1622] border border-[rgba(99,130,195,0.12)]"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-display font-semibold text-white">{area}</h4>
        <span className="text-sm font-mono text-[#4f8ef7]">{level}%</span>
      </div>
      <div className="w-full h-1.5 bg-[#162033] rounded-full mb-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #4f8ef7, #a78bfa)" }}
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((s) => (
          <span key={s} className="text-xs font-mono text-[#6b7fa3] px-2 py-0.5 bg-[#162033] rounded-md">
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills({ languages }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  // Merge GitHub languages + extras, deduplicate
  const langPills = languages.map((l) => ({ name: l, color: langColor(l) }));
  const combined = [
    ...langPills,
    ...EXTRA_SKILLS.filter((e) => !languages.includes(e.name)),
  ];

  return (
    <section id="skills" className="py-32 relative">
      {/* Subtle separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(79,142,247,0.2)] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <p className="font-mono text-xs text-[#4f8ef7] tracking-[0.2em] uppercase mb-3">
            // tech stack
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Skills &{" "}
            <span className="gradient-text">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,1fr] gap-12">
          {/* Left: Expertise bars */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs text-[#6b7fa3] tracking-widest uppercase mb-6">Proficiency</h3>
            {EXPERTISE.map((e, i) => (
              <ExpertiseBar key={e.area} {...e} index={i} />
            ))}
          </div>

          {/* Right: Pills */}
          <div>
            <h3 className="font-mono text-xs text-[#6b7fa3] tracking-widest uppercase mb-6">Technologies</h3>
            <div className="flex flex-wrap gap-2.5">
              {combined.map((skill, i) => (
                <SkillPill key={skill.name} name={skill.name} color={skill.color} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
