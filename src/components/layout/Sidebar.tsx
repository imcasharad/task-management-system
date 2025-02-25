import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../store/ThemeContext";
import { SearchInput } from "../global/SearchInput"; // New import

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const Sidebar = ({ isOpen, onClose, onNavigate }: SidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useTheme();
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Group", path: "/groups" },
  ].filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <Dialog.Panel className={`fixed left-0 top-0 bottom-0 w-64 ${isDarkMode ? "bg-[#2D2D2D] text-[#98C1D9]" : "bg-[#98C1D9] text-[#2D2D2D]"} shadow-lg p-4 transform transition-transform duration-300 ease-in-out`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-lg font-semibold ${isDarkMode ? "text-[#98C1D9]" : "text-[#2D2D2D]"}`}>Menu</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-md ${isDarkMode ? "hover:bg-[#1D1D1D]" : "hover:bg-[#87B1C9]"} focus:outline-none`}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <SearchInput placeholder="Search options..." onSearch={handleSearch} />
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                onNavigate(item.path);
                onClose();
              }}
              className={`w-full text-left p-2 rounded-md ${isDarkMode ? "hover:bg-[#1D1D1D] text-[#98C1D9] hover:text-[#EE6C4D]" : "hover:bg-[#87B1C9] text-[#2D2D2D] hover:text-[#EE6C4D]"} focus:outline-none`}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </Dialog.Panel>
    </Dialog>
  );
};