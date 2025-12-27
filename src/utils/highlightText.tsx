import { Fragment } from "react";

export function highlightText(text: string, query: string) {
  if (!query) return text;

  const words = query.split(/\s+/).filter(Boolean);
  if (words.length === 0) return text;

  const matches = new RegExp(`\\b(${words.join("|")})\\b`, 'gi');

  return text.split(matches).map((part, index) =>
    matches.test(part) ? (
      <mark key={index} style={{ backgroundColor: 'yellow' }}>
        {part}
      </mark>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    )
  );
}