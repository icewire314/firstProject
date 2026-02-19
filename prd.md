# Product Requirements Document: Drawing Web App

## Overview
A simple browser-based drawing application that gives the user a random prompt and a canvas to draw on using two preset colors. No backend or installation required — runs entirely in the browser from a single HTML file.

---

## Goals
- Present a random drawing prompt to inspire the user
- Provide a clean, minimal canvas for freehand drawing
- Keep the tool simple and immediately usable with no setup

---

## Users
Anyone who wants a quick, fun drawing exercise in the browser.

---

## Core Features

### 1. Random Drawing Prompt
- On page load, a prompt is randomly selected from a built-in list (~20 items)
- Displayed prominently above the toolbar and canvas (e.g. "Draw: a cat")
- Examples: a cat, a house, a tree, a rocket, a fish, a mountain, a sun, a car, a flower, a robot, a bicycle, a penguin, a dragon, a lighthouse, a pizza, a castle, a cloud, a submarine, a cactus, a butterfly

### 2. Drawing Canvas
- Internal resolution: 800×500px (8:5 aspect ratio)
- Scales to fit window width — shrinks/grows proportionally with browser width, centered on page
- White background
- Thin visible border to distinguish canvas from page background
- Freehand drawing with smooth bezier curves (not jagged straight lines)
- Full touch support for mobile and tablet (no page scroll while drawing)

### 3. Two Preset Colors
- **Color A:** Brown (`#795548`)
- **Color B:** Purple (`#7b1fa2`)
- User clicks a color button to select the active color
- Active tool is visually indicated (highlighted button)

### 4. Eraser
- Dedicated eraser button in the toolbar
- Paints white over drawn content (does not make pixels transparent)
- Same 8px brush size as drawing
- Active state visually indicated like color buttons

### 5. Fixed Brush Size
- All drawing (and erasing) uses a fixed 8px medium brush
- No size slider — simplicity over configurability
- Round line caps and joins for a natural feel

### 6. Single Undo
- Ctrl+Z (or Cmd+Z on Mac) reverts the last stroke
- One level of undo only — no multi-step history

### 7. Clear Button
- Resets the entire canvas to blank white
- Also resets the undo history
- Styled with a red background to signal it is a destructive action

---

## Layout

```
┌─────────────────────────────────────────┐
│           Drawing Prompt                 │  ← app title
│      Draw: [random prompt here]          │  ← prompt text
├─────────────────────────────────────────┤
│  [■ Brown] [■ Purple] [◻ Eraser] [✕ Clear]  │  ← toolbar (above canvas)
├─────────────────────────────────────────┤
│                                         │
│              CANVAS                     │  ← scales to window width
│         (thin border)                   │
└─────────────────────────────────────────┘
```

---

## Visual Style
- Minimal and clean
- White page background
- Sans-serif font
- Browser tab title: "Drawing Prompt"
- No hint or instructional text — clean interface
- Toolbar buttons:
  - Brown button: brown background (`#795548`), white text
  - Purple button: purple background (`#7b1fa2`), white text
  - Eraser button: grey background (`#9e9e9e`), white text
  - Clear button: red background (`#e53935`), white text
- Active tool indicated by bright white outline around the button
- Brown is the default active tool on load

---

## Out of Scope
- Saving or exporting drawings
- User accounts or history
- More than 2 colors
- Text tools, shape tools, fill tools
- Multi-step undo/redo
- Adjustable brush size
- Server-side logic

---

## Tech Stack
- Pure HTML, CSS, JavaScript
- Single `index.html` file — no dependencies, no build step
- Works by opening the file directly in a browser (no server needed)

---

## Verification
1. Open `index.html` in any modern browser
2. A random prompt appears on load (different each reload)
3. Drawing on the canvas produces smooth brown strokes by default
4. Clicking Purple switches stroke color to purple
5. Clicking Eraser erases drawn content
6. Ctrl+Z / Cmd+Z reverts the last stroke
7. Clear button resets the canvas to white
8. Resizing the browser — canvas scales proportionally
9. On mobile/tablet — touch drawing works without scrolling the page
