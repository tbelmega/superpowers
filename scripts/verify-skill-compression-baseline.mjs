import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredFiles = [
  "docs/skill-compression-rubric.md",
  "docs/specs/2026-04-01-skill-compression-design.md",
  "docs/plans/2026-04-01-skill-compression.md",
];

const requiredSkillDirs = [
  "brainstorming",
  "coding-standards",
  "dispatching-parallel-agents",
  "executing-plans",
  "finishing-a-development-branch",
  "receiving-code-review",
  "requesting-code-review",
  "research",
  "subagent-driven-development",
  "systematic-debugging",
  "test-driven-development",
  "using-git-worktrees",
  "using-superpowers",
  "verification-before-completion",
  "writing-plans",
  "writing-skills",
];

const requiredSupportingFiles = [
  "skills/brainstorming/spec-document-reviewer-prompt.md",
  "skills/brainstorming/visual-companion.md",
  "skills/requesting-code-review/code-reviewer.md",
  "skills/subagent-driven-development/code-quality-reviewer-prompt.md",
  "skills/subagent-driven-development/implementer-prompt.md",
  "skills/subagent-driven-development/spec-reviewer-prompt.md",
  "skills/test-driven-development/testing-anti-patterns.md",
  "skills/writing-plans/plan-document-reviewer-prompt.md",
];

const task2Targets = [
  {
    path: "skills/using-superpowers/SKILL.md",
    maxWords: 650,
    mustInclude: [
      "If a skill might apply, load it before responding.",
      "User instructions take precedence over skills.",
      "Process skills first",
    ],
    mustExclude: ["digraph skill_flow", "This is not negotiable."],
  },
  {
    path: "skills/coding-standards/SKILL.md",
    maxWords: 260,
    mustInclude: [
      "Declare explicit types for function signatures.",
      "Comment why, not what.",
      "Follow existing naming conventions.",
    ],
    mustExclude: [],
  },
  {
    path: "skills/research/SKILL.md",
    maxWords: 500,
    mustInclude: [
      "Write the findings to `docs/research/YYYY-MM-DD-<topic>.md`.",
      "Trace data flow end-to-end.",
      "Ask the user to review the document before planning.",
    ],
    mustExclude: ["## Quick Reference", "## Common Mistakes"],
  },
];

const errors = [];

function assertExists(relPath) {
  if (!fs.existsSync(path.join(root, relPath))) {
    errors.push(`Missing required file: ${relPath}`);
  }
}

for (const relPath of requiredFiles) {
  assertExists(relPath);
}

for (const dir of requiredSkillDirs) {
  const skillPath = path.join(root, "skills", dir, "SKILL.md");
  if (!fs.existsSync(skillPath)) {
    errors.push(`Missing skill file: skills/${dir}/SKILL.md`);
    continue;
  }

  const content = fs.readFileSync(skillPath, "utf8");

  if (!content.startsWith("---\n")) {
    errors.push(`Invalid frontmatter start: skills/${dir}/SKILL.md`);
    continue;
  }

  const frontmatterEnd = content.indexOf("\n---\n", 4);
  if (frontmatterEnd === -1) {
    errors.push(`Invalid frontmatter end: skills/${dir}/SKILL.md`);
    continue;
  }

  const frontmatter = content.slice(4, frontmatterEnd);

  if (!/^name:\s.+/m.test(frontmatter)) {
    errors.push(`Missing frontmatter name: skills/${dir}/SKILL.md`);
  }

  if (!/^description:\s.+/m.test(frontmatter)) {
    errors.push(`Missing frontmatter description: skills/${dir}/SKILL.md`);
  }
}

for (const relPath of requiredSupportingFiles) {
  assertExists(relPath);
}

for (const target of task2Targets) {
  const content = fs.readFileSync(path.join(root, target.path), "utf8");
  const words = content.trim().split(/\s+/).length;

  if (words > target.maxWords) {
    errors.push(`${target.path} exceeds ${target.maxWords} words (${words})`);
  }

  for (const snippet of target.mustInclude) {
    if (!content.includes(snippet)) {
      errors.push(`${target.path} is missing required snippet: ${snippet}`);
    }
  }

  for (const snippet of target.mustExclude) {
    if (content.includes(snippet)) {
      errors.push(`${target.path} still includes banned snippet: ${snippet}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Skill compression baseline verification failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Skill compression baseline verification passed.");
