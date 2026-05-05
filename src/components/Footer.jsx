import { motion } from "framer-motion";
import { Heart, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Footer({ user }) {
  const links = [
    { href: user?.html_url || "https://github.com/Raj4478", icon: GithubIcon },
    { href: "https://linkedin.com/in/rajeshwar-singh-b6990419a", icon: LinkedinIcon },
    { href: "mailto:Singhrajeshwar28@gmail.com", icon: Mail },
  ];

  return (
    <footer className="relative border-t border-[rgba(99,130,195,0.1)] py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
          <div>
            <p className="font-mono text-xs text-[#6b7fa3]">
              Designed & Built by{" "}
              <span className="text-[#a8c3ff] font-medium">{user?.name || "Rajeshwar Singh"}</span>
            </p>
            <p className="font-mono text-xs text-[#3d4f6b] mt-1">React · Framer Motion · Tailwind CSS · GitHub API</p>
          </div>
          <div className="flex items-center gap-3">
            {links.map(({ href, icon: Icon }, i) => (
              <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.92 }}
                className="w-9 h-9 glass rounded-lg flex items-center justify-center text-[#6b7fa3] hover:text-[#4f8ef7] transition-colors border border-[rgba(99,130,195,0.1)]">
                <Icon size={15} />
              </motion.a>
            ))}
          </div>
          <p className="font-mono text-xs text-[#3d4f6b] flex items-center gap-1">
            © {new Date().getFullYear()} · Made with <Heart size={10} className="text-[#f87171] mx-0.5" fill="currentColor" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
