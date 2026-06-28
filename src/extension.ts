import * as vscode from 'vscode';
import { buildReference, LineRange } from './format';

const STATUS_TIMEOUT_MS = 2500;

function copyReference(useAbsolute: boolean): void {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.setStatusBarMessage('Copy Code Reference: no active editor', STATUS_TIMEOUT_MS);
    return;
  }

  const uri = editor.document.uri;
  if (uri.scheme !== 'file') {
    vscode.window.setStatusBarMessage(
      'Copy Code Reference: file is not saved to disk',
      STATUS_TIMEOUT_MS
    );
    return;
  }

  // Relative path uses asRelativePath, which already prefixes the workspace
  // folder name in multi-root workspaces and falls back to the absolute path
  // when the file is outside every workspace folder.
  const path = useAbsolute ? uri.fsPath : vscode.workspace.asRelativePath(uri);

  // One range per non-empty selection (an empty selection is just a caret and
  // means "no highlight" → path only). End line is taken raw, top-to-bottom.
  const ranges: LineRange[] = editor.selections
    .filter((s) => !s.isEmpty)
    .map((s) => ({ start: s.start.line + 1, end: s.end.line + 1 }))
    .sort((a, b) => a.start - b.start || a.end - b.end);

  const text = buildReference(path, ranges.length ? ranges : null);

  void vscode.env.clipboard.writeText(text).then(() => {
    vscode.window.setStatusBarMessage('Copied: ' + text.replace(/\n/g, ' '), STATUS_TIMEOUT_MS);
  });
}

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand('codeLineCopy.copyReference', () => copyReference(false)),
    vscode.commands.registerCommand('codeLineCopy.copyReferenceAbsolute', () =>
      copyReference(true)
    )
  );
}

export function deactivate(): void {
  // Nothing to clean up.
}
