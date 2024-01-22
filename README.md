# Movie search application

Simple React frontend application for searching movies from the [TMDB](https://www.themoviedb.org/), available here: https://movie-search-frontend.onrender.com/

Used an ExpressJS backend to proxy and cache for 2 minutes the responses from TMDB, backend available here: https://movie-search-6z7r.onrender.com

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Architecture, design points

- Mobile first, responsive layout approach with TailwindCSS
- For data fetching I used a custom fetch hook but for more complex usecases like caching, retry logic, etc. I would choose [RTK](https://tanstack.com/query/latest) as it is the most popular
- URL as single source of truth:
  - Specific query can be bookmarked
  - It is shareable
  - It persists the query, after refresh, no additional state management or localstorage is needed
- Feature-driven folder structure ([Screaming Architecture](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html))
- Deployed to Render
- Used githooks with husky to automate processes like linting, testing, conventional commit forcing

## Improvements for the product

- THE most important Light / Dark mode :)
- add proper navigation with react-router for e.g. other pages like favourites, profile
- add authentication
- social media sharing

## Improvements for the codebase

- identify and cover the core functionalities with E2E tests (happy paths)
- increase testing coverage and check coverage after each commit, write integration tests
- create storybook for UI component and mix it with unit tests [link](https://storybook.js.org/docs/react/writing-tests/stories-in-unit-tests)
- use Suspense and lazy load for heavy components
- create a Contribute.md to highlight how someone can contribute to the project
- add proper CI/CD (e.g.: github actions)
- add client side logging like [Sentry](https://sentry.io/welcome/)
- use Next.js for static site rendering and server side rendering

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname
  }
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
