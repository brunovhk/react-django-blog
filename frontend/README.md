# 💻 Frontend - React + Vite + MUI

This folder contains the frontend built with **React 18**, **Vite**, and **Material UI**, consuming the Django REST API and handling authentication, routing, and post display.

---

## ⚙️ Tech Stack

- React 18 (via Vite)
- TypeScript
- Material UI (MUI 7)
- React Router DOM v7
- Axios for API requests
- React Quill for rich-text post creation
- jwt-decode for decoding access tokens

---

## 📦 Installation

```bash
cd frontend
npm install
```

---

## 🚀 Development

```bash
npm run dev
```

This starts the dev server at:

```
http://localhost:5173/
```

Make sure your backend is running at:

```
http://localhost:8000/
```

---

## 🧪 Available Commands

```bash
npm run dev       # Start dev server
npm run build     # Build production-ready bundle
npm run preview   # Preview built output
npm run lint      # Run linter
```

---

## 🔐 Environment Variables

Create a `.env` file based on `.env.example`:

```
VITE_API_URL=http://localhost:8000/api/
```

---

## 🌐 Routes Overview

| Path                   | Description                      |
| ---------------------- | -------------------------------- |
| `/`                    | Homepage with latest posts       |
| `/posts/:id`           | View a single post with comments |
| `/dashboard`           | Create a new post                |
| `/authors/:username`   | View author profile              |
| `/login` / `/register` | Auth pages                       |
| `*`                    | Fallback for invalid URLs (404)  |

---

## 📐 Project Structure

```
frontend/
├── src/
│   ├── api/             # Axios instance
│   ├── assets/          # Static assets (e.g. logo)
│   ├── auth/            # Auth context and token logic
│   ├── components/      # Shared UI components
│   ├── pages/           # Page views
│   ├── routes/          # App routing definitions
│   ├── types/           # Shared TypeScript types
│   ├── utils/           # Utility functions
│   └── main.tsx         # App entry point
├── public/
└── vite.config.ts       # Vite config
```

---

## 🧪 Features

- Pagination with scroll-to-top
- Input validation with field-level errors
- Responsive layout using MUI Grid
- Error fallback for 404 and no results
- Token-based login and protected routes
- NotFound fallback and empty result handling

---

## 🌍 Deployment (Vercel)

- Deploy via GitHub integration
- Only `main` branch is deployed to production
- Set `VITE_API_URL` in Vercel dashboard

---

## 📄 License

See root [`README.md`](../README.md)
