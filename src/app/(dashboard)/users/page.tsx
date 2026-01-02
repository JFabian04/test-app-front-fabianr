import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/page-header';
import { UsersTable } from '@/features/users/components/users-table';
import { Plus } from 'lucide-react';

export default function UsersPage() {
  return (
    <>
      <PageHeader
        title="Users"
        description="Manage application users"
        action={
          <Link href="/users/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New User
            </Button>
          </Link>
        }
      />
      
      <UsersTable />
    </>
  );
}
