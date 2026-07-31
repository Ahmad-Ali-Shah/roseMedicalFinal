import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('design tokens expose the approved Rosa visual system', async () => {
  const css = await read('styles/tokens.css');
  for (const token of [
    '--color-rosa-red', '--color-ink', '--color-warm-white', '--color-mist',
    '--color-steel', '--color-border', '--font-editorial', '--font-interface',
    '--container-wide', '--container-reading', '--space-section', '--radius-control'
  ]) assert.match(css, new RegExp(token.replaceAll('-', '\\-')));
});

test('layout primitives are present and use semantic elements', async () => {
  const container = await read('components/layout/container.tsx');
  const section = await read('components/layout/section.tsx');
  assert.match(container, /export function Container/);
  assert.match(section, /export function Section/);
  assert.match(section, /<section/);
});

test('public shell contains the approved navigation and procurement actions', async () => {
  const shell = await read('components/layout/public-shell.tsx');
  for (const label of ['Products', 'Catalogues', 'About', 'Contact', 'Search', 'Inquiry']) assert.match(shell, new RegExp(label));
  assert.match(shell, /aria-label="Primary navigation"/);
  assert.match(shell, /aria-label="Footer navigation"/);
  assert.match(shell, /Request a quote/);
});

test('admin shell preserves the complete single-owner workspace navigation', async () => {
  const shell = await read('components/layout/admin-shell.tsx');
  for (const label of ['Overview', 'Products', 'Families', 'Catalogues', 'Media', 'Inquiries', 'Messages', 'Website Content', 'Contact Details', 'Publishing', 'Revisions', 'Settings']) assert.match(shell, new RegExp(label));
  assert.match(shell, /Single owner workspace/);
  assert.match(shell, /Preview public site/);
});

test('base UI primitives cover controls, surfaces, status and feedback', async () => {
  const files = {
    button: await read('components/ui/button.tsx'), field: await read('components/ui/field.tsx'),
    card: await read('components/ui/card.tsx'), status: await read('components/ui/status.tsx'), alert: await read('components/ui/alert.tsx')
  };
  assert.match(files.button, /export function Button/);
  assert.match(files.field, /export function Field/);
  assert.match(files.card, /export function Card/);
  assert.match(files.status, /export function Status/);
  assert.match(files.alert, /export function Alert/);
});

test('button links preserve Next typed-route literal inference', async () => {
  const button = await read('components/ui/button.tsx');
  assert.match(button, /ButtonLinkProps<T extends string>/);
  assert.match(button, /href:\s*Route<T>;/);
  assert.doesNotMatch(button, /Route<T>\s*\|\s*URL/);
  assert.match(button, /ButtonLink<T extends string>/);
});

test('wide and reading containers select their own maximum width', async () => {
  const css = await read('styles/layout.css');
  assert.match(css, /\.container \{ --container-size: var\(--container-standard\)/);
  assert.match(css, /\.container--wide \{ --container-size: var\(--container-wide\)/);
  assert.match(css, /\.container--reading \{ --container-size: var\(--container-reading\)/);
});

test('dark footer keeps the Rosa wordmark visible', async () => {
  const css = await read('styles/layout.css');
  assert.match(css, /\.site-footer \.brand \{ color: var\(--color-paper\)/);
});

test('global stylesheet composes tokens, base, layout and components in order', async () => {
  const css = await read('app/globals.css');
  const imports = ['../styles/tokens.css', '../styles/base.css', '../styles/layout.css', '../styles/components.css'];
  let previous = -1;
  for (const value of imports) {
    const current = css.indexOf(value);
    assert.ok(current > previous, `${value} must be imported after the previous foundation stylesheet`);
    previous = current;
  }
});
