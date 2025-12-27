import { fetch } from "./fetch";
import type { ArticlesResponse } from "./types";

export async function getArticles(limit: number = 30): Promise<ArticlesResponse> {
  const response = await fetch.get<ArticlesResponse>("/articles/", {
    params: { limit },
  });
  return response.data;
}