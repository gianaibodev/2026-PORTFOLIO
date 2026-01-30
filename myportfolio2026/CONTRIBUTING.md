# Contributing to MyPortfolio2026

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to this project. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, CSS Modules
- **Animation**: GSAP, Framer Motion
- **3D Graphics**: Three.js / React Three Fiber / OGL
- **Linting**: ESLint, Prettier

## Getting Started

1.  **Clone the repository**
    ```bash
    git clone <repository_url>
    cd myportfolio2026
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Standards

### Code Style

- **Strict Type Safety**: Avoid `any`. Define interfaces for all component props.
- **Naming Conventions**:
    - Components: PascalCase (e.g., `ProjectCard.tsx`)
    - Utilities/Hooks: camelCase (e.g., `useScroll.ts`)
    - Constants: UPPER_SNAKE_CASE
- **Functional Components**: Use React Functional Components with typed props.

### Commit Messages

We strive for conventional commits:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance

### Directory Structure

- `/app`: App router pages and layouts.
- `/components`: Reusable UI components.
    - `/components/ui`: Generic design system components.
- `/content`: Static data content (e.g., case studies, resume data).
- `/lib`: Utility functions and helpers.
- `/public`: Static assets.

## Reporting Bugs

Bugs are tracked as GitHub issues. When filing an issue, please include:
- A clear title and description.
- Steps to reproduce.
- Expected vs actual behavior.
- Screenshots if applicable.

## License

By contributing, you agree that your contributions will be licensed under the project's default license.
