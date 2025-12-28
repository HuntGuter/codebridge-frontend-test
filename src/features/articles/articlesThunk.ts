import { createAsyncThunk } from "@reduxjs/toolkit";
import { getArticles } from "./api";

export const fetchArticles = createAsyncThunk(
  `articles/fetchArticles`,
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const offset = (page - 1) * pageSize;

    return getArticles({
      limit: pageSize,
      offset,
    });
  }
);
