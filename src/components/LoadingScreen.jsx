import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const t = setInterval(() => setDots(d => d.length >= 3 ? "." : d + "."), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#050810]">
      {/* Logo mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* Glow behind */}
        <div className="absolute inset-0 blur-2xl opacity-40 rounded-full"
          style={{ background: "radial-gradient(circle, #4f8ef7, #a78bfa)" }} />
        <div className="relative font-display font-bold text-5xl">
          <span className="text-[#a78bfa]">&lt;</span>
          <span className="gradient-text">RS</span>
          <span className="text-[#a78bfa]">/&gt;</span>
        </div>
      </motion.div>

      {/* Spinner ring */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative w-10 h-10"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-full border-2 border-[rgba(79,142,247,0.15)] border-t-[#4f8ef7]"
        />
      </motion.div>

      {/* Status text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="font-mono text-xs text-[#6b7fa3] tracking-widest"
      >
        loading portfolio{dots}
      </motion.p>
    </div>
  );
}
