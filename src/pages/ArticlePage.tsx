import { Container, Typography, CircularProgress, Alert, Box, Button, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';
import { useArticle } from '../hooks/useArticle';

export function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { article, loading, error } = useArticle(id);

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

            <Typography variant='body1' sx={{ whiteSpace: 'pre-line', mb: 2 }} className='article-summary'>
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