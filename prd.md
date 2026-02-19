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
- Displayed prominently above the canvas (e.g. "Draw: a cat")
- Examples: a cat, a house, a tree, a rocket, a fish, a mountain, a sun, a car, a flower, a robot, a bicycle, a penguin, a dragon, a lighthouse, a pizza, a castle, a cloud, a submarine, a cactus, a butterfly

### 2. Drawing Canvas
- Large white canvas (800×500px, responsive)
- Freehand drawing with mouse (click + drag)
- Basic touch support for tablet/mobile

### 3. Two Preset Colors
- **Color A:** Brown (`#795548`)
- **Color B:** Purple (`#7b1fa2`)
- User clicks a color button to select the active color
- Active color is visually indicated (highlighted button)

### 4. Brush Size
- Slider to adjust brush size (range: 2–20px)

### 5. Clear Button
- Resets the canvas to a blank white state

---

## Layout

```
┌─────────────────────────────────┐
│        Drawing Prompt           │  ← app title
│   Draw: [random prompt here]    │  ← prompt
├─────────────────────────────────┤
│                                 │
│           CANVAS                │  ← drawing area
│                                 │
├─────────────────────────────────┤
│  🟫 Brown  🟣 Purple  ── Size  [Clear] │  ← toolbar
└─────────────────────────────────┘
```

---

## Out of Scope
- Saving or exporting drawings
- User accounts or history
- More than 2 colors
- Text tools, shape tools, fill tools
- Server-side logic

---

## Tech Stack
- Pure HTML, CSS, JavaScript
- Single `index.html` file — no dependencies, no build step

---

## Verification
1. Open `index.html` in any modern browser
2. A random prompt appears on load
3. Drawing on the canvas produces brown strokes by default
4. Clicking the purple button switches stroke color to purple
5. The brush size slider changes stroke thickness
6. The clear button resets the canvas to white
