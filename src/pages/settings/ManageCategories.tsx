import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { Modal } from "../../components/global/Modal";
import { FormCard } from "../../components/global/FormCard";
import { InputField } from "../../components/global/InputField";
import { Button } from "../../components/global/Button";
import { ExpandableCard } from "../../components/global/ExpandableCard";
import { getAllCategoryTypes, getAllCategoryItemsByType, createCategoryItem, updateCategoryItem, deleteCategoryItem, updateCategoryType } from "../../services";
import { useTheme } from "../../store/ThemeContext";
import { CategoryType, CategoryItem } from "../../types/category";


export const ManageCategories = () => {
  const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]);
  const [categoryItems, setCategoryItems] = useState<Record<number, CategoryItem[]>>({});
  const [error, setError] = useState<string | null>(null);
  const [expandedTypeId, setExpandedTypeId] = useState<number | null>(null);
  const [showItemForm, setShowItemForm] = useState<{ type: "add" | "edit"; categoryItem?: CategoryItem; categoryTypeId?: number } | null>(null);
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
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching category types");
    }
  };

  const fetchCategoryItems = async (typeId: number) => {
    try {
      const items = await getAllCategoryItemsByType(typeId);
      setCategoryItems(prev => ({ ...prev, [typeId]: items }));
      setError(null);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching category items");
    }
  };

  const handleToggleMandatory = async (typeId: number, isMandatory: boolean) => {
    try {
      const type = categoryTypes.find(t => t.id === typeId);
      if (type) {
        const updatedType = await updateCategoryType(typeId, type.name, isMandatory);
        setCategoryTypes(categoryTypes.map(t => t.id === updatedType.id ? updatedType : t));
      }
    } catch (error: any) {
      setError(error.message || "Error updating mandatory status");
    }
  };

  const handleCreateOrUpdateItem = async (categoryTypeId: number, name: string, description?: string) => {
    try {
      console.log("Updating item:", { id: showItemForm?.categoryItem?.id, name, description, categoryTypeId });
      if (showItemForm?.type === "add") {
        const newItem = await createCategoryItem(categoryTypeId, name, description);
        setCategoryItems(prev => ({
          ...prev,
          [categoryTypeId]: [...(prev[categoryTypeId] || []), newItem],
        }));
      } else if (showItemForm?.type === "edit" && showItemForm.categoryItem) {
        const updatedItem = await updateCategoryItem(showItemForm.categoryItem.id, name, description);
        setCategoryItems(prev => ({
          ...prev,
          [categoryTypeId]: (prev[categoryTypeId] || []).map(i => i.id === updatedItem.id ? updatedItem : i),
        }));
      }
      setShowItemForm(null);
    } catch (error: any) {
      setError(error.message || "Error saving category item");
    }
  };

  const handleDeleteItem = async (categoryTypeId: number, itemId: number) => {
    try {
      await deleteCategoryItem(itemId);
      setCategoryItems(prev => ({
        ...prev,
        [categoryTypeId]: (prev[categoryTypeId] || []).filter(i => i.id !== itemId),
      }));
    } catch (error: any) {
      setError(error.message || "Error deleting category item");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark:bg-[#2D2D2D] dark:text-[#98C1D9]" : "bg-white text-[#2D2D2D]"}`}>
      <Header onSearch={() => {}} />
      <main className={`flex-1 p-4 md:p-6 ${isDarkMode ? "dark:bg-[#2D2D2D] dark:text-[#98C1D9]" : "bg-white text-[#2D2D2D]"}`}>
        {error && <p className={`text-red-500 ${isDarkMode ? "dark:text-red-400" : ""}`}>{error}</p>}
        <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>Manage Categories</h3>
        <div className="space-y-4">
          {categoryTypes.map((type) => (
            <ExpandableCard
              key={type.id}
              title={type.name}
              isMandatory={type.isMandatory}
              onToggleMandatory={(isMandatory) => handleToggleMandatory(type.id, isMandatory)}
              onExpand={() => {
                setExpandedTypeId(expandedTypeId === type.id ? null : type.id);
                if (expandedTypeId !== type.id) fetchCategoryItems(type.id);
              }}
              isExpanded={expandedTypeId === type.id}
            >
              {expandedTypeId === type.id && (
                <div className="mt-4 space-y-4">
                  <h5 className={`text-base font-medium ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>Category Items</h5>
                  {(categoryItems[type.id] || []).length > 0 ? (
                    categoryItems[type.id].map((item) => (
                      <div key={item.id} className="p-4 bg-gray-100 rounded-md dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-base ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>{item.name}</p>
                            {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                          </div>
                          <div className="space-x-2">
                            <Button onClick={() => setShowItemForm({ type: "edit", categoryItem: item, categoryTypeId: type.id })}>Edit</Button>
                            <Button onClick={() => handleDeleteItem(type.id, item.id)} className="bg-red-500 hover:bg-red-600">Delete</Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No items available for this category type.</p>
                  )}
                  <Button onClick={() => setShowItemForm({ type: "add", categoryTypeId: type.id })}>Add Category Item</Button>
                </div>
              )}
            </ExpandableCard>
          ))}
        </div>
      </main>
      <Footer />

      {showItemForm && (
        <Modal
          isOpen={!!showItemForm}
          onClose={() => setShowItemForm(null)}
          title={showItemForm.type === "add" ? "Add Category Item" : "Edit Category Item"}
        >
          <FormCard
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              handleCreateOrUpdateItem(
                showItemForm.categoryTypeId!,
                formData.get("name") as string,
                formData.get("description") as string
              );
            }}
          >
            <div className={`space-y-4 ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>
              <InputField
                placeholder="Category Item Name"
                initialValue={showItemForm.categoryItem?.name || ""}
                name="name"
                required
              />
              <InputField
                placeholder="Description (optional)"
                initialValue={showItemForm.categoryItem?.description || ""}
                name="description"
              />
              <div className="mt-4 flex justify-end space-x-2">
                <Button onClick={() => setShowItemForm(null)}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </div>
          </FormCard>
        </Modal>
      )}
    </div>
  );
};