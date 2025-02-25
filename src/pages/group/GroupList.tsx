import { useState, useEffect } from "react"; // Added useEffect
import { Card } from "../../components/global/Card";
import { Button } from "../../components/global/Button";
import { useTheme } from "../../store/ThemeContext";
import { Group } from "../../types/group";

interface GroupListProps {
  groups: Group[];
  onSelectionChange: (selectedIds: number[]) => void;
  onEdit: (group: Group) => void;
  selectedIds: number[]; // Add selectedIds as a prop to sync with GroupPage
}

export const GroupList = ({ groups, onSelectionChange, onEdit, selectedIds }: GroupListProps) => {
  const [localSelectedIds, setLocalSelectedIds] = useState<number[]>(selectedIds); // Local state for real-time updates
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Sync localSelectedIds with selectedIds prop when it changes (e.g., from "Select All")
    setLocalSelectedIds(selectedIds);
  }, [selectedIds]); // Re-sync when selectedIds changes from parent

  const handleCheckboxChange = (id: number, checked: boolean) => {
    const newSelectedIds = checked
      ? [...localSelectedIds, id]
      : localSelectedIds.filter((selectedId) => selectedId !== id);
    setLocalSelectedIds(newSelectedIds); // Update local state
    onSelectionChange(newSelectedIds); // Notify parent immediately
  };

  return (
    <div className={`mb-6 ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <Card key={group.id}>
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localSelectedIds.includes(group.id)} // Use localSelectedIds for real-time UI
                  onChange={(e) => handleCheckboxChange(group.id, e.target.checked)}
                  className={`w-4 h-4 ${isDarkMode ? "dark:bg-[#2D2D2D] dark:border-[#98C1D9] dark:checked:bg-[#EE6C4D]" : "bg-white border-[#98C1D9] checked:bg-[#EE6C4D]"} focus:outline-none focus:ring-2 focus:ring-[#EE6C4D] rounded`}
                />
                <span>{`ID: ${group.id} - ${group.name} (${group.category || "No Category"})`}</span>
              </label>
              <Button onClick={() => onEdit(group)} className="p-1">
                <span className="text-yellow-500">Edit</span>
              </Button>
            </div>
            <p className={`text-sm ${isDarkMode ? "dark:text-[#98C1D9]" : "text-gray-500"}`}>Status: {group.isActive ? "Active" : "Inactive"}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};