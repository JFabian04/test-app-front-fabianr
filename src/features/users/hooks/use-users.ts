import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../api/users-api';
import type { CreateUserData, UpdateUserData } from '../validators/user-validator';
import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';

export function useUsers(initialPage = 1, initialLimit = 10, initialSearch?: string) {
  const [page, setPage] = useState(initialPage)
  const [limit, setLimit] = useState(initialLimit)
  const [search, setSearch] = useState(initialSearch)

  const query = useQuery({
    queryKey: ['users', page, limit, search],
    queryFn: async () => {
      const response = await usersApi.getAll(page, limit, search)
      return response
    }
  })
  return {
    users: query.data?.data ?? [],
    pagination: query.data?.pagination,
    isLoading: query.isLoading,
    error: query.error,
    goToPage: setPage,
    changeLimit: setLimit,
    setSearch: setSearch
  }
}

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => usersApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: CreateUserData) => usersApi.create(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'Usuario Creado',
        description: 'El usuario fue creado correctamente.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description:  error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserData }) =>
      usersApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users', variables.id] });
      toast({
        title: 'Usuario actualizado',
        description: 'El usuario fue actualizado correctamente',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'Usuario eliminado',
        description: 'El usuario fue eliminado correctamente',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el usuario',
        variant: 'destructive',
      });
    },
  });
};
