# withconscious.dev — Local Development

## Running locally

The site is pure HTML/CSS/JS — no build step needed.

### Option 1: Python (recommended)
```bash
cd withconscious
python3 -m http.server 8080
```
Open: http://localhost:8080

### Option 2: Node.js
```bash
cd withconscious
npx serve .
```
Open: http://localhost:3000

### Option 3: VS Code
Install the "Live Server" extension, right-click `index.html` → Open with Live Server.

## File structure

```
withconscious/
├── index.html      # Main landing page
├── docs.html       # Documentation page
├── style.css       # All styles
├── main.js         # Interactions, animations, demo
└── README.md       # This file
```

## Pages

- **/** (index.html) — Full landing page with hero demo, all sections, pricing, trial CTA
- **/docs.html** — API documentation

## Deploying to withconscious.dev

Upload the four files (index.html, docs.html, style.css, main.js) to any static host:

- **Netlify**: Drag the folder to netlify.com/drop
- **Vercel**: `npx vercel` from the folder
- **GitHub Pages**: Push to a repo, enable Pages on the main branch
- **Cloudflare Pages**: Connect the repo or drag-and-drop

No build step. No dependencies. No config needed.
