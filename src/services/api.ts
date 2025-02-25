import axios from "axios";
import { Group } from "../types/group"; // Import the Group type

const API_URL = "http://localhost:5000/api"; // Backend URL

export const createGroup = async (name: string, category?: string): Promise<Group> => {
  try {
    const response = await axios.post<Group>(`${API_URL}/groups`, {
      name,
      category,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGroups = async (): Promise<Group[]> => {
  try {
    const response = await axios.get<Group[]>(`${API_URL}/groups`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// New: Update a group
export const updateGroup = async (id: number, name: string, category?: string, isActive?: boolean) => {
    const response = await axios.put(`${API_URL}/groups/${id}`, { name, category, isActive });
    return response.data;
  };
  
  // New: Delete groups
  export const deleteGroups = async (ids: number[]) => {
    await axios.delete(`${API_URL}/groups`, { data: { ids } });
  };