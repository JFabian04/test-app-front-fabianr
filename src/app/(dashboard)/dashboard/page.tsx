'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Download, ArrowRight, Zap, Shield, Smartphone } from 'lucide-react';
import { useUsers } from '@/features/users/hooks/use-users';
import { usersApi } from '@/features/users/api/users-api';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

export default function DashboardPage() {
  const { users = [] } = useUsers();
  const router = useRouter();
  const { toast } = useToast();

  const handleExportCSV = async () => {
    try {
      const blob = await usersApi.export();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `usuarios_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast({
        title: 'Éxito',
        description: 'Datos exportados correctamente',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.message || 'Error al exportar datos',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="text-4xl">Bienvenido al Panel</CardTitle>
              <p className="text-blue-100 max-w-md">Gestiona tus usuarios de forma eficiente con nuestra plataforma moderna e intuitiva</p>
            </div>
            <Button onClick={handleExportCSV} className="gap-2 bg-white text-blue-600 hover:bg-blue-50 shadow-lg">
              <Download className="h-4 w-4" />
              Descargar Datos
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="group border bg-gradient-to-br from-blue-50 to-blue-100 transition-all hover:shadow-lg">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">Total de Usuarios</p>
                <div className="rounded-lg bg-blue-500/10 p-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-blue-900">{users.length}</div>
                <p className="text-xs text-gray-600 font-medium">En tu base de datos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group border bg-gradient-to-br from-purple-50 to-purple-100 transition-all hover:shadow-lg">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">Gestión Rápida</p>
                <div className="rounded-lg bg-purple-500/10 p-3">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-xs text-gray-600 font-medium">Crea, edita y elimina usuarios al instante</p>
              <button className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1 pt-2">
                Explorar <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="group border bg-gradient-to-br from-green-50 to-green-100 transition-all hover:shadow-lg">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">Seguridad</p>
                <div className="rounded-lg bg-green-500/10 p-3">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-gray-600 font-medium">Tus datos están protegidos con encriptación</p>
              <button className="text-xs font-semibold text-green-600 hover:text-green-700 flex items-center gap-1 pt-2">
                Más info <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Características Principales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-all">
              <div className="rounded-lg bg-blue-100 p-3 h-fit">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Gestión de Usuarios</h3>
                <p className="text-sm text-gray-600">Administra usuarios con interfaz intuitiva</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-all">
              <div className="rounded-lg bg-purple-100 p-3 h-fit">
                <Download className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Exportación CSV</h3>
                <p className="text-sm text-gray-600">Descarga tus datos en formato CSV</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-all">
              <div className="rounded-lg bg-green-100 p-3 h-fit">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Seguridad Avanzada</h3>
                <p className="text-sm text-gray-600">Protección de datos con encriptación</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-all">
              <div className="rounded-lg bg-orange-100 p-3 h-fit">
                <Smartphone className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Responsive</h3>
                <p className="text-sm text-gray-600">Accede desde cualquier dispositivo</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">¿Listo para empezar?</h3>
              <p className="text-gray-300">Dirige a la sección de usuarios para comenzar</p>
            </div>
            <Button onClick={() => router.push('/dashboard/users')} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              Ir a Usuarios <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
