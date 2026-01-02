import { PageHeader } from '@/components/common/page-header';
import { UserForm } from '@/features/users/components/user-form';

export default function NewUserPage() {
  return (
    <>
      <PageHeader
        title="New User"
        description="Create a new user in the system"
      />
      
      <UserForm />
    </>
  );
}
