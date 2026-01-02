import { apiClient } from '@/lib/api-client';
import type { User, CreateUserData, UpdateUserData } from '../types';

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const { data } = await apiClient.get<User[]>('/users');
    return data;
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await apiClient.get<User>(`/users/${id}`);
    return data;
  },

  create: async (userData: CreateUserData): Promise<User> => {
    const { data } = await apiClient.post<User>('/users', userData);
    return data;
  },

  update: async (id: string, userData: UpdateUserData): Promise<User> => {
    const { data } = await apiClient.put<User>(`/users/${id}`, userData);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};
