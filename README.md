# 🔍 GitHub User Search App

## 📌 Project Overview

This project is a React + TypeScript application that allows users to search for GitHub profiles using the GitHub API.


- API integration
- State management
- Custom hooks
- Error handling
- Loading states
- Unit testing

The goal of this project is to build a clean, scalable, and testable frontend architecture.


## ✨ Features

- 🔎 Search GitHub users by username
- 👤 Display user profile information:( Avatar , Name , Bio , Public repositories , Followers / Following ) 
- ⚡ Loading state during API requests
- ❌ Error handling:(User not found (404) , Network error , Rate limit / API errors )
- 🔄 State reset when input is cleared
- 🧠 Custom hook (`useGitHubUser`)
- 🧪 Unit testing with Vitest + React Testing Library
- 🎨 Theme support (UI styling / theme toggle if implemented)

## 💡 setup steps
 - npm install
 - npm run dev


## 📁 Folder Structure

src/
│
├── components/ # UI components (SearchBar, UserCard, ThemeToggle, SearchBar.test)
├── hooks/ # Custom hooks (useGitHubUser, useTheme, useGitHubUser.test )
├── services/ # API calls (fetchGitHubUser)
├── test/ # Test setup
├── App.css
└── App.tsx

## 🔐 Environment Variables

Create a `.env` file:

```bash id="env1"
VITE_GITHUB_API=https://api.github.com/users

