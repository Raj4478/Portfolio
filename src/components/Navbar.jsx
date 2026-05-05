import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled || open ? "glass border-b border-[rgba(99,130,195,0.1)]" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <motion.a href="#" className="font-mono text-sm text-[#4f8ef7] flex items-center gap-1.5" whileHover={{ scale: 1.04 }}>
            <span className="text-[#a78bfa]">&lt;</span>
            <span className="font-bold">{user?.login || "raj4478"}</span>
            <span className="text-[#a78bfa]">/&gt;</span>
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV.map((item, i) => (
              <motion.a key={item.href} href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="relative px-3 lg:px-4 py-2 text-sm text-[#6b7fa3] hover:text-white transition-colors group font-medium"
              >
                <span className="text-[#4f8ef7] font-mono text-xs mr-1">0{i+1}.</span>
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#4f8ef7] to-[#a78bfa] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            <motion.a href={user?.html_url || "https://github.com/Raj4478"} target="_blank"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="ml-3 px-4 py-2 text-sm font-mono text-[#4f8ef7] neon-border rounded-lg hover:text-white transition-all">
              Resume ↗
            </motion.a>
          </div>

          {/* Hamburger */}
          <motion.button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg glass text-[#6b7fa3] hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
            whileTap={{ scale: 0.92 }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-64 z-50 md:hidden glass border-l border-[rgba(99,130,195,0.12)] flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-[rgba(99,130,195,0.1)]">
                <span className="font-mono text-sm text-[#4f8ef7]">&lt;menu/&gt;</span>
                <button onClick={() => setOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg text-[#6b7fa3]">
                  <X size={16} />
                </button>
              </div>
              <nav className="flex flex-col p-5 gap-1 flex-1">
                {NAV.map((item, i) => (
                  <motion.a key={item.href} href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-[#a8c3ff] hover:bg-[#162033] transition-colors font-medium text-sm"
                  >
                    <span className="text-[#4f8ef7] font-mono text-xs">0{i+1}.</span>
                    {item.label}
                  </motion.a>
                ))}
              </nav>
              <div className="p-5 border-t border-[rgba(99,130,195,0.1)]">
                <a href={user?.html_url || "https://github.com/Raj4478"} target="_blank"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-mono text-sm neon-border text-[#4f8ef7] hover:text-white transition-all">
                  Resume ↗
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
