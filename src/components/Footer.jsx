import { motion } from "framer-motion";
import { GitBranch, Heart } from "lucide-react";

export default function Footer({ user }) {
  return (
    <footer className="border-t border-[rgba(99,130,195,0.10)] py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono text-[#6b7fa3]">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#a8c3ff]">{user?.name || user?.login || "Developer"}</span>
          {" "}· Built with React & Framer Motion
        </p>
        <div className="flex items-center gap-4">
          {user?.html_url && (
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b7fa3] hover:text-white transition-colors"
            >
              <GitBranch size={16} />
            </a>
          )}
          <span className="flex items-center gap-1.5 text-xs font-mono text-[#6b7fa3]">
            Made with <Heart size={11} className="text-[#f87171]" fill="currentColor" />
          </span>
        </div>
      </div>
    </footer>
  );
}
