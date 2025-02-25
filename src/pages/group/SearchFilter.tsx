import { useState } from "react";
import { InputField } from "../../components/global/InputField";
import { Button } from "../../components/global/Button";
import { Checkbox } from "../../components/global/Checkbox";
import { useTheme } from "../../store/ThemeContext";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: { category?: string; isActive?: boolean }) => void;
  categories: string[];
  onAddGroup: () => void;
  onSelectAll: (checked: boolean) => void;
  groups: any[]; // Simplified for brevity; use Group[] from types/group if needed
}

export const SearchFilter = ({ onSearch, onFilter, categories, onAddGroup, onSelectAll, groups }: SearchFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);
  const { isDarkMode } = useTheme();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (field: "category" | "isActive", value: string | boolean | undefined) => {
    if (field === "category") {
      setCategory(value as string);
      onFilter({
        category: value as string || undefined,
        isActive,
      });
    } else {
      setIsActive(value as boolean | undefined);
      onFilter({
        category,
        isActive: value as boolean | undefined,
      });
    }
  };

  return (
    <div className={`mb-6 ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>
      <div className="flex space-x-4 mb-4">
        <InputField placeholder="Search groups by name..." onChange={handleSearch} initialValue={searchQuery} />
        <select
          value={category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className={`p-2 rounded-md border ${isDarkMode ? "border-[#98C1D9] bg-[#2D2D2D] text-white" : "border-[#98C1D9] bg-white text-[#2D2D2D]"} focus:outline-none focus:ring-2 focus:ring-[#EE6C4D]`}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={isActive !== undefined ? isActive.toString() : ""}
          onChange={(e) => handleFilterChange("isActive", e.target.value === "" ? undefined : e.target.value === "true")}
          className={`p-2 rounded-md border ${isDarkMode ? "border-[#98C1D9] bg-[#2D2D2D] text-white" : "border-[#98C1D9] bg-white text-[#2D2D2D]"} focus:outline-none focus:ring-2 focus:ring-[#EE6C4D]`}
        >
          <option value="">All Statuses</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <Button onClick={onAddGroup}>Add Group</Button>
        <Checkbox label="Select All" onChange={onSelectAll} />
      </div>
    </div>
  );
};