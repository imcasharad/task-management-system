import { useState, useEffect } from "react";
import { Card } from "../../components/global/Card";
import { Button } from "../../components/global/Button";
import { useTheme } from "../../store/ThemeContext";
import { Group } from "../../types/group";

interface GroupListProps {
  groups: Group[];
  onSelectionChange: (selectedIds: number[]) => void;
  onEdit: (group: Group) => void;
  selectedIds: number[];
}

export const GroupList = ({ groups, onSelectionChange, onEdit, selectedIds }: GroupListProps) => {
  const [localSelectedIds, setLocalSelectedIds] = useState<number[]>(selectedIds);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    setLocalSelectedIds(selectedIds);
  }, [selectedIds]);

  const handleCheckboxChange = (id: number, checked: boolean) => {
    const newSelectedIds = checked
      ? [...localSelectedIds, id]
      : localSelectedIds.filter((selectedId) => selectedId !== id);
    setLocalSelectedIds(newSelectedIds);
    onSelectionChange(newSelectedIds);
  };

  return (
    <div className={`mb-6 ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"} w-full`}> {/* Ensure full width */}
      <div className="grid grid-cols-1 gap-4 w-full"> {/* Ensure full width */}
        {groups.map((group) => (
          <Card key={group.id} className="w-full p-4"> {/* Ensure Card takes full width */}
            <div className="flex items-center justify-between">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localSelectedIds.includes(group.id)}
                    onChange={(e) => handleCheckboxChange(group.id, e.target.checked)}
                    className={`w-4 h-4 ${isDarkMode ? "dark:bg-[#2D2D2D] dark:border-[#98C1D9] dark:checked:bg-[#EE6C4D]" : "bg-white border-[#98C1D9] checked:bg-[#EE6C4D]"} focus:outline-none focus:ring-2 focus:ring-[#EE6C4D] rounded`}
                  />
                  <span className="text-base font-medium">{group.name}</span>
                </label>
                <div className="ml-6 text-sm text-gray-500">
                  {`Group ID: ${group.id} | Group Category: ${group.category || "No Category"} | Status: ${group.isActive ? "Active" : "Inactive"}`}
                </div>
              </div>
              <Button onClick={() => onEdit(group)} className="p-1">
                <span className="text-yellow-500">Edit</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};