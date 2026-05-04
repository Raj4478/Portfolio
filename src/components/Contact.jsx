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
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group flex items-center gap-4 p-5 glass rounded-2xl neon-border cursor-pointer transition-all duration-300"
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
        style={{ background: color + "15", border: `1px solid ${color}30` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-mono text-[#6b7fa3] mb-0.5">{label}</p>
        <p className="text-sm font-medium text-white truncate">{value}</p>
      </div>
      {canCopy && (
        <div className="text-[#6b7fa3]">
          {copied ? <Check size={14} className="text-[#34d399]" /> : <Copy size={14} />}
        </div>
      )}
    </El>
  );
}

export default function Contact({ user }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="contact" className="py-32 relative">
      <div className="section-divider" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(79,142,247,0.06), transparent 70%)" }} />
      </div>
      <div className="max-w-5xl mx-auto px-6 pt-16 relative z-10">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-16">
          <p className="font-mono text-xs text-[#4f8ef7] tracking-[0.2em] uppercase mb-3">05. contact</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-[#6b7fa3] max-w-lg leading-relaxed">
            Currently open to SDE-II opportunities in backend, full-stack, or distributed systems. Let's build something great together.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-3">
            {LINKS.map((l, i) => <LinkCard key={l.label} {...l} index={i} />)}
          </div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}>
            <div className="glass rounded-3xl p-8 neon-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(167,139,250,0.12), transparent)" }} />
              <div className="relative z-10">
                <div className="text-4xl mb-4">👋</div>
                <h3 className="font-display font-bold text-2xl text-white mb-3">Let's Work Together</h3>
                <p className="text-[#6b7fa3] text-sm leading-relaxed mb-6">
                  I'm Rajeshwar, a Full-Stack Engineer with production experience at a YC-backed startup. Specialized in NestJS, AWS, React, and high-scale distributed systems.
                </p>
                <div className="space-y-3 mb-8 font-mono text-xs text-[#6b7fa3]">
                  {["Open to SDE-II / Backend roles", "Available for freelance projects", "Happy to discuss system design"].map((t, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                      {t}
                    </div>
                  ))}
                </div>
                <motion.a href="mailto:Singhrajeshwar28@gmail.com"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-display font-semibold text-sm text-[#050810]"
                  style={{ background: "linear-gradient(135deg, #4f8ef7, #a78bfa)" }}>
                  <Send size={15} /> Send a Message
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
