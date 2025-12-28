import { fetch } from "./fetch";
import type { Article, ArticlesResponse } from "./types";

export type GetArticleParams = {
  limit?: number;
  offset?: number;
};

export async function getArticles(params: GetArticleParams = {}): Promise<ArticlesResponse> {
  const response = await fetch.get<ArticlesResponse>("/articles/", {
    params: { 
      limit: params.limit ?? 12,
      offset: params.offset ?? 0,
     },
  });
  return response.data;
}

export async function getArticleById(id: number): Promise<Article> {
  const response = await fetch.get<Article>(`/articles/${id}/`);
  return response.data;
}