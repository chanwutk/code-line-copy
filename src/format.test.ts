import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildReference } from './format';

test('no ranges → path only', () => {
  assert.equal(buildReference('src/parser.ts', null), '@src/parser.ts');
  assert.equal(buildReference('src/parser.ts', []), '@src/parser.ts');
});

test('single-line range → #Ln', () => {
  assert.equal(
    buildReference('src/parser.ts', [{ start: 12, end: 12 }]),
    '@src/parser.ts#L12'
  );
});

test('multi-line range → #Lstart-Lend', () => {
  assert.equal(
    buildReference('src/parser.ts', [{ start: 12, end: 15 }]),
    '@src/parser.ts#L12-L15'
  );
});

test('raw end line is used verbatim (full lines 12-14 arrive as 12-15)', () => {
  // The caller passes selection.end.line + 1 without trimming the trailing
  // column-0 line, so a full 3-line selection reports L12-L15 by design.
  assert.equal(
    buildReference('src/parser.ts', [{ start: 12, end: 15 }]),
    '@src/parser.ts#L12-L15'
  );
});

test('multiple selections → one ref per range, newline-separated', () => {
  assert.equal(
    buildReference('src/parser.ts', [
      { start: 12, end: 15 },
      { start: 40, end: 42 },
    ]),
    '@src/parser.ts#L12-L15\n@src/parser.ts#L40-L42'
  );
});

test('mixed single and multi-line selections', () => {
  assert.equal(
    buildReference('src/parser.ts', [
      { start: 5, end: 5 },
      { start: 40, end: 42 },
    ]),
    '@src/parser.ts#L5\n@src/parser.ts#L40-L42'
  );
});

test('absolute path string is used verbatim', () => {
  assert.equal(
    buildReference('/Users/me/proj/src/parser.ts', [{ start: 12, end: 15 }]),
    '@/Users/me/proj/src/parser.ts#L12-L15'
  );
  assert.equal(
    buildReference('/Users/me/proj/src/parser.ts', null),
    '@/Users/me/proj/src/parser.ts'
  );
});
