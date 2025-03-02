import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/global/Modal";
import { FormCard } from "../../components/global/FormCard";
import { InputField } from "../../components/global/InputField";
import { Button } from "../../components/global/Button";
import { Card } from "../../components/global/Card";
import { getAllCategoryTypes, createCategoryType, updateCategoryType, deleteCategoryType } from "../../services/categoryApi";
import { useTheme } from "../../store/ThemeContext";
import { CategoryType } from "../../types/category";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";

export const ManageCategoryTypes = () => {
  const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]);
  const [showTypeForm, setShowTypeForm] = useState<{ type: "add" | "edit"; categoryType?: CategoryType } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategoryTypes();
  }, []);

  const fetchCategoryTypes = async () => {
    try {
      const types = await getAllCategoryTypes();
      setCategoryTypes(types);
      setError(null);
    } catch (err) {
      setError(err.message || "An error occurred while fetching category types");
    }
  };

  const handleCreateOrUpdateType = async (name: string) => {
    try {
      if (showTypeForm?.type === "add") {
        const newType = await createCategoryType(name, false); // Default isMandatory to false
        setCategoryTypes([...categoryTypes, newType]);
      } else if (showTypeForm?.type === "edit" && showTypeForm.categoryType) {
        const updatedType = await updateCategoryType(showTypeForm.categoryType.id, name, showTypeForm.categoryType.isMandatory);
        setCategoryTypes(categoryTypes.map(t => t.id === updatedType.id ? updatedType : t));
      }
      setShowTypeForm(null);
    } catch (error) {
      setError(error.message || "Error saving category type");
    }
  };

  const handleDeleteType = async (id: number) => {
    try {
      await deleteCategoryType(id);
      setCategoryTypes(categoryTypes.filter(t => t.id !== id));
    } catch (error) {
      setError(error.message || "Error deleting category type");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark:bg-[#2D2D2D] dark:text-[#98C1D9]" : "bg-white text-[#2D2D2D]"}`}>
      <Header onSearch={() => {}}/>
      <main className={`flex-1 p-4 md:p-6 ${isDarkMode ? "dark:bg-[#2D2D2D] dark:text-[#98C1D9]" : "bg-white text-[#2D2D2D]"}`}>
    <div className={`space-y-4 ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>
      {error && <p className={`text-red-500 ${isDarkMode ? "dark:text-red-400" : ""}`}>{error}</p>}
      <h4 className={`text-lg font-bold mb-4 ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>Manage Category Types</h4>
      {categoryTypes.map((type) => (
        <Card key={type.id} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className={`text-base font-medium ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>{type.name}</h5>
            </div>
            <div className="space-x-2">
              <Button onClick={() => setShowTypeForm({ type: "edit", categoryType: type })}>Edit</Button>
              <Button onClick={() => handleDeleteType(type.id)} className="bg-red-500 hover:bg-red-600">Delete</Button>
            </div>
          </div>
        </Card>
      ))}
      <Button onClick={() => setShowTypeForm({ type: "add" })}>Add Category Type</Button>
      </div>
      </main>
      <Footer />
      {showTypeForm && (
        <Modal
          isOpen={!!showTypeForm}
          onClose={() => setShowTypeForm(null)}
          title={showTypeForm.type === "add" ? "Add Category Type" : "Edit Category Type"}
        >
          <FormCard
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              handleCreateOrUpdateType(
                formData.get("name") as string
              );
            }}
          >
            <div className={`space-y-4 ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>
              <InputField
                placeholder="Category Type Name"
                initialValue={showTypeForm.categoryType?.name || ""}
                name="name"
                required
              />
              <div className="mt-4 flex justify-end space-x-2">
                <Button onClick={() => setShowTypeForm(null)}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </div>
          </FormCard>
        </Modal>
      )}
    </div>
  );
};