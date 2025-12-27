import { fetch } from "./fetch";
import type { Article, ArticlesResponse } from "./types";

export async function getArticles(limit: number = 50): Promise<ArticlesResponse> {
  const response = await fetch.get<ArticlesResponse>("/articles/", {
    params: { limit },
  });
  return response.data;
}

export async function getArticleById(id: number): Promise<Article> {
  const response = await fetch.get<Article>(`/articles/${id}/`);
  return response.data;
}