# Frontend - Blog Platform (React + TypeScript)

This is the frontend of the Blog Platform, built with **React**, **TypeScript**, and **Vite**. It consumes the API provided by the Django + DRF backend and provides a complete blog interface with authentication, post creation, nested comments, and user profile management.

---

## 🚀 Tech Stack

- ⚛️ React 18+
- 🔐 TypeScript
- ⚡ Vite
- 📡 Axios (API requests)
- 🌐 React Router DOM (routing)
- 🎨 Tailwind CSS (styling)
- 🧪 Jest + React Testing Library (tests)

---

## 🛠️ Project Setup

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
The app will be available at http://localhost:5173

## 📁 Folder Structure
```bash
frontend/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page views (Home, Login, Register, etc.)
│   ├── services/       # API integration (e.g., axios config)
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript interfaces/types
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── index.html
└── vite.config.ts      # Vite config
```
## 🔒 Environment Variables
Create a .env file in the root of frontend/ and define:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```
## 🧪 Running Tests
```bash
npm run test
```
## ✅ Todo
- ☐ Authentication flow (login, register, JWT)
- ☐ Post CRUD
- ☐ Nested comment system
- ☐ Author profile with stats
- ☐ Responsive UI

## 📦 Build
```bash
npm run build
```

## 📄 License
This project is licensed under the MIT License.