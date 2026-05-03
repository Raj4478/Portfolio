import { AnimatePresence, motion } from "framer-motion";
import { useGitHub } from "./hooks/useGitHub";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const { user, topRepos, languages, totalStars, loading, error } = useGitHub();

  if (loading) return <LoadingScreen />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <p className="font-mono text-[#4f8ef7] text-sm mb-2">// error</p>
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
        transition={{ duration: 0.4 }}
        className="mesh-bg"
      >
        <div className="grain" />
        <Navbar user={user} />
        <main>
          <Hero user={user} totalStars={totalStars} reposCount={user?.public_repos} />
          <Projects repos={topRepos} />
          <Skills languages={languages} />
          <Contact user={user} />
        </main>
        <Footer user={user} />
      </motion.div>
    </AnimatePresence>
  );
}
