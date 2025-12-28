import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { highlightText } from '../highlightText';

describe('highlightText', () => {
  it('returns plain text when query is empty', () => {
    const result = highlightText('Hello world', '');
    expect(result).toBe('Hello world');
  });

  it('highlights a single matching word', () => {
    const result = highlightText('Hello world', 'world');

    const { container } = render(<>{result}</>);

    const mark = container.querySelector('mark');
    expect(mark).toBeInTheDocument();
    expect(mark?.textContent).toBe('world');
  });

  it('highlights words case-insensitively', () => {
    const result = highlightText('NASA launches rocket', 'nasa');

    const { container } = render(<>{result}</>);

    const mark = container.querySelector('mark');
    expect(mark?.textContent).toBe('NASA');
  });

  it('highlights multiple keywords', () => {
    const result = highlightText(
        'NASA launches SpaceX rocket',
        'nasa rocket'
    );

    const { container } = render(<>{result}</>);

    const marks = container.querySelectorAll('mark');
    expect(marks.length).toBe(2);
    expect(marks[0].textContent).toBe('NASA');
    expect(marks[1].textContent).toBe('rocket');
  });

  it('does not highlight partial word matches', () => {
    const result = highlightText('catalog scatter cat', 'cat');

    const { container } = render(<>{result}</>);

    const marks = container.querySelectorAll('mark');
    expect(marks.length).toBe(1);
    expect(marks[0].textContent).toBe('cat');
  });
});
