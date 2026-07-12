#!/usr/bin/env node
/**
 * Claude Code PostToolUse hook: auto-format and lint-fix files that
 * Claude edits via Edit / Write / MultiEdit.
 *
 * Wired up in .claude/settings.json.
 */

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve, sep } from "node:path";

const ESLINT_EXTENSIONS = /\.(ts|js|mjs|cjs)$/;

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function runSilently(bin, args) {
  try {
    execFileSync(bin, args, { stdio: "ignore" });
  } catch {
    // Non-zero exit from a formatter/linter must not propagate.
  }
}

try {
  const raw = await readStdin();
  const { tool_input = {}, tool_response = {} } = JSON.parse(raw || "{}");
  const file = tool_response.filePath || tool_input.file_path;
  if (!file) process.exit(0);

  const projectRoot = process.cwd();
  const abs = resolve(file);

  if (!abs.startsWith(projectRoot + sep)) process.exit(0);

  const prettier = resolve(projectRoot, "node_modules/.bin/prettier");
  if (existsSync(prettier)) {
    runSilently(prettier, ["--write", "--ignore-unknown", abs]);
  }

  const eslint = resolve(projectRoot, "node_modules/.bin/eslint");
  if (existsSync(eslint) && ESLINT_EXTENSIONS.test(abs)) {
    runSilently(eslint, ["--fix", "--no-warn-ignored", abs]);
  }
} catch {
  // Malformed stdin, JSON parse errors — stay silent.
}
