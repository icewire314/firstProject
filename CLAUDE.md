# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A browser-based freehand drawing web app. The user is shown a random prompt (e.g. "Draw: a cat") and draws on a canvas using two preset colors. No build step, no server, no dependencies — runs by opening `index.html` directly in a browser.

## Architecture

The entire app lives in a single file: `index.html` (HTML + embedded `<style>` + embedded `<script>`). There is no framework, bundler, or package manager.

Key implementation decisions (see `prd.md` for full details):
- **Canvas**: 800×500 internal resolution, CSS-scaled to fit window width. Mouse/touch coordinates must be scaled by `canvas.width / rect.width` and `canvas.height / rect.height`.
- **Strokes**: Smooth bezier curves via `quadraticCurveTo` with midpoints. `lineCap/lineJoin: 'round'`, fixed 8px brush.
- **Colors**: Brown `#795548` (default) and Purple `#7b1fa2`. Eraser paints white. Clear fills white.
- **Undo**: Single level — save `getImageData` on each `mousedown`/`touchstart`, restore on Ctrl+Z / Cmd+Z.
- **Touch**: `touchstart`/`touchmove`/`touchend` with `e.preventDefault()` to block scroll. Coordinates from `e.touches[0]`.
- **Toolbar**: Above canvas. Brown | Purple | Eraser | Clear. Active tool shown with white outline. Clear button is red (`#e53935`).

## Git

- Do not include "Co-Authored-By: Claude" in commit messages.
- Remote: `https://github.com/icewire314/firstProject` (branch: `master`)
