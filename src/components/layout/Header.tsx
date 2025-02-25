import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "../global/ThemeToggle"; // Updated path
import { SearchInput } from "../global/SearchInput"; // New import
import { useTheme } from "../../store/ThemeContext";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode } = useTheme();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query); // Notify parent (App) of search
  };

  return (
    <header className={`bg-[#3D5A80] text-white p-4 shadow-md ${isDarkMode ? "dark:bg-gray-800 dark:text-[#98C1D9]" : ""}`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={`p-2 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-[#305179]"} focus:outline-none`}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className={`text-xl font-bold ${isDarkMode ? "text-[#98C1D9]" : "text-[#2D2D2D]"}`}>Task Management System</h1>
        </div>
        <div className="flex items-center space-x-4">
          <SearchInput placeholder="Global Search..." onSearch={handleSearch} />
          <ThemeToggle />
        </div>
      </div>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={(path) => {
          window.location.href = path;
          setIsSidebarOpen(false);
        }}
      />
    </header>
  );
};