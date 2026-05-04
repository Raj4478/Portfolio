import { AnimatePresence, motion } from "framer-motion";
import { useGitHub } from "./hooks/useGitHub";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
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
        <div className="text-center p-8 font-mono text-sm text-[#6b7fa3]">
          <span className="text-[#4f8ef7]">// error:</span> {error}
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
        className="grain relative"
      >
        <Cursor />
        <Navbar user={user} />
        <main>
          <Hero user={user} totalStars={totalStars} reposCount={user?.public_repos} />
          <Experience />
          <Projects repos={topRepos} />
          <Skills languages={languages} />
          <Contact user={user} />
        </main>
        <Footer user={user} />
      </motion.div>
    </AnimatePresence>
  );
}
