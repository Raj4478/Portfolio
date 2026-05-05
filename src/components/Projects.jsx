import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, GitFork, ExternalLink, Calendar, Eye } from "lucide-react";
import { GithubIcon } from "./Icons";
import { langColor, timeAgo } from "../lib/utils";

function ProjectCard({ repo, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative h-full"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-1 rounded-2xl blur-xl pointer-events-none z-0"
            style={{ background: `radial-gradient(circle, ${langColor(repo.language)}18, transparent 70%)` }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 glass rounded-2xl p-4 sm:p-5 neon-border h-full flex flex-col transition-all duration-300 group-hover:border-[rgba(79,142,247,0.35)]">
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, ${langColor(repo.language)}, transparent)` }} />

        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: langColor(repo.language) + "20", border: `1px solid ${langColor(repo.language)}30` }}>
            <GithubIcon size={14} style={{ color: langColor(repo.language) }} />
          </div>
          <div className="flex gap-2 ml-2">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
              className="text-[#6b7fa3] hover:text-white transition-colors p-1">
              <GithubIcon size={14} />
            </a>
            {repo.homepage && (
              <a href={repo.homepage} target="_blank" rel="noopener noreferrer"
                className="text-[#6b7fa3] hover:text-[#4f8ef7] transition-colors p-1">
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        <h3 className="font-display font-semibold text-white text-sm sm:text-base mb-2 group-hover:text-[#a8c3ff] transition-colors">
          {repo.name}
        </h3>
        <p className="text-[#6b7fa3] text-xs sm:text-sm leading-relaxed flex-1 mb-3 line-clamp-3">
          {repo.description || "No description provided."}
        </p>

        {/* Topics */}
        {repo.topics?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {repo.topics.slice(0, 3).map((t) => (
              <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#162033] text-[#6b7fa3] border border-[rgba(99,130,195,0.1)]">
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[rgba(99,130,195,0.08)] text-xs text-[#6b7fa3]">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {repo.language && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: langColor(repo.language) }} />
                <span className="hidden sm:inline">{repo.language}</span>
              </span>
            )}
            <span className="flex items-center gap-0.5"><Star size={10} />{repo.stargazers_count}</span>
            <span className="flex items-center gap-0.5"><GitFork size={10} />{repo.forks_count}</span>
          </div>
          <span className="font-mono text-[10px] flex items-center gap-1 flex-shrink-0">
            <Calendar size={9} />{timeAgo(repo.updated_at)}
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
    <section id="projects" className="py-20 sm:py-32 relative">
      <div className="section-divider" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-16">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-12 sm:mb-16">
          <p className="font-mono text-xs text-[#4f8ef7] tracking-[0.2em] uppercase mb-3">03. projects</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            Things I've <span className="gradient-text">Built</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {visible.map((repo, i) => (
            <ProjectCard key={repo.id} repo={repo} index={i} />
          ))}
          {repos.length === 0 && Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 sm:h-52 rounded-2xl bg-[#0f1622] animate-pulse" />
          ))}
        </div>

        {repos.length > 6 && (
          <div className="flex justify-center mt-8 sm:mt-10">
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm neon-border text-[#a8c3ff] hover:text-white transition-all"
            >
              <Eye size={14} />
              {showAll ? "Show Less" : `Show All ${repos.length} Projects`}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
