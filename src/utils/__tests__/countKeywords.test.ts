import { describe, it, expect } from 'vitest';
import { countKeywords } from '../countKeywords';

describe('countKeywords', () => {
  it('returns 0 for empty keyword', () => {
    expect(countKeywords('hello world', '')).toBe(0);
  });

  it('counts whole-word matches only', () => {
    expect(countKeywords('cat catalog scatter', 'cat')).toBe(1);
  });

  it('is case-insensitive', () => {
    expect(countKeywords('NASA nasa NaSa', 'nasa')).toBe(3);
  });

  it('returns 0 when no matches', () => {
    expect(countKeywords('hello world', 'nasa')).toBe(0);
  });
});
