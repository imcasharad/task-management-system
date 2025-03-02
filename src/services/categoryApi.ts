import axios from "axios";
import { CategoryType, CategoryItem } from "../types/category";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllCategoryTypes = async (): Promise<CategoryType[]> => {
  const response = await axios.get(`${API_URL}/categories/types`);
  return response.data;
};

export const getCategoryTypeById = async (id: number): Promise<CategoryType> => {
  const response = await axios.get(`${API_URL}/categories/types/${id}`);
  return response.data;
};

export const createCategoryType = async (name: string, isMandatory: boolean): Promise<CategoryType> => {
  const response = await axios.post(`${API_URL}/categories/types`, { name, isMandatory });
  return response.data;
};

export const updateCategoryType = async (id: number, name: string, isMandatory?: boolean): Promise<CategoryType> => {
  const response = await axios.put(`${API_URL}/categories/types/${id}`, { name, isMandatory });
  return response.data;
};

export const deleteCategoryType = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/categories/types/${id}`);
};

export const getAllCategoryItemsByType = async (typeId: number): Promise<CategoryItem[]> => {
  const response = await axios.get(`${API_URL}/categories/types/${typeId}/items`);
  return response.data;
};

export const createCategoryItem = async (categoryTypeId: number, name: string, description?: string): Promise<CategoryItem> => {
  const response = await axios.post(`${API_URL}/categories/items`, { categoryTypeId, name, description });
  return response.data;
};

export const updateCategoryItem = async (id: number, name: string, description?: string): Promise<CategoryItem> => {
  const response = await axios.put(`${API_URL}/categories/items/${id}`, { name, description });
  return response.data;
};

export const deleteCategoryItem = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/categories/items/${id}`);
};