'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersTable } from '@/features/users/components/users-table';
import { Plus, Search, Users } from 'lucide-react';
import { useUsers } from '@/features/users/hooks/use-users';
import { useState, useEffect } from 'react';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { users, pagination, isLoading, setSearch, goToPage } = useUsers(1, 10, debouncedSearch);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, setSearch]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl md:text-3xl">Usuarios</CardTitle>
              <p className="text-sm text-blue-100 md:text-base">Administrar registros de usuarios del sistema</p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white/20 p-2">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-blue-100">Total</p>
                  <p className="text-2xl font-bold text-white">{pagination?.total || users.length}</p>
                </div>
              </div>

              <Link href="/dashboard/users/new" className="w-full sm:w-auto">
                <Button className="w-full gap-2 bg-white text-blue-600 hover:bg-blue-50 shadow-md sm:w-auto">
                  <Plus className="h-4 w-4" />
                  Nuevo Usuario
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <UsersTable users={users} pagination={pagination} isLoading={isLoading} goToPage={goToPage} />
        </CardContent>
      </Card>
    </div>
  );
}
