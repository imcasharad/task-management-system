import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { useTheme } from "../../store/ThemeContext";

export const HomePage = () => {
  const handleSearch = (query: string) => {
    console.log("Global search:", query); // Placeholder for global search logic
  };

  const { isDarkMode } = useTheme(); // Use theme context

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark:bg-[#2D2D2D] dark:text-[#98C1D9]" : ""}`}>
      <Header onSearch={handleSearch} />
      <main className={`flex-1 p-4 md:p-6 ${isDarkMode ? "dark:bg-[#2D2D2D] dark:text-[#98C1D9]" : "bg-white text-[#2D2D2D]"}`}>
        <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"} md:text-3xl`}>Welcome to Task Management System</h2>
        <p className={`text-base ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"} md:text-lg`}>This is the home page. Add more content here later!</p>
      </main>
      <Footer />
    </div>
  );
};