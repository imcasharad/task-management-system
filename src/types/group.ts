// src/types/group.ts
export interface Group {
  id: number;
  name: string;
  categoryId?: number; // Foreign key to CategoryItem.id, replacing category
  isActive?: boolean; // Optional, for future use
  category?: string; // Virtual property for category name (e.g., "Family")
  categoryType?: string; // Virtual property for category type (e.g., "Group")
  isMandatory?: boolean; // Virtual property for mandatory status
}

export interface GroupFormProps {
  setGroups: (groups: Group[]) => void;
}