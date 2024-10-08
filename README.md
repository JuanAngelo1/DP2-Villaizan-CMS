# Turborepo starter

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/) for Landing Page and Headless CMS
- `server`: [Nest.js](https://nestjs.com/) app with [Prisma](https://www.prisma.io) for API
- `ui`: a stub React component library with [Tailwind CSS](https://tailwindcss.com/) and [Shadcn/ui](https://ui.shadcn.com/) shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/prettier-config`: `prettier`s used throughout the monorepo
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `@repo/database`: `prisma` database used on general project
- `@repo/ui`: `shadcn` reusable components collection used for general project as the UI library

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Usage web/server

For developing and run web and server apps (local), use the following command:

```bash
pnpm run dev
```

- Web app: [http://localhost:3000](http://localhost:3000)
- Server app: [http://localhost:3001](http://localhost:3001)

### Usage packages/ui

For installing Shadcn components, you can use the following command:

```bash
pnpm run ui:add
```

### Utilities

This Turborepo has some additional tools already setup for you:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Prisma](https://www.prisma.io) for ORM database
- [Shadcn](https://ui.shadcn.com/) for UI components

### Using prisma

Para puller los cambios de prisma:

`pnpm prisma db pull`

Para generar el schema:

`pnpm prisma generate`
