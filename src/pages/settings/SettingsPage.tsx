import { useState } from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { useTheme } from "../../store/ThemeContext";
import { Button } from "../../components/global/Button";
import { Link } from "react-router-dom";

const SettingsPage = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark:bg-[#2D2D2D] dark:text-[#98C1D9]" : "bg-white text-[#2D2D2D]"}`}>
      <Header onSearch={() => {}} />
      <main className={`flex-1 p-4 md:p-6 ${isDarkMode ? "dark:bg-[#2D2D2D] dark:text-[#98C1D9]" : "bg-white text-[#2D2D2D]"}`}>
        <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>Settings</h3>
        <div className="space-y-4">
          <Link to="/settings/manage-categories">
            <Button className="w-full">Manage Categories</Button>
          </Link>
          <Link to="/settings/manage-category-types">
            <Button className="w-full">Manage Category Types</Button>
          </Link>
          {/* Placeholder for future settings features */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SettingsPage;