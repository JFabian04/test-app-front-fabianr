import { apiClient } from '@/lib/api-client';
import type { User, CreateUserData, UpdateUserData, UserPaged } from '../validators/user-validator';

export const usersApi = {
  getAll: async (page = 1, limit = 10, search?: string): Promise<UserPaged> => {
    const { data } = await apiClient.get<UserPaged>('/users', {
      params: { page, limit, ...(search && { search }) }
    });
    return data;
  },

  getById: async (id: string): Promise<User> => {
    const response = await apiClient.get<{ success: boolean; data: User }>(`/users/${id}`);
    return response.data.data;
  },

  create: async (userData: CreateUserData): Promise<User> => {
    try {
      const response = await apiClient.post<{ success: boolean; data: User }>('/users', userData);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error?.message || 'Error al crear usuario');
    }
  },

  update: async (id: string, userData: UpdateUserData): Promise<User> => {
    try {
      const response = await apiClient.put<{ success: boolean; data: User }>(`/users/${id}`, userData);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error?.message || 'Error al actualizar usuario');
    }
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },

  export: async (): Promise<Blob> => {
    const response = await apiClient.get('/users/export', {
      responseType: 'blob',
    });
    return response.data;
  },
};
