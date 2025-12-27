import { Container, Typography, CircularProgress, Alert, Grid } from '@mui/material';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect, useMemo } from 'react';
import { getArticles } from '../features/articles/api';
import { ArticleCard } from '../components/ArticleCard';
import type { Article } from '../features/articles/types';
import { countKeywords } from '../utils/countKeywords';

export function HomePage() {
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

  

  return (
    <Container sx={{ py: 4 }}>
      <Typography sx={{ fontWeight: 800 }} gutterBottom>
        Filter by keywords
      </Typography>
      <TextField
        placeholder='Filter by keywords'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 3, width: '50%' }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon fontSize='small'/>
              </InputAdornment>
            )
          }
        }}
      />
      <Typography
        sx={{ fontWeight: 800, mb: 2 }}
      >
        Results: {filteredArticles.length}
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity='error'>{error}</Alert>}

      {!loading && !error && articles.length === 0 && (
        <Typography>No articles found.</Typography>
      )}

      {!loading && !error && (
        <Grid container spacing={3} sx={{ mt: 1}}>
          {filteredArticles.map((article: Article) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
              <ArticleCard article={article} query={query} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
 );
}