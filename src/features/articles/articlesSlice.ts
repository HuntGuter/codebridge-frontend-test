import { createSlice } from "@reduxjs/toolkit";
import type { Article } from "./types";
import { fetchArticles } from "./articlesThunk";

interface ArticlesState {
  articles: Article[];
  page: number;
  pageSize: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  articles: [],
  page: 1,
  pageSize: 12,
  hasMore: true,
  loading: false,
  error: null,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    resetArticles(state) {
      state.articles = [];
      state.page = 1;
      state.hasMore = true;
    }    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        
        const existingIds = new Set(state.articles.map(a => a.id));
        const uniqueNewArticles = action.payload.results.filter(
          article => !existingIds.has(article.id) 
        );

        state.articles.push(...uniqueNewArticles);

        if (action.payload.results.length < state.pageSize) {
          state.hasMore = false;
        } else {
          state.page += 1;
        }
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load articles";
      });
  },
});

export const { resetArticles } = articlesSlice.actions;
export default articlesSlice.reducer;