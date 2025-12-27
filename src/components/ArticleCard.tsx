import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../features/articles/types';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { formatDate } from "../utils/formatDate";

export function ArticleCard({ article }: { article: Article }) {
  const navigate = useNavigate();

  const shortSummary = article.summary.length > 100
    ? article.summary.slice(0, 100).trimEnd() + '…'
    : article.summary;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea 
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch'}}
        onClick={() => navigate(`/article/${article.id}`)}
      >
        {article.image_url && (
          <Box sx={{ height: 180, overflow: 'hidden' }}>
            <CardMedia
                component='img'
                loading='lazy'
                image={article.image_url}
                alt={article.title}
                sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </Box>
        )}

        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1, color: 'text.secondary' }}>
            <CalendarTodayOutlinedIcon sx={{ fontSize: 'small' }} />
            <Typography variant='caption'>
              {formatDate(article.published_at)}
            </Typography>
          </Box>
          <Typography variant="h6" component="h2" gutterBottom sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {shortSummary}
          </Typography>
        </CardContent>

        <Box sx={{ p: 2, pb: 2 }}>
            <Typography variant="body2" fontWeight={800}>
              Read more →
            </Typography>
        </Box>
      </CardActionArea>
    </Card>     
  );
}