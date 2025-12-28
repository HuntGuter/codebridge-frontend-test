import { useState, useEffect, useMemo } from 'react';
import { getArticles } from '../features/articles/api';
import type { Article } from '../features/articles/types';
import { countKeywords } from '../utils/countKeywords';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setLoading(true);

    getArticles()
      .then((data) => {
        setArticles(data.results);
      })
      .catch((err) => {
        setError(err.message ?? 'Failed to load articles');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const keywords = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  
  const filteredArticles = useMemo(() => {
    return articles
      .map((article) => {
        const title = article.title.toLowerCase();
        const summary = article.summary.toLowerCase();

        let titleMatches = 0;
        let summaryMatches = 0;

        keywords.forEach((word) => {
          titleMatches += countKeywords(title, word);
          summaryMatches += countKeywords(summary, word);
        });

        return {
          article,
          score: titleMatches * 10 + summaryMatches,
          titleMatches,
          summaryMatches,
        };
      })
      .filter((item) => {
        if (keywords.length === 0) return true;
        return item.score > 0;
      })
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.titleMatches !== a.titleMatches)
          return b.titleMatches - a.titleMatches;
        return b.summaryMatches - a.summaryMatches;
      })
      .map((item) => item.article);
  }, [articles, keywords]);

  return {
    articles: filteredArticles,
    loading,
    error,
    query,
    setQuery,
  };
}