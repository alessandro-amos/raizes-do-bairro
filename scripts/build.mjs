// Build de produção: gera dist/ com JS empacotado e minificado, CSS minificado,
// imagens copiadas e index.html na raiz com caminhos ajustados e hash de cache.
import { build } from 'esbuild';
import { cp, mkdir, readFile, rm, writeFile, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const raiz = path.resolve(import.meta.dirname, '..');
const dist = path.join(raiz, 'dist');

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, 'js'), { recursive: true });
await mkdir(path.join(dist, 'css'), { recursive: true });

// 1) JS: todos os módulos viram um único arquivo (menos requisições), minificado, com sourcemap
const js = await build({
  entryPoints: [path.join(raiz, 'js/main.js')],
  bundle: true, minify: true, sourcemap: true, format: 'esm', target: ['es2020'],
  outfile: path.join(dist, 'js/main.js'), metafile: true, write: true
});

// 2) CSS: reset + style concatenados e minificados
await build({
  entryPoints: [path.join(raiz, 'css/reset.css'), path.join(raiz, 'css/fonts.css'), path.join(raiz, 'css/style.css')],
  bundle: true, minify: true, outdir: path.join(dist, 'css'), loader: { '.png': 'file', '.jpg': 'file' }, external: ['*.woff2']
});

// 3) Imagens
await cp(path.join(raiz, 'img'), path.join(dist, 'img'), { recursive: true });
await cp(path.join(raiz, 'fonts'), path.join(dist, 'fonts'), { recursive: true });

// 4) HTML: sai de html/index.html para dist/index.html; caminhos ../ viram ./ e ganham hash para cache
const hash = (buf) => createHash('md5').update(buf).digest('hex').slice(0, 8);
const hJs = hash(await readFile(path.join(dist, 'js/main.js')));
const hCss = hash(await readFile(path.join(dist, 'css/style.css')));
let html = await readFile(path.join(raiz, 'html/index.html'), 'utf8');
html = html
  .replace('  <base href="../">\n', '')
  .replace('<link rel="stylesheet" href="css/reset.css">\n', '')
  .replace('<link rel="stylesheet" href="css/fonts.css">\n', '')
  .replace('css/style.css', `css/style.css?v=${hCss}`)
  .replace('js/main.js', `js/main.js?v=${hJs}`)
  .replace(/\n\s*<!--[^>]*-->/g, '')
  .replace(/>\s+</g, '><').trim();
await writeFile(path.join(dist, 'index.html'), html);
// .nojekyll evita que o GitHub Pages ignore arquivos/pastas com underscore
await writeFile(path.join(dist, '.nojekyll'), '');

// 5) Relatório de tamanho
async function tamanho(dir) {
  let total = 0;
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    total += e.isDirectory() ? await tamanho(p) : (await stat(p)).size;
  }
  return total;
}
const kb = (n) => (n / 1024).toFixed(1) + ' KB';
console.log('dist/js/main.js  ', kb((await stat(path.join(dist, 'js/main.js'))).size));
console.log('dist/css/style.css', kb((await stat(path.join(dist, 'css/style.css'))).size));
console.log('dist/ total       ', kb(await tamanho(dist)));
