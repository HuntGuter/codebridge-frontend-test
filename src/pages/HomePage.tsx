import { Container, Typography, CircularProgress, Alert, Grid } from '@mui/material';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ArticleCard } from '../components/ArticleCard';
import type { Article } from '../features/articles/types';
import { useArticles } from '../hooks/useArticles';

export function HomePage() {
  const { 
    articles,
    loading,
    error,
    query,
    setQuery
  } = useArticles();

  

  return (
    <Container sx={{ py: 2 }}>
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
        Results: {articles.length}
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity='error'>{error}</Alert>}

      {!loading && !error && articles.length === 0 && (
        <Typography>No articles found.</Typography>
      )}

      {!loading && !error && (
        <Grid container spacing={2} sx={{ mt: 1}}>
          {articles.map((article: Article) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
              <ArticleCard article={article} query={query} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
 );
}