import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";
import { useGitHub } from "./hooks/useGitHub";
import ErrorBoundary from "./components/ErrorBoundary";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

function Portfolio() {
  const { user, topRepos, languages, totalStars, loading, error } = useGitHub();

  if (loading) return <LoadingScreen />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="font-mono text-xs text-[#4f8ef7] mb-2">// github api error</p>
          <p className="text-[#6b7fa3] text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grain relative"
      >
        <Cursor />
        <Navbar user={user} />
        <main>
          {/* Each section wrapped in its own ErrorBoundary so one crash doesn't kill the page */}
          <ErrorBoundary><Hero user={user} totalStars={totalStars} reposCount={user?.public_repos} /></ErrorBoundary>
          <ErrorBoundary><Experience /></ErrorBoundary>
          <ErrorBoundary><Projects repos={topRepos} /></ErrorBoundary>
          <ErrorBoundary><Skills languages={languages} /></ErrorBoundary>
          <ErrorBoundary><Contact user={user} /></ErrorBoundary>
        </main>
        <Footer user={user} />
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Portfolio />
    </ErrorBoundary>
  );
}
