# Procedurer

This is developed for demonstration purposes, and stil very raw.

## What?

See `src/example`. When you run `npm run start`, it will print `1 3 4`.

This is because the procedure is **declared** in each component.

## Why?

Declarative programming needs a way to generate instructions from informations.

In this case, `src/example/**.ts` are informations. And `runtime/*.ts`, which is
generated from `npm run build`, are instructions.

## How?

It uses `metadata` from `esbuild`.
