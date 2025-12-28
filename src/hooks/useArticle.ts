import { useEffect, useState } from 'react';
import { getArticleById } from '../features/articles/api';
import type { Article } from '../features/articles/types';

export function useArticle(id?: string) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const articleId = Number(id);
    if (Number.isNaN(articleId)) {
      setError("Invalid article id");
      return;
    }

    setLoading(true);

    getArticleById(articleId)
      .then((data) => {
        setArticle(data);
      })
      .catch((err) => {
        setError(err.message ?? "Failed to load article");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return { 
    article,
    loading,
    error 
  };
}