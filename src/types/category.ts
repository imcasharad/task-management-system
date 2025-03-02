export interface CategoryType {
    id: number;
    name: string;
    isMandatory: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface CategoryItem {
    id: number;
    name: string;
    description?: string;
    categoryType: CategoryType; // Reference to CategoryType
    createdAt: Date;
    updatedAt: Date;
  }