import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-[#050810]">
      {/* Animated logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="font-display font-bold text-3xl"
      >
        <span className="text-[#a78bfa]">&lt;</span>
        <span className="gradient-text">RS</span>
        <span className="text-[#a78bfa]">/&gt;</span>
      </motion.div>

      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-10 h-10 rounded-full border-2 border-[rgba(79,142,247,0.15)] border-t-[#4f8ef7]"
      />

      {/* Loading text */}
      <motion.p
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="font-mono text-xs text-[#6b7fa3] tracking-widest"
      >
        loading portfolio...
      </motion.p>
    </div>
  );
}
