import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../features/articles/types';

export function ArticleCard({ article }: { article: Article }) {
  const navigate = useNavigate();

  const shortSummary = article.summary.length > 100
    ? article.summary.slice(0, 100).trimEnd() + '…'
    : article.summary;

  return (
    <Card sx={{ mb: 2 }}>
      <CardActionArea onClick={() => navigate(`/article/${article.id}`)}>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            {article.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {shortSummary}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>     
  );
}