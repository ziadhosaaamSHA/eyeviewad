#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const canonicalDir = path.join(root, '.github', '.agents', 'skills');
const mirrors = [
  path.join(root, '.agents', 'skills'),
  path.join(root, '.windsurf', 'skills'),
  path.join(root, '.trae', 'skills'),
];

const lockPath = path.join(root, 'skills-lock.json');

async function listSkillDirs(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
}

async function ensureCleanDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const canonicalExists = await fileExists(canonicalDir);
  if (!canonicalExists) {
    throw new Error(`Canonical skills directory not found: ${canonicalDir}`);
  }

  const skills = await listSkillDirs(canonicalDir);

  for (const mirrorPath of mirrors) {
    await ensureCleanDir(mirrorPath);

    for (const skill of skills) {
      const from = path.join(canonicalDir, skill);
      const to = path.join(mirrorPath, skill);
      await fs.cp(from, to, { recursive: true });
    }
  }

  const lockPayload = {
    generatedAt: new Date().toISOString(),
    canonicalPath: '.github/.agents/skills',
    mirrors: ['.agents/skills', '.windsurf/skills', '.trae/skills'],
    skills: skills.map((name) => ({
      name,
      source: 'local-canonical',
      hash: 'not-tracked',
    })),
  };

  await fs.writeFile(lockPath, `${JSON.stringify(lockPayload, null, 2)}\n`, 'utf8');

  console.log(`Synced ${skills.length} skills to all mirrors.`);
  console.log(`Updated lockfile at ${lockPath}.`);
}

main().catch((error) => {
  console.error('skills-sync failed:', error.message);
  process.exit(1);
});
