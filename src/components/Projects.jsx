import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, GitFork, ExternalLink, Calendar } from "lucide-react";
import { langColor, timeAgo } from "../lib/utils";

function ProjectCard({ repo, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.a
      ref={ref}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative block rounded-2xl bg-[#0f1622] border border-[rgba(99,130,195,0.12)] p-6 card-glow transition-all duration-300 overflow-hidden"
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${langColor(repo.language)}, transparent)` }}
      />

      {/* Glow spot on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 30% 20%, ${langColor(repo.language)}08, transparent 60%)` }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-display font-semibold text-white text-base leading-tight group-hover:text-[#a8c3ff] transition-colors">
            {repo.name}
          </h3>
          <ExternalLink
            size={14}
            className="text-[#6b7fa3] group-hover:text-[#4f8ef7] transition-colors flex-shrink-0 mt-0.5 ml-2"
          />
        </div>

        {/* Description */}
        <p className="text-[#6b7fa3] text-sm leading-relaxed mb-5 min-h-[3em] line-clamp-3">
          {repo.description || "No description provided."}
        </p>

        {/* Topics */}
        {repo.topics?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {repo.topics.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#162033] text-[#6b7fa3] border border-[rgba(99,130,195,0.12)]"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[rgba(99,130,195,0.08)] pt-4">
          <div className="flex items-center gap-3 text-xs text-[#6b7fa3]">
            {repo.language && (
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: langColor(repo.language) }}
                />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star size={11} />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GitFork size={11} />
              {repo.forks_count}
            </span>
          </div>
          <span className="flex items-center gap-1 text-[10px] text-[#6b7fa3] font-mono">
            <Calendar size={10} />
            {timeAgo(repo.updated_at)}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects({ repos }) {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="projects" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-[#4f8ef7] tracking-[0.2em] uppercase mb-3">
            // featured work
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">
            Projects &<br />
            <span className="gradient-text">Open Source</span>
          </h2>
        </motion.div>

        {repos.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-52 rounded-2xl bg-[#0f1622] animate-pulse border border-[rgba(99,130,195,0.08)]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {repos.map((repo, i) => (
              <ProjectCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
