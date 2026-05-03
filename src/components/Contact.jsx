import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GitBranch, Mail, X, Globe, MapPin, Users, Copy, Check } from "lucide-react";
import { useState } from "react";

function ContactCard({ icon: Icon, label, value, href, color, index }) {
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  function handleCopy(e) {
    if (href?.startsWith("mailto:")) {
      e.preventDefault();
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const El = href ? motion.a : motion.div;
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <El
      ref={ref}
      {...props}
      onClick={handleCopy}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group flex items-center gap-4 p-5 rounded-2xl bg-[#0f1622] border border-[rgba(99,130,195,0.12)] card-glow transition-all duration-300 cursor-pointer"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-mono text-[#6b7fa3] mb-0.5">{label}</p>
        <p className="text-sm font-medium text-white truncate">{value}</p>
      </div>
      {href?.startsWith("mailto:") && (
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

  const cards = [
    user?.html_url && {
      icon: GitBranch,
      label: "GitHub",
      value: `@${user.login}`,
      href: user.html_url,
      color: "#a8c3ff",
    },
    user?.email && {
      icon: Mail,
      label: "Email",
      value: user.email,
      href: `mailto:${user.email}`,
      color: "#4f8ef7",
    },
    user?.twitter_username && {
      icon: X,
      label: "Twitter / X",
      value: `@${user.twitter_username}`,
      href: `https://twitter.com/${user.twitter_username}`,
      color: "#1d9bf0",
    },
    user?.blog && {
      icon: Globe,
      label: "Website",
      value: user.blog.replace(/^https?:\/\//, ""),
      href: user.blog.startsWith("http") ? user.blog : `https://${user.blog}`,
      color: "#34d399",
    },
    user?.location && {
      icon: MapPin,
      label: "Location",
      value: user.location,
      href: null,
      color: "#f59e0b",
    },
    user?.followers !== undefined && {
      icon: Users,
      label: "GitHub Followers",
      value: `${user.followers} followers · ${user.following} following`,
      href: null,
      color: "#a78bfa",
    },
  ].filter(Boolean);

  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(79,142,247,0.2)] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <p className="font-mono text-xs text-[#4f8ef7] tracking-[0.2em] uppercase mb-3">
            // get in touch
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-[#6b7fa3] max-w-md leading-relaxed">
            Open to exciting opportunities, collaborations, and interesting conversations.
            Don't hesitate to reach out.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <ContactCard key={card.label} {...card} index={i} />
          ))}
        </div>

        {/* CTA email block */}
        {user?.email && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-[#0f1622] to-[#162033] border border-[rgba(79,142,247,0.2)] text-center"
          >
            <p className="text-[#6b7fa3] mb-3 font-mono text-sm">Prefer a direct line?</p>
            <a
              href={`mailto:${user.email}`}
              className="font-display font-bold text-2xl md:text-3xl gradient-text hover:opacity-80 transition-opacity"
            >
              {user.email}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
