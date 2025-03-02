import { FormEvent, useState, useEffect } from "react";
import { createGroup, getAllCategoryTypes, getAllCategoryItemsByType } from "../../services";
import { InputField } from "../../components/global/InputField";
import { Button } from "../../components/global/Button";
import { useTheme } from "../../store/ThemeContext";
import { Group, GroupFormProps } from "../../types/group"; 
export const GroupForm = ({ setGroups }: GroupFormProps) => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [categoryItems, setCategoryItems] = useState<any[]>([]);
  const [groupType, setGroupType] = useState<any | null>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchGroupCategoryType();  
  }, []);
  
  const fetchGroupCategoryType = async () => {
    try {
      const types = await getAllCategoryTypes();
      const group = types.find(t => t.name === "Group");
      setGroupType(group || null);
      if (group) {
        const items = await getAllCategoryItemsByType(group.id);
        setCategoryItems(items);
      }
    } catch (err) {
      console.error("Error fetching group category type or items:", err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!name.trim()) {
        alert("Group Name is required.");
        return;
      }

      if (!groupType) {
        alert("Group category type not found!");
        return;
      }

      if (groupType.isMandatory && !category) {
        alert("Category is required for Groups because the Group category type is mandatory!");
        return;
      }

      if (category) {
        const categoryId = parseInt(category);
        const selectedItem = categoryItems.find(item => item.id === categoryId);
        if (!selectedItem) {
          alert("Invalid category ID provided!");
          return;
        }
        if (selectedItem.categoryType.id !== groupType.id) {
          alert("Category must belong to the Group category type!");
          return;
        }
      }
  
      const newGroup = await createGroup(name, category ? parseInt(category) : undefined);
      setGroups((prev: Group[]) => [...prev, newGroup]);
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
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full p-2 rounded-md border ${isDarkMode ? "dark:border-[#98C1D9] dark:bg-[#2D2D2D] dark:text-white" : "border-[#98C1D9] bg-white text-[#2D2D2D]"} focus:outline-none focus:ring-2 focus:ring-gray-500 ${isDarkMode ? "dark:focus:ring-offset-[#2D2D2D]" : "focus:ring-offset-white"}`}
          >
            <option value="">No Category</option>
            {categoryItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {groupType?.isMandatory && (
            <span className={`absolute top-1/2 right-2 transform -translate-y-1/2 text-red-500`}>*</span>
          )}
        </div>
        <Button type="submit">Add Group</Button>
      </div>
    </form>
  );
};