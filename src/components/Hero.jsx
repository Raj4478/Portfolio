import { motion } from "framer-motion";
import { GitBranch, MapPin, Mail, ArrowDown, Briefcase } from "lucide-react";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ user, totalStars, reposCount }) {
  const nameParts = (user?.name || user?.login || "Developer").split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20" id="about">
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)" }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(79,142,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-[1fr,auto] gap-12 items-center">
          <motion.div variants={containerVariants} initial="hidden" animate="show">
            {/* Status badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border border-[rgba(52,211,153,0.3)] text-[#34d399] bg-[rgba(52,211,153,0.05)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                Open to opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-bold leading-[0.95] mb-6"
              style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}
            >
              <span className="text-white">{firstName}</span>
              {lastName && (
                <>
                  {" "}
                  <span className="gradient-text">{lastName}</span>
                </>
              )}
            </motion.h1>

            {/* Role */}
            <motion.div variants={itemVariants} className="mb-6">
              <p className="font-display font-medium text-2xl text-[#6b7fa3]">
                Software Engineer
                <span className="text-[#4f8ef7]"> / </span>
                Full Stack Developer
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-[#8898b8] text-base leading-relaxed max-w-xl mb-8"
            >
              {user?.bio ||
                `Building scalable systems and elegant interfaces. Passionate about clean architecture, developer experience, and shipping products that make a real impact.`}
            </motion.p>

            {/* Meta */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10 text-sm text-[#6b7fa3]">
              {user?.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#4f8ef7]" />
                  {user.location}
                </span>
              )}
              {user?.email && (
                <span className="flex items-center gap-1.5">
                  <Mail size={14} className="text-[#4f8ef7]" />
                  {user.email}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Briefcase size={14} className="text-[#4f8ef7]" />
                {user?.company || "Independent"}
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <a
                href={user?.html_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4f8ef7] text-[#080c14] font-semibold text-sm hover:bg-[#6ba3f8] transition-all duration-200 font-display"
              >
                <GitBranch size={15} />
                View GitHub
              </a>
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[rgba(99,130,195,0.22)] text-[#a8c3ff] font-semibold text-sm hover:bg-[#4f8ef710] hover:border-[#4f8ef740] transition-all duration-200 font-display"
              >
                See Projects
                <ArrowDown size={14} />
              </a>
              {user?.email && (
                <a
                  href={`mailto:${user.email}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[rgba(99,130,195,0.22)] text-[#6b7fa3] font-semibold text-sm hover:text-white hover:border-[rgba(99,130,195,0.4)] transition-all duration-200 font-display"
                >
                  <Mail size={14} />
                  Hire Me
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Avatar + stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col items-center gap-6"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#4f8ef750] to-[#a78bfa50] blur-xl scale-110" />
              <div className="relative w-48 h-48 rounded-full border-2 border-[rgba(79,142,247,0.3)] overflow-hidden">
                {user?.avatar_url ? (
                  <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#162033] flex items-center justify-center text-5xl font-display font-bold gradient-text">
                    {(user?.name || user?.login || "D")[0].toUpperCase()}
                  </div>
                )}
              </div>
              {/* Orbit ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-16px] rounded-full border border-dashed border-[rgba(79,142,247,0.2)]"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#4f8ef7] shadow-[0_0_8px_#4f8ef7]" />
              </motion.div>
            </div>

            {/* Stats cards */}
            {[
              { label: "Repositories", value: reposCount || 0 },
              { label: "Followers", value: user?.followers || 0 },
              { label: "Total Stars", value: totalStars || 0 },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="w-full px-5 py-3 rounded-xl bg-[#0f1622] border border-[rgba(99,130,195,0.12)] flex items-center justify-between"
              >
                <span className="text-xs text-[#6b7fa3] font-mono">{stat.label}</span>
                <span className="font-display font-bold text-white text-lg">{stat.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-[#6b7fa3] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={14} className="text-[#4f8ef7]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
