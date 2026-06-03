```markdown
# geb-udereinigung- Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `geb-udereinigung-` repository, a TypeScript project built with Next.js. You'll learn about file naming, import/export styles, commit conventions, and testing patterns to ensure consistency and maintainability in your contributions.

## Coding Conventions

### File Naming
- **Pattern:** PascalCase  
  Example:  
  ```
  MyComponent.tsx
  UserProfile.test.ts
  ```

### Import Style
- **Pattern:** Absolute imports  
  Example:  
  ```typescript
  import Header from 'components/Header';
  import { getUser } from 'utils/api';
  ```

### Export Style
- **Pattern:** Mixed (both default and named exports are used)  
  Example:  
  ```typescript
  // Default export
  export default function HomePage() { ... }

  // Named export
  export const getServerSideProps = async () => { ... }
  ```

### Commit Messages
- **Pattern:** Conventional Commits with `feat` prefix  
  Example:  
  ```
  feat: add user authentication to login page
  ```

## Workflows

*No automated workflows detected in this repository.*

## Testing Patterns

- **Framework:** Unknown (not specified in the repository)
- **File Pattern:** `*.test.*`  
  Example:  
  ```
  UserProfile.test.ts
  apiUtils.test.ts
  ```
- **Location:** Test files are placed alongside the files they test or in relevant directories.

## Commands
| Command | Purpose |
|---------|---------|
| /conventions | Show coding conventions and examples |
| /test-patterns | Show how tests are organized and named |
```