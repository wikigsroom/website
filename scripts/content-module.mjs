import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

export function readContentModule(filename, cache = new Map()) {
  const resolved = path.resolve(filename);
  if (cache.has(resolved)) return cache.get(resolved).exports;
  if (resolved.endsWith('.json')) return JSON.parse(fs.readFileSync(resolved, 'utf8'));
  const module = { exports: {} };
  cache.set(resolved, module);
  const output = ts.transpileModule(fs.readFileSync(resolved, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText;
  const require = (specifier) => {
    if (!specifier.startsWith('.'))
      throw new Error(`Content modules may only import local data: ${specifier}`);
    const source = path.resolve(path.dirname(resolved), specifier);
    return readContentModule(path.extname(source) ? source : `${source}.ts`, cache);
  };
  vm.runInNewContext(
    output,
    { module, exports: module.exports, require },
    { filename: resolved, timeout: 10000 },
  );
  return module.exports;
}
