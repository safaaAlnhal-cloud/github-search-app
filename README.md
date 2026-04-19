# GitHub User Search App

## 📌 Project Overview
This is a React application that allows users to search for GitHub profiles and view detailed user information such as avatar, name, bio, public repositories, followers, and following count.

The project demonstrates API integration, state management, custom hooks, theming, and unit testing.

---

## 🚀 Features

- 🔍 Search GitHub users by username
- 👤 Display user profile information from GitHub API
- 🌙 Fully functional Light/Dark theme support
- ⚡ Loading state during API requests
- ❌ Proper error handling (404, network errors, rate limiting)
- ♻️ Reset state when input is cleared
- ⌨️ Support for Enter key search
- 🧪 Unit testing with Vitest and React Testing Library

---

## 🎨 Theme Feature

Theme switching is fully implemented using:

- `useTheme` custom hook
- `ThemeToggle` component
- localStorage persistence

Users can switch between:
- Light Mode ☀️
- Dark Mode 🌙

The selected theme is saved and restored automatically on page reload.

---

## 📁 Folder Structure

src/
│
├── components/
│ ├── SearchBar.tsx
│ ├── UserCard.tsx
│ └── ThemeToggle.tsx
│
├── hooks/
│ ├── useGitHubUser.ts
│ └── useTheme.ts
│
├── services/
│ └── githubService.ts
│
├── App.tsx
├── main.tsx
└── App.css


---
## ⚙️ Setup Instructions

### 1. Install dependencies

```bash
npm install 

### 2. Run development server
npm run dev
---

## 🧪 Testing

This project uses:

- Vitest
- React Testing Library

### Run tests
npm run test


### Watch mode
npm run test:watch


### Coverage report
npm run coverage


---

## 🔐 Environment Variables

This project uses environment variables for the GitHub API:
 VITE_GITHUB_API=https://api.github.com/users


⚠️ Important:
- `.env` file must NOT be committed to GitHub
- Use `.env.example` to document required variables

---

## 🚀 Future Improvements

- Add pagination for user search results
- Add debounce to reduce API calls
- Improve UI animations and transitions
- Add caching for previously searched users
- Add E2E testing (Cypress or Playwright)

