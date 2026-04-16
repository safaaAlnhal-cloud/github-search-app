type Props = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};
function ThemeToggle({ theme, setTheme }: Props) {
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

     