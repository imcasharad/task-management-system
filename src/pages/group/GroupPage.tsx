import { useEffect, useState } from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { Modal } from "../../components/global/Modal";
import { FormCard } from "../../components/global/FormCard";
import { InputField } from "../../components/global/InputField";
import { Button } from "../../components/global/Button";
import {SearchFilter} from "./SearchFilter";
import {GroupList} from "./GroupList";
import {SelectedActions} from "./SelectedActions";
import { getGroups, createGroup, updateGroup, getAllCategoryTypes, getAllCategoryItemsByType} from "../../services";
import { useTheme } from "../../store/ThemeContext";
import { Group } from "../../types/group";

const GroupPage = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showForm, setShowForm] = useState<{ type: "add" | "edit"; group?: Group } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [categoryItems, setCategoryItems] = useState<any[]>([]);
  const [groupType, setGroupType] = useState<CategoryType | null>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchGroups();
    fetchGroupCategoryItems();
    fetchGroupCategoryType();
  }, []);

  const fetchGroups = async (query?: string, filter?: { category?: string; isActive?: boolean }) => {
    try {
      console.log("Fetching groups...");
      const data = await getGroups();
      console.log("Groups fetched:", data);
      let filtered: Group[] = data;
      if (query) {
        filtered = filtered.filter((g: Group) =>
          g.name.toLowerCase().includes(query.toLowerCase())
        );
      }
      if (filter?.category) {
        filtered = filtered.filter((g: Group) => g.category?.toLowerCase() === filter.category.toLowerCase());
      }
      if (filter?.isActive !== undefined) {
        filtered = filtered.filter((g: Group) => g.isActive === filter.isActive);
      }
      setGroups(filtered);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching groups:", err);
      setError(err.message || "An error occurred while fetching groups");
    }
  };


  const fetchGroupCategoryItems = async () => {
    try {
      if (groupType) {
        const items = await getAllCategoryItemsByType(groupType.id);
        setCategoryItems(items);
      }
    } catch (err) {
      console.error("Error fetching group category items:", err);
      setError(err.message || "An error occurred while fetching category items");
    }
  };

  const fetchGroupCategoryType = async () => {
    try {
      const types = await getAllCategoryTypes();
      const group = types.find(t => t.name === "Group");
      setGroupType(group || null);
      if (group) {
        await fetchGroupCategoryItems(); // Fetch items once groupType is available
      }
    } catch (err) {
      console.error("Error fetching group category type:", err);
      setError(err.message || "An error occurred while fetching group category type");
    }
  };

  const handleActionComplete = () => {
    setSelectedIds([]);
    fetchGroups();
  };

  const handleSearch = (query: string) => {
    fetchGroups(query);
  };

  const handleFilter = (filters: { category?: string; isActive?: boolean }) => {
    fetchGroups("", filters);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(groups.map((g) => g.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleAddGroup = () => {
    setShowForm({ type: "add" });
  };

  const handleEditGroup = (group: Group) => {
    setShowForm({ type: "edit", group });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString() || "";
    const categoryId = formData.get("categoryId") ? parseInt(formData.get("categoryId") as string) : undefined;
  
    if (!name.trim()) {
      alert("Group Name is required.");
      return;
    }
  
    // Check if category is mandatory for Group type
    if (!groupType) {
      alert("Group category type not found!");
      return;
    }

    if (groupType.isMandatory && !categoryId) {
      alert("Category is required for Groups because the Group category type is mandatory!");
      return;
    }

    if (categoryId) {
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

    try {
      console.log("Submitting form:", { name, categoryId, showForm });
      if (showForm?.type === "add") {
        const newGroup = await createGroup(name, categoryId);
        setGroups([...groups, newGroup]);
      } else if (showForm?.type === "edit" && showForm.group) {
        const updatedGroup = await updateGroup(showForm.group.id, name, categoryId, showForm.group.isActive);
        setGroups(groups.map(g => g.id === updatedGroup.id ? updatedGroup : g));
      }
      setShowForm(null);
    } catch (error: any) {
      console.error("Error saving group:", error.response || error);
      alert(error.response?.data?.message || "Error saving group. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark:bg-[#2D2D2D] dark:text-[#98C1D9]" : "bg-white text-[#2D2D2D]"}`}>
      <Header onSearch={() => {}}/>
      <main className={`flex-1 p-4 md:p-6 ${isDarkMode ? "dark:bg-[#2D2D2D] dark:text-[#98C1D9]" : "bg-white text-[#2D2D2D]"}`}>
        {error ? (
          <p className={`text-red-500 ${isDarkMode ? "dark:text-red-400" : ""}`}>{error}</p>
        ) : (
          <>
            <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>Group Management</h3>
            <SearchFilter
              onSearch={handleSearch}
              onFilter={handleFilter}
              categories={Array.from(new Set(categoryItems.map((item: any) => item.name || "No Category")))}
              onAddGroup={handleAddGroup}
              onSelectAll={handleSelectAll}
              groups={groups}
            />
            <GroupList
              groups={groups}
              onSelectionChange={setSelectedIds}
              onEdit={handleEditGroup}
              selectedIds={selectedIds}
            />
            <SelectedActions selectedIds={selectedIds} onActionComplete={handleActionComplete} />
          </>
        )}
      </main>
      <Footer />
      {showForm && (
        <Modal
          isOpen={!!showForm}
          onClose={() => setShowForm(null)}
          title={showForm.type === "add" ? "Add Group" : "Edit Group"}
        >
          <FormCard
            onSubmit={handleFormSubmit}
          >
            <div className={`space-y-4 ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>
              <InputField
                placeholder="Group Name"
                initialValue={showForm.group?.name || ""}
                name="name"
                required
                onChange={(value) => console.log("Group Name changed:", value)}
              />
              <select
                name="categoryId"
                className={`w-full p-2 rounded-md border ${isDarkMode ? "dark:border-[#98C1D9] dark:bg-[#2D2D2D] dark:text-white" : "border-[#98C1D9] bg-white text-[#2D2D2D]"} focus:outline-none focus:ring-2 focus:ring-gray-500 ${isDarkMode ? "dark:focus:ring-offset-[#2D2D2D]" : "focus:ring-offset-white"}`}
                defaultValue={showForm.group?.categoryId || ""}
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
              <div className="mt-4 flex justify-end space-x-2">
                <Button onClick={() => setShowForm(null)}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </div>
          </FormCard>
        </Modal>
      )}
          </div>
        );
      };

export default GroupPage;