#!/usr/bin/env bun
// Checks that the router, README, and manifests agree with the plugin tree on disk, and that every skill's
// frontmatter and every relative link is valid. Prints each problem and exits 1 when anything has drifted.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const PLUGIN = join(ROOT, "plugins", "dev-mode");
const SKILLS = join(PLUGIN, "skills");
const ROUTER = join(SKILLS, "dev-mode", "SKILL.md");
const README = join(ROOT, "README.md");

const problems: string[] = [];
const fail = (file: string, message: string) => problems.push(`${relative(ROOT, file).replaceAll("\\", "/")}: ${message}`);

const read = (path: string) => readFileSync(path, "utf8");
const list = (dir: string, keep: (path: string) => boolean) =>
  existsSync(dir) ? readdirSync(dir).filter((name) => keep(join(dir, name))).sort() : [];

const skills = list(SKILLS, (path) => existsSync(join(path, "SKILL.md")));
const principles = skills.filter((name) => name.startsWith("principle-"));
const techniques = skills.filter((name) => !name.startsWith("principle-") && name !== "dev-mode");
const playbooks = list(join(SKILLS, "dev-mode", "playbooks"), (path) => path.endsWith(".md")).map((name) => name.slice(0, -3));
const agents = list(join(PLUGIN, "agents"), (path) => path.endsWith(".md")).map((name) => name.slice(0, -3));

function compare(file: string, what: string, listed: string[], actual: string[]) {
  for (const name of actual) if (!listed.includes(name)) fail(file, `${what} is missing ${name}`);
  for (const name of listed) if (!actual.includes(name)) fail(file, `${what} lists ${name}, which does not exist`);
}

function frontmatter(path: string): Record<string, unknown> | undefined {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(read(path));
  if (!match) return undefined;
  try {
    return Bun.YAML.parse(match[1]) as Record<string, unknown>;
  } catch (error) {
    fail(path, `frontmatter is not valid YAML: ${(error as Error).message}`);
    return {};
  }
}

// Text under a markdown heading, up to the next heading of the same or higher level.
function section(text: string, heading: string): string {
  const lines = text.split("\n");
  const start = lines.findIndex((line) => line.trim() === heading);
  if (start === -1) return "";
  const level = heading.indexOf(" ");
  const end = lines.findIndex((line, i) => i > start && /^#+ /.test(line) && line.indexOf(" ") <= level);
  return lines.slice(start + 1, end === -1 ? undefined : end).join("\n");
}

// First-column entries of the markdown table in a block of text, without backticks.
const firstColumn = (text: string) =>
  text
    .split("\n")
    .filter((line) => line.startsWith("|"))
    .slice(2)
    .map((line) => line.split("|")[1].trim().replaceAll("`", ""));

// Skills and agents: frontmatter is present, names match files, principles stay out of the model's skill list.
for (const name of skills) {
  const path = join(SKILLS, name, "SKILL.md");
  const meta = frontmatter(path);
  if (!meta) {
    fail(path, "has no frontmatter");
    continue;
  }
  if (meta.name !== name) fail(path, `frontmatter name is ${JSON.stringify(meta.name)}, expected "${name}"`);
  if (typeof meta.description !== "string" || !meta.description.trim()) fail(path, "frontmatter has no description");
  if (name.startsWith("principle-") && meta["disable-model-invocation"] !== true)
    fail(path, "principles must set disable-model-invocation: true");
}
for (const name of agents) {
  const path = join(PLUGIN, "agents", `${name}.md`);
  const meta = frontmatter(path);
  if (meta?.name !== name) fail(path, `frontmatter name is ${JSON.stringify(meta?.name)}, expected "${name}"`);
  if (typeof meta?.description !== "string" || !meta.description.trim()) fail(path, "frontmatter has no description");
}

// Router: the playbook and principle tables link every file and nothing else.
const router = read(ROUTER);
compare(ROUTER, "playbook table", [...section(router, "## 2. Pick a playbook").matchAll(/\]\(playbooks\/([\w-]+)\.md\)/g)].map((m) => m[1]), playbooks);
compare(ROUTER, "principle table", [...section(router, "## Principles").matchAll(/\]\(\.\.\/(principle-[\w-]+)\/SKILL\.md\)/g)].map((m) => m[1]), principles);

// README: tables, the layout block, agent mentions, and principle counts.
const readme = read(README);
compare(README, "playbook table", firstColumn(section(readme, "### Playbooks")), playbooks);
compare(README, "technique table", firstColumn(section(readme, "### Techniques")), techniques);
const layout = /```\n([\s\S]*?)```/.exec(section(readme, "## Layout"))?.[1] ?? "";
for (const name of techniques) if (!new RegExp(`(^|\\s)${name}/`, "m").test(layout)) fail(README, `layout block is missing ${name}/`);
for (const name of playbooks) if (!new RegExp(`\\b${name}\\b`).test(layout)) fail(README, `layout block is missing playbook ${name}`);
for (const name of agents) {
  if (!layout.includes(`${name}.md`)) fail(README, `layout block is missing agents/${name}.md`);
  if (!readme.includes(`dev-mode:${name}`)) fail(README, `agent section does not mention dev-mode:${name}`);
}
readme.split("\n").forEach((line, i) => {
  if (!/principle/i.test(line)) return;
  for (const [count] of line.matchAll(/\b\d+\b/g))
    if (Number(count) !== principles.length) fail(README, `line ${i + 1} says ${count} principles, the tree has ${principles.length}`);
});

// Trackers: every file carries the same operation headings, in order, since to-task and triage call them by name.
const TRACKER_OPS = ["Create", "Read", "List", "Claim", "Note", "Split", "Set state", "Close"];
const TRACKERS = join(SKILLS, "dev-mode", "trackers");
for (const name of list(TRACKERS, (path) => path.endsWith(".md"))) {
  const path = join(TRACKERS, name);
  const ops = [...read(path).replace(/```[\s\S]*?```/g, "").matchAll(/^## (.+?)\s*$/gm)].map((m) => m[1]);
  if (ops.join("|") !== TRACKER_OPS.join("|")) fail(path, `headings are [${ops.join(", ")}], expected [${TRACKER_OPS.join(", ")}]`);
}

// Manifests: the two descriptions match and the version is semver.
const plugin = JSON.parse(read(join(PLUGIN, ".claude-plugin", "plugin.json")));
const marketplace = JSON.parse(read(join(ROOT, ".claude-plugin", "marketplace.json")));
const entry = marketplace.plugins?.find((p: { name: string }) => p.name === plugin.name);
if (!entry) fail(join(ROOT, ".claude-plugin", "marketplace.json"), `has no entry for ${plugin.name}`);
else if (entry.description !== plugin.description) fail(join(ROOT, ".claude-plugin", "marketplace.json"), "description differs from plugin.json");
if (!/^\d+\.\d+\.\d+$/.test(plugin.version ?? "")) fail(join(PLUGIN, ".claude-plugin", "plugin.json"), `version ${JSON.stringify(plugin.version)} is not semver`);

// Relative links in every markdown file resolve. Code blocks are skipped; they hold examples, not links.
function markdownFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? markdownFiles(path) : path.endsWith(".md") ? [path] : [];
  });
}
for (const file of [README, ...markdownFiles(PLUGIN)]) {
  const text = read(file).replace(/```[\s\S]*?```/g, "");
  for (const [, target] of text.matchAll(/\]\(<?([^)\s>]+)>?\)/g)) {
    if (/^[a-z]+:|^#/i.test(target)) continue;
    const path = decodeURIComponent(target.split("#")[0]);
    if (!existsSync(resolve(dirname(file), path))) fail(file, `broken link ${target}`);
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  console.error(`\n${problems.length} problem(s). The tree on disk is the source of truth; update the listing to match.`);
  process.exit(1);
}
console.log(`ok: ${skills.length} skills (${principles.length} principles), ${playbooks.length} playbooks, ${agents.length} agents`);
