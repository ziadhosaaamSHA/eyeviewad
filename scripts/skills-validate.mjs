#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const canonical = path.join(root, '.github', '.agents', 'skills');
const mirrors = [
  path.join(root, '.agents', 'skills'),
  path.join(root, '.windsurf', 'skills'),
  path.join(root, '.trae', 'skills'),
];

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function getDirs(p) {
  const entries = await fs.readdir(p, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
}

function extractFrontmatterName(content) {
  const fm = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return null;
  const nameMatch = fm[1].match(/(^|\n)name:\s*"?([^\n"]+)"?/i);
  return nameMatch?.[2]?.trim() ?? null;
}

async function validateCanonical(canonicalSkills) {
  const errors = [];

  for (const skill of canonicalSkills) {
    const skillMd = path.join(canonical, skill, 'SKILL.md');
    if (!(await exists(skillMd))) {
      errors.push(`Missing SKILL.md for canonical skill: ${skill}`);
      continue;
    }

    const content = await fs.readFile(skillMd, 'utf8');
    const name = extractFrontmatterName(content);
    if (!name) {
      errors.push(`Missing YAML frontmatter name in ${skillMd}`);
      continue;
    }

    if (name !== skill) {
      errors.push(`Frontmatter name mismatch in ${skillMd}: expected '${skill}', got '${name}'`);
    }
  }

  return errors;
}

async function validateMirror(mirrorPath, canonicalSkills) {
  const errors = [];

  if (!(await exists(mirrorPath))) {
    errors.push(`Missing mirror directory: ${path.relative(root, mirrorPath)}`);
    return errors;
  }

  const mirrorSkills = await getDirs(mirrorPath);
  const canonicalSet = new Set(canonicalSkills);
  const mirrorSet = new Set(mirrorSkills);

  const missingSkills = canonicalSkills.filter((s) => !mirrorSet.has(s));
  const extraSkills = mirrorSkills.filter((s) => !canonicalSet.has(s));

  if (missingSkills.length > 0) {
    errors.push(`Mirror ${path.relative(root, mirrorPath)} missing skills: ${missingSkills.join(', ')}`);
  }

  if (extraSkills.length > 0) {
    errors.push(`Mirror ${path.relative(root, mirrorPath)} has extra skills: ${extraSkills.join(', ')}`);
  }

  for (const skill of canonicalSkills) {
    const skillMd = path.join(mirrorPath, skill, 'SKILL.md');
    if (!(await exists(skillMd))) {
      errors.push(`Mirror ${path.relative(root, mirrorPath)} missing SKILL.md for ${skill}`);
    }
  }

  return errors;
}

async function main() {
  if (!(await exists(canonical))) {
    throw new Error(`Missing canonical directory: ${path.relative(root, canonical)}`);
  }

  const canonicalSkills = await getDirs(canonical);
  const errors = [];

  errors.push(...(await validateCanonical(canonicalSkills)));

  for (const mirror of mirrors) {
    errors.push(...(await validateMirror(mirror, canonicalSkills)));
  }

  if (errors.length > 0) {
    console.error('Skills validation failed:');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Skills validation passed for ${canonicalSkills.length} skills across canonical + mirrors.`);
}

main().catch((error) => {
  console.error('skills-validate failed:', error.message);
  process.exit(1);
});
