export interface Article {
  id: string;
  title: string;
  summary: string;
  published_at: string;
}

export interface ArticlesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Article[];
}