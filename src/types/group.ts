// src/types/group.ts
export interface Group {
    id: number;
    name: string;
    category?: string; // Optional, as in your form
    isActive?: boolean; // Optional, for future use
    // Add other fields as needed (e.g., from your API response)
  }
  
  export interface GroupFormProps {
    setGroups: (groups: Group[]) => void;
  }