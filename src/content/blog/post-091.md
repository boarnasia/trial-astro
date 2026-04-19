---
title: 'Writing Better Commit Messages'
description: 'Improve your git workflow with conventional commits, meaningful messages, and automated changelogs.'
pubDate: 'Feb 04 2023'
---

Conventional Commits is a specification for commit message format that enables automated versioning and changelog generation. The format is type(scope): description, with optional body and footer.

Common types are feat for new features, fix for bug fixes, chore for maintenance tasks, docs for documentation changes, and refactor for code changes that neither fix bugs nor add features. A BREAKING CHANGE footer or ! after the type indicates a breaking change.

Automated tools read Conventional Commits to determine the next semantic version — a feat commit bumps the minor version, a fix bumps the patch version, and a breaking change bumps the major version. The release-please GitHub Action automates this entire process.
