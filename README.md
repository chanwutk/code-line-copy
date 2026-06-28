# Copy Code Reference

Copy a [Claude Code](https://claude.com/claude-code)-friendly reference to the lines you
have highlighted, so you can paste it straight into a Claude Code prompt as an
`@`-mention.

```
@src/utils/parser.ts#L12-L30
```

## What it copies

| Situation | Result |
| --- | --- |
| Multi-line selection | `@src/utils/parser.ts#L12-L30` |
| Single line | `@src/utils/parser.ts#L12` |
| No selection (caret only) | `@src/utils/parser.ts` |
| Multiple selections / multi-cursor | one reference per selection, newline-separated |

The path is computed with VS Code's workspace-relative resolver: in a multi-root
workspace it includes the folder name, and if the file lives outside every workspace
folder it falls back to the absolute path.

> **Note on line counting:** the end line is reported exactly as VS Code reports the end
> of the selection. Selecting all of lines 12–14 (where the caret lands at the start of
> line 15) reports `#L12-L15`.

## Commands & keybindings

| Command | Keybinding (macOS / other) | Description |
| --- | --- | --- |
| `Copy Code Reference` | `⌘L` / `Ctrl+L` | Workspace-relative path |
| `Copy Code Reference (Absolute Path)` | `⌘⇧L` / `Ctrl+Shift+L` | Absolute path |

Both are also available from the Command Palette (`⇧⌘P`) under **Copy Code Reference**.

> The default keybindings intentionally shadow VS Code's built-in **Expand Line
> Selection** (`⌘L`) and **Select All Occurrences** (`⌘⇧L`) while the editor is focused.
> Rebind them in **Preferences → Keyboard Shortcuts** if you want those back.

A status-bar message confirms exactly what was copied.

## Development

```sh
npm install
npm run compile     # tsc → out/
npm test            # compiles, then runs node:test against out/
```

Press <kbd>F5</kbd> to launch the Extension Development Host and try the commands.

## Icon

The icon is authored as `icon.svg` and rendered to `icon.png` (128×128). To regenerate:

```sh
rsvg-convert -w 128 -h 128 icon.svg -o icon.png
# or, without rsvg-convert installed:
npx svgexport icon.svg icon.png 128:128
```

## Publishing to the Marketplace

These steps are one-time and must be done by the publisher:

1. Create a publisher at <https://marketplace.visualstudio.com/manage> (requires an Azure
   DevOps organization).
2. Generate an Azure DevOps **Personal Access Token** with the **Marketplace → Manage**
   scope, for **all accessible organizations**.
3. Replace the `publisher` placeholder in `package.json` with your publisher ID.
4. Log in and publish:

   ```sh
   npx @vscode/vsce login <your-publisher-id>   # paste the PAT
   npx @vscode/vsce package                     # builds code-line-copy-x.y.z.vsix
   npx @vscode/vsce publish
   ```

To install the packaged build locally without publishing:

```sh
code --install-extension code-line-copy-0.0.1.vsix
```

## License

[MIT](./LICENSE) © 2026 chanwutk
