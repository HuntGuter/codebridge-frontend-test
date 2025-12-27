import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export function ArticlePage() {
  const { id } = useParams();

  return (
      <Container sx={{ py: 4 }}>
          <Typography variant='h4'>
              Article {id}
          </Typography>
      </Container>
  );
}