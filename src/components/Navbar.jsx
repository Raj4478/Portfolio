import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GithubIcon } from "./Icons";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ user }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled ? "glass border-b border-[rgba(99,130,195,0.1)]" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.a
            href="#"
            className="font-mono text-sm text-[#4f8ef7] flex items-center gap-2"
            whileHover={{ scale: 1.04 }}
          >
            <span className="text-[#a78bfa]">&lt;</span>
            <span className="font-bold">{user?.login || "raj4478"}</span>
            <span className="text-[#a78bfa]">/&gt;</span>
          </motion.a>

          <div className="hidden md:flex items-center gap-1">
            {NAV.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="relative px-4 py-2 text-sm text-[#6b7fa3] hover:text-white transition-colors group font-medium"
              >
                <span className="text-[#4f8ef7] font-mono text-xs mr-1">0{i+1}.</span>
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#4f8ef7] to-[#a78bfa] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            <motion.a
              href={user?.html_url || "#"}
              target="_blank"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="ml-4 px-5 py-2 text-sm font-mono text-[#4f8ef7] neon-border rounded-lg transition-all duration-300 hover:text-white hover:glow-blue"
            >
              Resume ↗
            </motion.a>
          </div>

          <button className="md:hidden text-[#6b7fa3]" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 inset-x-0 z-30 glass border-b border-[rgba(99,130,195,0.1)] md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {NAV.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)}
                  className="text-[#a8c3ff] font-medium text-base flex items-center gap-2">
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
