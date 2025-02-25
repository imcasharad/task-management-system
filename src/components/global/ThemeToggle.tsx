import { useTheme } from "../../store/ThemeContext"; // Import useTheme

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-md ${isDarkMode ? "bg-[#98C1D9] text-[#2D2D2D] hover:bg-[#87B1C9]" : "bg-[#98C1D9] text-[#2D2D2D] hover:bg-[#87B1C9]"} focus:outline-none`}
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};