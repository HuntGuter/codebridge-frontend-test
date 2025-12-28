import { useState, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { fetchArticles } from '../features/articles/articlesThunk';
import type { Article } from '../features/articles/types';
import { countKeywords } from '../utils/countKeywords';

export function useArticles() {
  const dispatch = useDispatch<AppDispatch>();

  const { 
    articles, 
    loading, 
    error, 
    hasMore, 
    page, 
    pageSize 
  } = useSelector((state: RootState) => state.articles);

  const [query, setQuery] = useState('');
  const initialFetchDone = useRef(false);

  useEffect(() => {
    if (!initialFetchDone.current && articles.length === 0) {
      initialFetchDone.current = true;
      dispatch(fetchArticles({ page: 1, pageSize }));
    }
  }, [dispatch, articles.length, pageSize]);

  const loadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchArticles({ page: page, pageSize }));
    }
  };

  const keywords = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  
  const filteredArticles = useMemo(() => {
    return articles
      .map((article: Article) => {
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
    loadMore,
    hasMore
  };
}