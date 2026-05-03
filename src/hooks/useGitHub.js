import { useState, useEffect } from "react";

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const HEADERS = {
  Authorization: `token ${TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

export function useGitHub() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch("https://api.github.com/user", { headers: HEADERS }),
          fetch("https://api.github.com/user/repos?per_page=100&sort=updated", { headers: HEADERS }),
        ]);
        const userData = await uRes.json();
        const reposData = await rRes.json();
        if (userData.message) throw new Error(userData.message);
        setUser(userData);
        setRepos(Array.isArray(reposData) ? reposData : []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const ownRepos = repos.filter((r) => !r.fork);
  const topRepos = [...ownRepos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 9);
  const totalStars = ownRepos.reduce((s, r) => s + r.stargazers_count, 0);

  const langMap = {};
  repos.forEach((r) => {
    if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
  });
  const languages = Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .map(([lang]) => lang);

  return { user, repos, topRepos, languages, totalStars, loading, error };
}
