---
title: 'Monorepo Setup with pnpm Workspaces'
description: 'Set up a monorepo using pnpm workspaces to share code across multiple packages efficiently.'
pubDate: 'Feb 03 2021'
---

pnpm workspaces enable monorepo development where multiple packages share a single node_modules directory. The key advantage over npm or Yarn workspaces is pnpm's content-addressable storage, which deduplicates packages across all projects on your machine.

A workspace pnpm-workspace.yaml file defines which directories contain packages. Running pnpm install at the root installs all dependencies for all packages. Internal packages reference each other using workspace: protocol.

Filtering commands to specific packages — pnpm --filter @my/ui build — runs scripts in only matching packages. Running pnpm --filter @my/app... build runs the command in the package and all its local dependencies, in topological order.
