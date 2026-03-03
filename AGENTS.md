# AGENTS.md - Instructions for AI Agents

## Project Overview
Programming Learning App - a static SPA for learning Python and C# programming.
Runs on GitHub Pages, all data in LocalStorage, no backend.

## Architecture
- Single Page Application with hash-based routing
- Pure HTML/CSS/JS, no framework, no build step
- All libraries loaded via CDN (Ace Editor, Pyodide, marked.js, highlight.js)
- Bilingual: Czech (cz) and English (en)
- Two programming languages: Python and C#

## File Structure
- `index.html` - SPA shell with all page sections
- `css/style.css` - All styles, responsive, dark theme
- `js/storage.js` - LocalStorage abstraction (load/save profile, progress, badges)
- `js/i18n.js` - Translation dictionary + `t('key')` function
- `js/lessons.js` - 20 lessons data (Python + C# versions, CZ + EN)
- `js/tests.js` - 20 test definitions + evaluation logic
- `js/badges.js` - 50+ badge catalog with prices
- `js/editor.js` - Ace Editor wrapper + code execution (Pyodide for Python, transpiler for C#)
- `js/app.js` - Main router, state management, initialization

## Key Conventions
- All UI text uses `data-i18n` attributes, translated via `i18n.js`
- Lessons and tests have separate content for Python and C# (different syntax, different names)
- Code execution: Python runs via Pyodide (WASM), C# is transpiled to JS for simple programs
- Scoring: 0-100, <50 = fail (repeat), >=50 = pass
- Points from tests are used to buy badges
- No eval() in main context - all user code runs in sandboxed environments

## Security Rules
- Never use eval() on user input in main page context
- Python code runs through Pyodide (sandboxed WASM)
- C# transpiled code runs in sandboxed iframe (blob URL)
- Sanitize all user text input (profile name, description)
- No external data transmission, no cookies

## When Modifying
- Keep all text bilingual (CZ + EN)
- Keep lesson/test content separate for Python and C#
- Test changes with both languages and both programming languages
- Ensure responsive design works (test at 320px, 768px, 1024px+)
- All new dependencies must be open-source and loaded via CDN
