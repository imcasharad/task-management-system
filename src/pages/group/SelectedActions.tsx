import { useState } from "react";
import { Button } from "../../components/global/Button"; // Import Button
import { useTheme } from "../../store/ThemeContext";
import { deleteGroups } from "../../services/groupApi";

interface SelectedActionsProps {
  selectedIds: number[];
  onActionComplete: () => void;
}

export const SelectedActions = ({ selectedIds, onActionComplete }: SelectedActionsProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { isDarkMode } = useTheme();

  const handleDelete = async () => {
    if (!selectedIds.length) return;
    setIsDeleting(true);
    try {
      await deleteGroups(selectedIds);
      onActionComplete();
    } catch (error: any) {
      alert("Error deleting groups: " + (error.response?.data?.message || "Unknown error"));
    } finally {
      setIsDeleting(false);
    }
  };

  if (!selectedIds.length) return null;

  return (
    <div className={`mb-6 ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>
      <p>Selected Groups ({selectedIds.length})</p>
      <Button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete Selected"}
      </Button> 
    </div>
  );
};
