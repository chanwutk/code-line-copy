# Change Log

All notable changes to the "Copy Code Reference" extension are documented here.

## [0.0.1] - Initial release

- `Copy Code Reference` command — copies `@<workspace-relative-path>#L<start>-L<end>`
  for the selected lines (falls back to the absolute path when the file is outside the
  workspace).
- `Copy Code Reference (Absolute Path)` command — same format using the absolute path.
- One reference per non-empty selection (multi-cursor friendly), newline-separated.
- With no highlight, copies the path only (`@<path>`).
- Default keybindings: `cmd+l` / `ctrl+l` (relative) and `cmd+shift+l` / `ctrl+shift+l`
  (absolute), scoped to editor focus.
- Status-bar confirmation of what was copied.
