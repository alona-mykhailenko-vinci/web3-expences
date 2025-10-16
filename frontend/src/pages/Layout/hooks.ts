import type { User } from '@/types/User';
import { useOutletContext } from 'react-router-dom';

export function useCurrentUser(): User | null {
  try {
    const context = useOutletContext<{ currentUser: User | null }>();
    return context.currentUser;
  } catch (error) {
    // If we're not within an outlet context, return null
    console.warn('useCurrentUser called outside of outlet context');
    return null;
  }
}