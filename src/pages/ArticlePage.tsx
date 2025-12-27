import { Container, Typography, CircularProgress, Alert, Box, Button, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleById } from '../features/articles/api';
import type { Article } from '../features/articles/types';
import { useEffect, useState } from 'react';

export function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();

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


  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity='error'>{error}</Alert>
      </Container>
    );
  }

  if (!article) return null;

  return (
    <>
      {/*Hero Section*/}
      <Box
        sx={{
          minHeight: '20vh',
          backgroundImage: `url(${article.image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      />
        
        {/*Content Section*/}
        <Container maxWidth='md' sx={{ py: 2, mt: -12 }}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 2,
            }}
          >
                
            <Typography variant='h6' component='h2' align='center' sx={{ mb: 3 }} gutterBottom>
              {article.title}
            </Typography>

            <Typography variant='body1' sx={{ whiteSpace: 'pre-line', mb: 2 }}>
              {article.summary}
            </Typography>
          </Paper>
        </Container>
        
      {/*Back Button Section*/}
      <Container maxWidth="md">
        <Button
          variant='text'
          color='inherit'
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(`/`)}
        >
          Back to homepage
        </Button>
      </Container>
    </>
  );
}