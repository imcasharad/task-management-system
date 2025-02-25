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
import { getGroups, createGroup, updateGroup } from "../../services/api";
import { useTheme } from "../../store/ThemeContext";
import { Group } from "../../types/group";

const GroupPage = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showForm, setShowForm] = useState<{ type: "add" | "edit"; group?: Group } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async (query?: string, filter?: { category?: string; isActive?: boolean }) => {
    try {
      const data = await getGroups();
      let filtered: Group[] = data;
      if (query) {
        filtered = filtered.filter((g: Group) =>
          g.name.toLowerCase().includes(query.toLowerCase())
        );
      }
      if (filter?.category) {
        filtered = filtered.filter((g: Group) => g.category === filter.category);
      }
      if (filter?.isActive !== undefined) {
        filtered = filtered.filter((g: Group) => g.isActive === filter.isActive);
      }
      setGroups(filtered);
      setError(null);
    } catch (err) {
      console.error("Error fetching groups:", err);
      setError(err.message || "An error occurred while fetching groups");
    }
  };

  const handleActionComplete = () => {
    setSelectedIds([]);
    fetchGroups();
  };

  const handleSearch = (query: string) => {
    fetchGroups(query);
  };

  const handleGlobalSearch = (query: string) => {
    console.log("Global search for groups:", query);
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
    const name = formData.get("name")?.toString() || ""; // Ensure name is a string, default to empty string
    const category = formData.get("category")?.toString() || undefined; // Handle null/undefined for category

    if (!name.trim()) {
      alert("Group Name is required.");
      return;
    }

    try {
      if (showForm?.type === "add") {
        const newGroup = await createGroup(name, category);
        setGroups((prev: Group[]) => [...prev, newGroup]);
      } else if (showForm?.type === "edit" && showForm.group) {
        const updatedGroup = await updateGroup(showForm.group.id, name, category);
        setGroups((prev: Group[]) => prev.map((g) => (g.id === updatedGroup.id ? updatedGroup : g)));
      }
      setShowForm(null);
    } catch (error: any) {
      console.error("Error saving group:", error.response || error);
      alert(error.response?.data?.message || "Error saving group. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark:bg-[#2D2D2D] dark:text-[#98C1D9]" : "bg-white text-[#2D2D2D]"}`}>
      <Header onSearch={handleGlobalSearch} />
      <main className={`flex-1 p-4 md:p-6 ${isDarkMode ? "dark:bg-[#2D2D2D] dark:text-[#98C1D9]" : "bg-white text-[#2D2D2D]"}`}>
        {error ? (
          <p className={`text-red-500 ${isDarkMode ? "dark:text-red-400" : ""}`}>{error}</p>
        ) : (
          <>
            <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>Group Management</h3>
            <SearchFilter
              onSearch={handleSearch}
              onFilter={handleFilter}
              categories={Array.from(new Set(groups.map((g: Group) => g.category).filter((cat): cat is string => cat !== undefined))) as string[]}
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
                onChange={(value) => ( value)}
              />
              <InputField
                placeholder="Category (optional)"
                initialValue={showForm.group?.category || ""}
                name="category"
                onChange={(value) => (value)}
              />
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