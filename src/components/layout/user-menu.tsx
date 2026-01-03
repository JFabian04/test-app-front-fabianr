'use client';

import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export function UserMenu() {
  return (
    <Button variant="ghost" size="icon" className="rounded-full">
      <User className="h-5 w-5" />
      <span className="sr-only">Usuario</span>
    </Button>
  );
}
