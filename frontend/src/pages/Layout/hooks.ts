import type { User } from '@/types/User';
import { useOutletContext } from 'react-router-dom';

export function useCurrentUser() {
  const { currentUser } = useOutletContext<{ currentUser: User | null }>();
  return currentUser;
}