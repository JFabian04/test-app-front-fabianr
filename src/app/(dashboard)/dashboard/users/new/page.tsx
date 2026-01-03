import { PageHeader } from '@/components/common/page-header';
import { UserForm } from '@/features/users/components/user-form';

export default function NewUserPage() {
  return (
    <>
      <PageHeader
        title="Nuevo Usuario"
        description="Realizar el registro de un nuevo usuario en el sistema"
      />
      
      <UserForm />
    </>
  );
}
