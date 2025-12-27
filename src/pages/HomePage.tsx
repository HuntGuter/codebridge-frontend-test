import { Container, Typography, CircularProgress, Alert, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { getArticles } from '../features/articles/api';
import { ArticleCard } from '../components/ArticleCard';
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

      {!loading && !error && (
        <Grid container spacing={2}>
          {articles.map((article) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
 );
}