import { it, expect, vi } from 'vitest';
import { getArticles, getArticleById } from '../api';
import type { ArticlesResponse, Article } from '../types';

vi.mock('../fetch', () => ({
  fetch: {
    get: vi.fn(),
  },
}));

it('getArticles calls /articles/ with default params', async () => {
  const mockResponse: ArticlesResponse = {
    count: 1,
    next: null,
    previous: null,
    results: [],
  };

  const { fetch } = await import('../fetch');
  (fetch.get as any).mockResolvedValueOnce({ data: mockResponse });

  const result = await getArticles();

  expect(fetch.get).toHaveBeenCalledWith('/articles/', {
    params: { limit: 12, offset: 0 },
  });

  expect(result).toEqual(mockResponse);
});

it('getArticles passes custom limit and offset', async () => {
  const mockResponse: ArticlesResponse = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  const { fetch } = await import('../fetch');
  (fetch.get as any).mockResolvedValueOnce({ data: mockResponse });

  await getArticles({ limit: 24, offset: 48 });

  expect(fetch.get).toHaveBeenCalledWith('/articles/', {
    params: { limit: 24, offset: 48 },
  });
});

it('getArticleById calls article endpoint by id', async () => {
  const mockArticle: Article = {
    id: 123,
    title: 'Test Article',
    summary: 'Test summary',
    image_url: '',
    published_at: '2023-01-01'
  };

  const { fetch } = await import('../fetch');
  (fetch.get as any).mockResolvedValueOnce({ data: mockArticle });

  const result = await getArticleById(123);

  expect(fetch.get).toHaveBeenCalledWith('/articles/123/');
  expect(result).toEqual(mockArticle);
});


