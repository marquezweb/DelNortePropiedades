import { access, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = new URL('../', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('upload-manifest.json', root), 'utf8'));
for (const file of manifest.files) await access(new URL(file.path, root));
for (const file of manifest.files.filter(file => /\.(js|mjs)$/.test(file.path))) {
  const result = spawnSync(process.execPath, ['--check', fileURLToPath(new URL(file.path, root))], { encoding:'utf8' });
  if (result.status !== 0) throw new Error(file.path + ': ' + result.stderr);
}
console.log('OK: ' + manifest.files.length + ' archivos presentes y JavaScript válido.');
