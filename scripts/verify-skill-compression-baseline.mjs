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

if (errors.length > 0) {
  console.error("Skill compression baseline verification failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Skill compression baseline verification passed.");
