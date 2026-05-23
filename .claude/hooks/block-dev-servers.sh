#!/usr/bin/env bash
# PreToolUse/Bash hook: deny commands that would start a long-running dev or
# Storybook server. Servers in this repo are human-managed (see CLAUDE.md).
cmd=$(jq -r '.tool_input.command // ""')
if echo "$cmd" | grep -qE '\b(astro[[:space:]]+dev|storybook[[:space:]]+dev|(npm|pnpm|yarn|bun)([[:space:]]+run)?[[:space:]]+(dev|start|storybook))\b'; then
  jq -n '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"deny",permissionDecisionReason:"Dev/Storybook servers in this repo are human-managed (see CLAUDE.md). Ask the user to start `npm run dev` or `npm run storybook` instead of running them yourself. For build verification use `npm run build` or the /check-build skill."}}'
fi
