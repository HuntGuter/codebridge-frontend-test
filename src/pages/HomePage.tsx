import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import { getArticles } from '../features/articles/api';
import type { Article } from '../features/articles/types';

export function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
  

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant='h4' gutterBottom>
        Articles
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity='error'>{error}</Alert>}

      {!loading && !error && articles.length === 0 && (
        <Typography>No articles found.</Typography>
      )}

      {!loading && !error && articles.map((article) => (
        <Typography key={article.id} variant='h6' gutterBottom>
          {article.title}
        </Typography>
      ))}
    </Container>
 );
}