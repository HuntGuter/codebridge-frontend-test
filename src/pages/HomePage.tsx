import { Container, Typography, CircularProgress, Alert, Grid, Box, Button } from '@mui/material';
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
    setQuery,
    loadMore,
    hasMore
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

      {loading && articles.length ===0 && <CircularProgress />}
      {error && <Alert severity='error'>{error}</Alert>}

      {!loading && !error && articles.length === 0 && (
        <Typography>No articles found.</Typography>
      )}

      {!error && (
        <Grid container spacing={2} sx={{ mt: 1}}>
          {articles.map((article: Article) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
              <ArticleCard article={article} query={query} />
            </Grid>
          ))}
        </Grid>
      )}

      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
          <Button
            variant='text'
            onClick={loadMore}
            disabled={loading}
            size='small'
            color='inherit'
            sx={{ fontWeight: 800, textTransform: 'none' }}
          >
            {loading ? <CircularProgress /> : 'Load more'}
          </Button>
        </Box>
        )}
    </Container>
 );
}