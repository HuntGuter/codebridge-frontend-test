# Spaceflight News SPA

## Frontend Test Assignment – Codebridge Technology

Single Page Application built with **React + TypeScript**, based on a provided Figma prototype.
The app displays space-related articles fetched from a public API, supports keyword filtering with prioritization and highlighting, and demonstrates modern frontend architecture patterns.

---

### Demo Features

- Articles list with title, image, publication date, and truncated description
- Keyword search across titles and descriptions
    - Priority: **title matches > description matches**
    - Matched keywords are highlighted
- Article details page with full description
- Load more pagination (**12 articles per batch**)
- Responsive layout (Material UI grid)
- Optimized filtering & sorting logic
- Unit tests for core logic

---

### Tech Stack

- **React** (SPA architecture)
- **TypeScript** (strict typing)
- **Material UI (MUI)** – UI components & layout
- **SCSS** – global and shared styling
- **Redux Toolkit + Thunk** – state management & pagination
- **Axios** – API layer
- **Vitest + Testing Library** – unit testing

---

### API

Data is fetched from the public [Spaceflight News API](https://api.spaceflightnewsapi.net/v4).

Used endpoints:
- `GET /articles`
- `GET /articles/{id}`

---

### Architecture Overview

### Key decisions:

- Business logic (filtering, ranking) lives in a **custom hook**
- Async data & pagination handled via **Redux Toolkit**
- UI components remain **stateless and reusable**
- Utilities are **pure functions, fully testable**

### Keyword Filtering Logic

- Input is split into keywords
- Each article receives a score:
    - `+10` for each match in the **title**
    - `+1` for each match in the **description**
- Articles are sorted by:
    1. Total score
    2. Number of title matches
    3. Number of description matches
- All matched keywords are **highlighted in yellow**

---

### State Management

Redux Toolkit is used to manage:
- Articles list
- Pagination (`page`, `pageSize`, `hasMore`)
- Loading & error states

Async fetching is implemented via **RTK Thunk**.
Filtering and sorting are performed locally in a **custom hook** to keep Redux state minimal and predictable.

---

### Testing

Unit tests cover the most critical parts of the application:

Tested:
- Utility functions (`countKeywords`, `highlightText`)
- API layer (Axios mock)
- Custom hook logic (`useArticles` – filtering & prioritization)

Tools:
- **Vitest**
- **@testing-library/react**

All tests are deterministic, fast, and focused on business logic.

---

### Getting Started

Install dependencies
```bash
npm install
```
Run the app
```bash
npm run dev
```
Run tests
```bash
npm run test
```

---

### Notes

- The project follows the provided Figma prototype
- Pagination and testing were added as extra improvements
- The codebase is structured for scalability and maintainability

---

### 👤 Author

**Mykyta Olshanskyi (HuntGuter)**

**Frontend Developer (React)**

[GitHub](https://github.com/HuntGuter)

[LinkedIn](https://www.linkedin.com/in/huntguter/)