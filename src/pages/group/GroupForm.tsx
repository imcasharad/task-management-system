import { FormEvent, useState } from "react";
import { createGroup } from "../../services/api";
import { InputField } from "../../components/global/InputField";
import { Button } from "../../components/global/Button";
import { useTheme } from "../../store/ThemeContext";
import { Group, GroupFormProps } from "../../types/group"; // Import both Group and GroupFormProps

export const GroupForm = ({ setGroups }: GroupFormProps) => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const { isDarkMode } = useTheme();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newGroup = await createGroup(name, category || undefined);
      setGroups((prev: Group[]) => [...prev, newGroup]); // Ensure newGroup is typed as Group
      setName("");
      setCategory("");
    } catch (error: any) {
      console.error("Error adding group:", error.response || error);
      alert(error.response?.data?.message || "Error adding group");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`mb-6 ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>
      <div className={`flex space-x-4 mb-4 ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>
        <InputField placeholder="Group Name" onChange={(value) => setName(value)} />
        <InputField placeholder="Category (optional)" onChange={(value) => setCategory(value)} />
        <Button onClick={handleSubmit}>Add Group</Button>
      </div>
    </form>
  );
};