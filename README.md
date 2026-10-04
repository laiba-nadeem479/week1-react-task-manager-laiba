# React Task Manager (Part 1)

AUREX Full-Stack Internship, Month 2, Week 1.
A component-driven rebuild of my Month 1 JavaScript Task Manager using React and Vite.

**Live demo:** <PASTE YOUR VERCEL / NETLIFY / GITHUB PAGES LINK HERE>



## Features

- Add tasks with a controlled form input
- Tasks render dynamically from an array using `.map()` with unique `key` props
- Toggle a task complete or incomplete (checkbox, strikethrough styling)
- Delete tasks
- Validation: empty or whitespace-only tasks are rejected with an error message
- Bonus: priority levels (low / medium / high), edit a task (double-click or Edit), filters (All / To do / Done), clear completed, progress counter with bar, tasks saved in the browser (localStorage)

## Component hierarchy

```
App                  owns the tasks state (useState)
├── Header           shows title and counts (props: total, completed)
├── TaskForm         controlled input + priority, validation (prop: onAddTask)
├── FilterBar        All / To do / Done tabs, clear done (bonus)
└── TaskList         maps over tasks (props: tasks, filter, onToggle, onEdit, onDelete)
    └── TaskItem     one task row, inline edit (props: task, onToggle, onEdit, onDelete)
```

## State flow

1. `App` holds `tasks` in `useState` (single source of truth).
2. Data flows **down** as props: `App → TaskList → TaskItem`.
3. Events flow **up** through function props: `TaskForm` calls `onAddTask`, `TaskItem` calls `onToggle` / `onDelete`, and `App` updates the state.
4. State changes cause React to re-render, so the UI always matches the data.

## Getting started

Requirements: Node.js 18+ and npm.

```bash
git clone <YOUR_REPO_URL>
cd week-1-react-task-manager
npm install
npm run dev        # opens http://localhost:5173
```

Other commands: `npm run build` (production build to `dist/`), `npm run preview` (serve the build locally).

## Project structure

```
week-1-react-task-manager/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx            entry point, mounts <App />
    ├── App.jsx             root component and state
    ├── index.css           global styles
    └── components/
        ├── Header.jsx
        ├── TaskForm.jsx
        ├── FilterBar.jsx
        ├── TaskList.jsx
        └── TaskItem.jsx
```

## What I learned

- Setting up a React project with Vite and reading its file structure
- Writing JSX and reusable functional components
- Passing data with props and lifting state up
- Using `useState` and handling `onChange`, `onSubmit`, `onClick`
- Rendering lists with stable `key` props
- Building controlled forms with basic validation

## Tech stack

React 18, Vite 5, plain CSS.
