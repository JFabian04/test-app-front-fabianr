'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateUser, useUpdateUser, useUser } from '../hooks/use-users';
import { createUserSchema, updateUserSchema, type CreateUserData, type UpdateUserData } from '../validators/user-validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoadingSpinner } from '@/components/common/loading-spinner';

interface UserFormProps {
  userId?: string;
}

export function UserForm({ userId }: UserFormProps) {
  const router = useRouter();

  const { data: user, isLoading } = useUser(userId || '');
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserData | UpdateUserData>({
    resolver: zodResolver(userId ? updateUserSchema : createUserSchema),
    defaultValues: {
      name: '',
      email: ''
    },
  });

  useEffect(() => {
    if (user && userId) {
      reset({
        name: user.name,
        email: user.email
      });
    }
  }, [user, userId, reset]);

  const onSubmit = async (data: CreateUserData | UpdateUserData) => {
    try {
      if (userId) {
        await updateMutation.mutateAsync({ id: userId, data });
      } else {
        await createMutation.mutateAsync(data as CreateUserData);
      }
      router.push('/users');
    } catch {
    }
  };

  if (userId && isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <LoadingSpinner />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{userId ? 'Editar Usuario' : 'Formulario Registro'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Nombre completo"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="correo@ejemplo.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {createMutation.isPending || updateMutation.isPending ? 'Guardando...' : userId ? 'Editar' : 'Guardar'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/users')}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
