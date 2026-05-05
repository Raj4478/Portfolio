import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Copy, Check, Send, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

const LINKS = [
  { icon: Mail, label: "Email", value: "Singhrajeshwar28@gmail.com", href: "mailto:Singhrajeshwar28@gmail.com", color: "#4f8ef7", copy: true },
  { icon: GithubIcon, label: "GitHub", value: "github.com/Raj4478", href: "https://github.com/Raj4478", color: "#a8c3ff" },
  { icon: LinkedinIcon, label: "LinkedIn", value: "rajeshwar-singh-b6990419a", href: "https://linkedin.com/in/rajeshwar-singh-b6990419a", color: "#0077b5" },
  { icon: Phone, label: "Phone", value: "+91 83602 34759", href: "tel:+918360234759", color: "#34d399" },
  { icon: MapPin, label: "Location", value: "Chandigarh, India", href: null, color: "#f59e0b" },
];

function LinkCard({ icon: Icon, label, value, href, color, copy: canCopy, index }) {
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  function handleClick(e) {
    if (canCopy) {
      e.preventDefault();
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const El = href ? motion.a : motion.div;
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <El ref={ref} {...props} onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 glass rounded-2xl neon-border cursor-pointer transition-all duration-300 active:scale-95"
    >
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: color + "15", border: `1px solid ${color}30` }}>
        <Icon size={17} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] sm:text-xs font-mono text-[#6b7fa3] mb-0.5">{label}</p>
        <p className="text-xs sm:text-sm font-medium text-white truncate">{value}</p>
      </div>
      {canCopy && (
        <div className="text-[#6b7fa3] flex-shrink-0">
          {copied ? <Check size={13} className="text-[#34d399]" /> : <Copy size={13} />}
        </div>
      )}
    </El>
  );
}

export default function Contact({ user }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="contact" className="py-20 sm:py-32 relative">
      <div className="section-divider" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(79,142,247,0.06), transparent 70%)" }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-14 sm:pt-16 relative z-10">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-12 sm:mb-16">
          <p className="font-mono text-xs text-[#4f8ef7] tracking-[0.2em] uppercase mb-3">05. contact</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-[#6b7fa3] text-sm sm:text-base max-w-lg leading-relaxed">
            Currently open to SDE-II opportunities in backend, full-stack, or distributed systems.
            Let's build something great together.
          </p>
        </motion.div>

        {/* Stack on mobile, side-by-side on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start">
          {/* Links */}
          <div className="space-y-2.5 sm:space-y-3">
            {LINKS.map((l, i) => <LinkCard key={l.label} {...l} index={i} />)}
          </div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
          >
            <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 neon-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(167,139,250,0.12), transparent)" }} />
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">👋</div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2 sm:mb-3">Let's Work Together</h3>
                <p className="text-[#6b7fa3] text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                  Full-Stack Engineer with production experience at a YC-backed startup.
                  Specialized in NestJS, AWS, React, and high-scale distributed systems.
                </p>
                <div className="space-y-2.5 mb-6 sm:mb-8 font-mono text-xs text-[#6b7fa3]">
                  {["Open to SDE-II / Backend roles", "Available for freelance projects", "Happy to discuss system design"].map((t, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] flex-shrink-0" />
                      {t}
                    </div>
                  ))}
                </div>
                <motion.a
                  href="mailto:Singhrajeshwar28@gmail.com"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 rounded-xl font-display font-semibold text-sm text-[#050810]"
                  style={{ background: "linear-gradient(135deg, #4f8ef7, #a78bfa)" }}
                >
                  <Send size={14} /> Send a Message
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
