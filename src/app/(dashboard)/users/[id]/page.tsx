import { PageHeader } from '@/components/common/page-header';
import { UserForm } from '@/features/users/components/user-form';

interface UserEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserEditPage({ params }: UserEditPageProps) {
  const { id } = await params;
  
  return (
    <>
      <PageHeader
        title="Edit User"
        description="Modify user information"
      />
      
      <UserForm userId={id} />
    </>
  );
}
