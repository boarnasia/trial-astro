#!/usr/bin/env node
/**
 * generate-posts.mjs
 * Generates randomized MDX blog posts for the Astro content collection.
 *
 * Usage:
 *   node scripts/generate-posts.mjs
 *   node scripts/generate-posts.mjs --count 20 --prefix article
 */

import { existsSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------
function parseArgs(argv) {
  const args = { count: 10, prefix: 'post' };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--count' && argv[i + 1] !== undefined) {
      const n = parseInt(argv[i + 1], 10);
      if (isNaN(n) || n < 1) {
        console.error(`Invalid --count value: "${argv[i + 1]}". Must be a positive integer.`);
        process.exit(1);
      }
      args.count = n;
      i++;
    } else if (argv[i] === '--prefix' && argv[i + 1] !== undefined) {
      const p = argv[i + 1].trim();
      if (!p) {
        console.error('--prefix cannot be empty.');
        process.exit(1);
      }
      args.prefix = p;
      i++;
    }
  }
  return args;
}

// ---------------------------------------------------------------------------
// Content data pools
// ---------------------------------------------------------------------------
const TOPICS = [
  'JavaScript', 'TypeScript', 'Rust', 'Go', 'Python', 'WebAssembly',
  'CSS Grid', 'Flexbox', 'Accessibility', 'Performance', 'Security',
  'GraphQL', 'REST APIs', 'Microservices', 'Docker', 'Kubernetes',
  'React', 'Vue', 'Svelte', 'Astro', 'Next.js', 'Remix',
  'Testing', 'CI/CD', 'DevOps', 'Machine Learning', 'Edge Computing',
  'Progressive Web Apps', 'Web Components', 'Design Systems',
  'Database Optimization', 'Caching Strategies', 'Serverless Functions',
];

const ADJECTIVES = [
  'Practical', 'In-Depth', 'Essential', 'Modern', 'Advanced',
  'Beginner-Friendly', 'Comprehensive', 'Concise', 'Real-World',
  'Production-Ready', 'Battle-Tested', 'Effective', 'Elegant',
  'Scalable', 'Maintainable', 'Opinionated', 'Hands-On',
];

const VERBS = [
  'Understanding', 'Mastering', 'Exploring', 'Building', 'Optimizing',
  'Demystifying', 'Deep Dive into', 'Getting Started with',
  'Best Practices for', 'A Guide to', 'Rethinking',
];

const DESC_OPENERS = [
  'A thorough look at',
  'Learn how to leverage',
  'Discover the power of',
  'An practical exploration of',
  'Understand the core concepts behind',
  'Walk through real-world examples of',
  'Everything you need to know about',
  'Uncover the hidden potential of',
];

const DESC_CLOSERS = [
  'and how it can improve your workflow.',
  'with concrete, copy-paste-ready examples.',
  'so you can ship better code faster.',
  'backed by hands-on projects.',
  'with a focus on real-world applicability.',
  'and the trade-offs you need to know.',
  'from first principles to production.',
  'explained clearly for developers at any level.',
];

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// Body paragraph templates — {topic} is replaced with the chosen topic.
const BODY_PARAGRAPHS = [
  '{topic} has become a cornerstone of modern software development. Whether you are building small utilities or large-scale systems, understanding its fundamentals opens the door to cleaner architecture and better outcomes. In this post we walk through the key ideas from the ground up.',

  'One of the most common misconceptions about {topic} is that it is only useful for a narrow set of problems. In practice, the patterns and principles it encapsulates apply broadly across the stack, enabling teams to move faster while keeping complexity under control.',

  'Getting started with {topic} does not have to be overwhelming. With the right mental model in place, even advanced scenarios become approachable. We will cover the three concepts that unlock the rest: the underlying data model, the composition primitives, and the error-handling story.',

  'Performance matters, and {topic} gives you the tools to measure and improve it at every layer. From profiling in the browser to optimizing server-side rendering, the techniques here translate directly into faster load times and happier users.',

  'The community around {topic} is one of its greatest strengths. Thousands of open-source packages, a rich ecosystem of tooling, and detailed official documentation mean that almost every problem you encounter already has a well-documented solution somewhere.',

  'Testing {topic}-based code is often simpler than developers expect. By structuring your logic as pure functions and keeping side effects at the edges, you end up with a test suite that is fast, reliable, and easy to maintain as requirements evolve.',

  'Security considerations for {topic} often go overlooked until it is too late. In this section we examine the most common attack vectors, how to audit your dependencies, and the configuration flags that harden your application without sacrificing developer experience.',

  'Deploying {topic} at scale requires careful thought about infrastructure, observability, and graceful degradation. We look at patterns used by production teams to keep uptime high and on-call fatigue low — including feature flags, canary releases, and structured logging.',
];

// ---------------------------------------------------------------------------
// Random helpers
// ---------------------------------------------------------------------------
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPubDate() {
  const year = randomInt(2020, 2025);
  const month = randomInt(0, 11);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const day = randomInt(1, daysInMonth);
  const dd = String(day).padStart(2, '0');
  return `${MONTH_NAMES[month]} ${dd} ${year}`;
}

function generateTitle() {
  const pattern = randomInt(0, 2);
  const topic = pick(TOPICS);
  if (pattern === 0) return `${pick(VERBS)} ${topic}`;
  if (pattern === 1) return `${pick(ADJECTIVES)} ${topic}: What You Need to Know`;
  return `${topic} — ${pick(ADJECTIVES)} Patterns and Practices`;
}

function generateDescription(title) {
  const topic = TOPICS.find((t) => title.includes(t)) ?? pick(TOPICS);
  return `${pick(DESC_OPENERS)} ${topic} ${pick(DESC_CLOSERS)}`;
}

function generateBody(title) {
  const topic = TOPICS.find((t) => title.includes(t)) ?? pick(TOPICS);
  const numParagraphs = randomInt(3, 5);
  const selected = pickN(BODY_PARAGRAPHS, numParagraphs);
  return selected.map((p) => p.replace(/{topic}/g, topic)).join('\n\n');
}

function buildMarkdown(title, description, pubDate) {
  const body = generateBody(title);
  return `---\ntitle: '${title.replace(/'/g, "\\'")}'\ndescription: '${description.replace(/'/g, "\\'")}'\npubDate: '${pubDate}'\n---\n\n${body}\n`;
}

// ---------------------------------------------------------------------------
// File numbering — find the next available index for a given prefix
// ---------------------------------------------------------------------------
function findNextIndex(outputDir, prefix) {
  if (!existsSync(outputDir)) return 1;

  const files = readdirSync(outputDir);
  // Match files like <prefix>-NNN.mdx
  const re = new RegExp(`^${escapeRegex(prefix)}-(\\d+)\\.mdx$`);
  let max = 0;
  for (const f of files) {
    const m = f.match(re);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n > max) max = n;
    }
  }
  return max + 1;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function formatIndex(n, width) {
  return String(n).padStart(width, '0');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const OUTPUT_DIR = join(projectRoot, 'src', 'content', 'blog');

const { count, prefix } = parseArgs(process.argv.slice(2));

// Ensure output directory exists
mkdirSync(OUTPUT_DIR, { recursive: true });

const startIndex = findNextIndex(OUTPUT_DIR, prefix);
// Determine zero-pad width: wide enough for the largest number we will write,
// and at least 3 digits (matching the existing convention).
const maxIndex = startIndex + count - 1;
const padWidth = Math.max(3, String(maxIndex).length);

const created = [];

for (let i = 0; i < count; i++) {
  const idx = startIndex + i;
  const filename = `${prefix}-${formatIndex(idx, padWidth)}.mdx`;
  const filepath = join(OUTPUT_DIR, filename);

  const title = generateTitle();
  const description = generateDescription(title);
  const pubDate = randomPubDate();
  const content = buildMarkdown(title, description, pubDate);

  writeFileSync(filepath, content, 'utf8');
  created.push({ filename, title, pubDate });
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log(`\nGenerated ${created.length} post(s) in ${OUTPUT_DIR}\n`);
const col1 = Math.max(...created.map((c) => c.filename.length));
const col2 = Math.max(...created.map((c) => c.pubDate.length));
console.log(
  `${'File'.padEnd(col1)}  ${'Date'.padEnd(col2)}  Title`,
);
console.log('-'.repeat(col1 + col2 + 40));
for (const { filename, title, pubDate } of created) {
  console.log(`${filename.padEnd(col1)}  ${pubDate.padEnd(col2)}  ${title}`);
}
console.log('');
