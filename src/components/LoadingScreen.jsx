import { motion } from "framer-motion";

function Skeleton({ className = "" }) {
  return (
    <div className={`rounded-lg bg-[#0f1622] animate-pulse ${className}`} />
  );
}

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav skeleton */}
      <div className="h-16 border-b border-[rgba(99,130,195,0.10)] flex items-center px-6">
        <Skeleton className="w-24 h-5" />
      </div>

      {/* Hero skeleton */}
      <div className="max-w-6xl mx-auto px-6 py-32 w-full">
        <Skeleton className="w-32 h-4 mb-8" />
        <Skeleton className="w-2/3 h-20 mb-4" />
        <Skeleton className="w-1/2 h-8 mb-6" />
        <Skeleton className="w-full max-w-md h-16 mb-10" />
        <div className="flex gap-3">
          <Skeleton className="w-36 h-12 rounded-xl" />
          <Skeleton className="w-36 h-12 rounded-xl" />
        </div>
      </div>

      {/* Centered spinner */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 rounded-full border-2 border-[rgba(79,142,247,0.2)] border-t-[#4f8ef7]"
        />
      </div>
    </div>
  );
}
