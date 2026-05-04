import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, ExternalLink, CheckCircle2 } from "lucide-react";

const JOBS = [
  {
    company: "Bimaplan",
    role: "Software Development Engineer I",
    period: "Nov 2025 – Present",
    location: "Chandigarh, India",
    badge: "YC-Backed",
    badgeColor: "#f59e0b",
    color: "#4f8ef7",
    url: "https://bimaplan.com",
    bullets: [
      "Architected 4-insurer proxy modules (Kotak, Bajaj, ICICI Pru, Tata AIG) with AES-256-CBC encryption & JWT auth",
      "Built event-driven claims document pipeline with OCR extraction → 65% faster processing",
      "Designed AWS SQS FIFO with Dead Letter Queue → 90% fewer unhandled errors",
      "Applied TypeORM indexing strategies → 55% reduction in DB response time",
      "Delivered Curebay DHC bulk upload pipeline: 33,624 policy rows across 5 months",
      "Maintained 99.8% uptime on AWS infrastructure across all partner integrations",
    ],
    tech: ["NestJS", "TypeScript", "AWS SQS", "PostgreSQL", "TypeORM", "S3", "OCR", "Docker"],
  },
  {
    company: "Vosyn",
    role: "Full-Stack Software Engineer",
    period: "Jun 2025 – Nov 2025",
    location: "Remote (Canada)",
    badge: "LinkedIn Top Startups #4",
    badgeColor: "#a78bfa",
    color: "#a78bfa",
    url: "https://vosyn.ai",
    bullets: [
      "Architected i18n framework with lazy loading per locale via CDN → 60% faster translation deploys",
      "Built custom HTML5 audio player with WebVTT subtitles → 180KB bundle reduction",
      "Achieved 95+ Lighthouse score and 98% mobile usability via code-splitting & lazy loading",
      "Handled 10K+ concurrent WebSocket translation requests at 99.5% uptime",
      "Shipped 15+ features across 3 time zones using GitHub Actions CI/CD",
    ],
    tech: ["React.js", "TypeScript", "Tailwind CSS", "WebSockets", "i18n", "GitHub Actions"],
  },
];

function JobCard({ job, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Timeline dot */}
      <div className="absolute left-[-2.15rem] top-6 hidden md:flex items-center justify-center">
        <div className="w-4 h-4 rounded-full border-2 relative"
          style={{ borderColor: job.color, background: "#050810" }}>
          <div className="absolute inset-1 rounded-full" style={{ background: job.color }} />
        </div>
      </div>

      <div className="glass rounded-2xl p-6 neon-border hover:border-[rgba(79,142,247,0.4)] transition-all duration-300 group">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display font-bold text-white text-lg">{job.role}</h3>
              <a href={job.url} target="_blank" rel="noopener noreferrer"
                className="text-[#6b7fa3] hover:text-[#4f8ef7] transition-colors opacity-0 group-hover:opacity-100">
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display font-semibold text-base" style={{ color: job.color }}>{job.company}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full border"
                style={{ color: job.badgeColor, borderColor: job.badgeColor + "40", background: job.badgeColor + "10" }}>
                {job.badge}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-mono text-[#6b7fa3]">{job.period}</div>
            <div className="text-xs text-[#6b7fa3] mt-0.5">📍 {job.location}</div>
          </div>
        </div>

        {/* Bullets */}
        <ul className="space-y-2 mb-5">
          {job.bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="flex items-start gap-2.5 text-sm text-[#8898b8] leading-relaxed"
            >
              <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: job.color }} />
              <span dangerouslySetInnerHTML={{
                __html: b
                  .replace(/(\d+%)/g, '<span class="text-[#34d399] font-mono font-medium">$1</span>')
                  .replace(/(\d{2,3},\d{3}|\d{2,3}\+?K?)/g, '<span class="text-[#a8c3ff] font-mono">$1</span>')
              }} />
            </motion.li>
          ))}
        </ul>

        {/* Tech */}
        <div className="flex flex-wrap gap-2">
          {job.tech.map((t) => (
            <span key={t} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#162033] text-[#6b7fa3] border border-[rgba(99,130,195,0.1)]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="experience" className="py-32 relative">
      <div className="section-divider mb-0" />
      <div className="max-w-4xl mx-auto px-6 pt-16">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-16">
          <p className="font-mono text-xs text-[#4f8ef7] tracking-[0.2em] uppercase mb-3">02. experience</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Where I've <span className="gradient-text">Worked</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative md:pl-10">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "linear-gradient(to bottom, transparent, #4f8ef740, #a78bfa40, transparent)" }} />

          <div className="space-y-6">
            {JOBS.map((job, i) => <JobCard key={job.company} job={job} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
