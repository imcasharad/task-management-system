import axios from "axios";
import { Group } from "../types/group"; // Import the updated Group type

const API_URL = import.meta.env.VITE_API_URL; // Backend URL

export const createGroup = async (name: string, categoryId?: number): Promise<Group> => {
  try {
    const response = await axios.post<Group>(`${API_URL}/groups`, {
      name,
      categoryId, // Use categoryId instead of category
      isActive: true, // Default to true, adjust based on your backend
    });
    return response.data;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};

export const getGroups = async (): Promise<Group[]> => {
  try {
    const response = await axios.get<Group[]>(`${API_URL}/groups`);
    // Ensure virtual properties are included in the response
    return response.data.map(group => ({
      ...group,
      category: group.category || "No Category",
      categoryType: group.categoryType || "No Type",
      isMandatory: group.isMandatory || false,
    }));
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw new Error("Failed to fetch groups. Please check the API endpoint or network connection.");
  }
};

// New: Update a group
export const updateGroup = async (id: number, name: string, categoryId?: number): Promise<Group> => {
  try {
    const response = await axios.put<Group>(`${API_URL}/groups/${id}`, {
      name,
      categoryId, // Use categoryId instead of category
      isActive: true, // Default to true, adjust based on your backend
    });
    return response.data;
  } catch (error) {
    console.error("Error updating group:", error);
    throw error;
  }
};

// New: Delete groups
export const deleteGroups = async (ids: number[]) => {
  await axios.delete(`${API_URL}/groups`, { data: { ids } });
};