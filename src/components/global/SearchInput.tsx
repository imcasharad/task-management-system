import { ChangeEvent, useState } from "react";
import { useTheme } from "../../store/ThemeContext";

interface SearchInputProps {
  placeholder: string;
  onSearch: (query: string) => void;
  initialValue?: string;
}

export const SearchInput = ({ placeholder, onSearch, initialValue = "" }: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const { isDarkMode } = useTheme();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={searchQuery}
      onChange={handleSearch}
      className={`w-full p-2 rounded-md border ${isDarkMode ? "border-[#98C1D9] bg-[#2D2D2D] text-white" : "border-[#98C1D9] bg-white text-[#2D2D2D]"} focus:outline-none focus:ring-2 focus:ring-[#EE6C4D]`}
    />
  );
};