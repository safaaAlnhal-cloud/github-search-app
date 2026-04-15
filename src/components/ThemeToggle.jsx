function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      className="theme-btn"
      onClick={() =>
        setTheme(theme === "light" ? "dark" : "light")
      }
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  )
}

export default ThemeToggle

     