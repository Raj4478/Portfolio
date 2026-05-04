import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, GitFork, ExternalLink, Calendar, Eye } from "lucide-react";
import { langColor, timeAgo } from "../lib/utils";

function ProjectCard({ repo, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      {/* Glow on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -inset-1 rounded-2xl blur-xl pointer-events-none z-0"
            style={{ background: `radial-gradient(circle, ${langColor(repo.language)}20, transparent 70%)` }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 glass rounded-2xl p-5 neon-border h-full flex flex-col transition-all duration-300 group-hover:border-[rgba(79,142,247,0.35)]">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, ${langColor(repo.language)}, transparent)` }} />

        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: langColor(repo.language) + "20", border: `1px solid ${langColor(repo.language)}30` }}>
            <GithubIcon size={16} style={{ color: langColor(repo.language) }} />
          </div>
          <div className="flex gap-2">
            <motion.a href={repo.html_url} target="_blank"
              whileHover={{ scale: 1.15 }} className="text-[#6b7fa3] hover:text-white transition-colors">
              <GithubIcon size={15} />
            </motion.a>
            {repo.homepage && (
              <motion.a href={repo.homepage} target="_blank"
                whileHover={{ scale: 1.15 }} className="text-[#6b7fa3] hover:text-[#4f8ef7] transition-colors">
                <ExternalLink size={15} />
              </motion.a>
            )}
          </div>
        </div>

        <h3 className="font-display font-semibold text-white text-base mb-2 group-hover:text-[#a8c3ff] transition-colors">
          {repo.name}
        </h3>
        <p className="text-[#6b7fa3] text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
          {repo.description || "No description provided."}
        </p>

        {/* Topics */}
        {repo.topics?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {repo.topics.slice(0, 3).map((t) => (
              <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#162033] text-[#6b7fa3] border border-[rgba(99,130,195,0.1)]">
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[rgba(99,130,195,0.08)] text-xs text-[#6b7fa3]">
          <div className="flex items-center gap-3">
            {repo.language && (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: langColor(repo.language) }} />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1"><Star size={11} />{repo.stargazers_count}</span>
            <span className="flex items-center gap-1"><GitFork size={11} />{repo.forks_count}</span>
          </div>
          <span className="font-mono text-[10px] flex items-center gap-1">
            <Calendar size={10} />{timeAgo(repo.updated_at)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ repos }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? repos : repos.slice(0, 6);

  return (
    <section id="projects" className="py-32 relative">
      <div className="section-divider" />
      <div className="max-w-6xl mx-auto px-6 pt-16">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-16">
          <p className="font-mono text-xs text-[#4f8ef7] tracking-[0.2em] uppercase mb-3">03. projects</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Things I've <span className="gradient-text">Built</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((repo, i) => <ProjectCard key={repo.id} repo={repo} index={i} />)}
          {repos.length === 0 && Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-52 rounded-2xl bg-[#0f1622] animate-pulse" />
          ))}
        </div>

        {repos.length > 6 && (
          <motion.div className="flex justify-center mt-10">
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-sm neon-border text-[#a8c3ff] hover:text-white transition-all"
            >
              <Eye size={14} />
              {showAll ? "Show Less" : `Show All ${repos.length} Projects`}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
