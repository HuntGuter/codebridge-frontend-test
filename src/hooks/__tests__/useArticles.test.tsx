import { it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from '../../features/articles/articlesSlice';
import { useArticles } from '../useArticles';
import type { RootState } from '../../store/store';

function renderUseArticles(preloadedState?: RootState) {
  const store = configureStore({
    reducer: {
      articles: articlesReducer,
    },
    preloadedState,
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    store,
    ...renderHook(() => useArticles(), { wrapper }),
  };
}

it('filters articles by query with title priority', () => {
  const preloadedState = {
    articles: {
      articles: [
        {
          id: 1,
          title: 'NASA launches rocket',
          summary: 'SpaceX mission',
          published_at: '2023-01-01',
          image_url: '',
        },
        {
          id: 2,
          title: 'Space news',
          summary: 'NASA mission update',
          published_at: '2023-01-02',
          image_url: '',
        },
      ],
      loading: false,
      error: null,
      hasMore: false,
      page: 1,
      pageSize: 12,
    },
  };

  const { result } = renderUseArticles(preloadedState);

  act(() => {
    result.current.setQuery('nasa');
  });

  expect(result.current.articles.length).toBe(2);
  expect(result.current.articles[0].id).toBe(1);
});



