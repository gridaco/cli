# Contributing & Architecture documents

## Meta files design

Options

- .grida/
  - adopted by:
    - .vscode/ (config)
    - .next/ (build)
    - .serverless/ (build)
- .grida
- /grida/schema.grida
  - adopted by:
    - prisma
  - pros:
    - usage with .env
    - crossplatform
  - cons:
    - /
- grdia.config.js
  - adopted by:
    - tailwind
    - nextjs
    - webpack

## Contents

- theme
- connector
- credentials
- rewrites
- naming conventions

## Techniques

- [Learn about npx](https://blog.shahednasser.com/how-to-create-a-npx-tool/)

## References

- [Prisma CLI Repository](https://github.com/prisma/prisma/tree/main/packages/cli)
