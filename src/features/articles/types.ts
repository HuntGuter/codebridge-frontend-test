export interface Article {
  id: number;
  title: string;
  summary: string;
  published_at: string;
  image_url?: string;
}

export interface ArticlesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Article[];
}