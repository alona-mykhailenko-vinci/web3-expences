import ApiClient from '../../lib/api';
import type { User } from '../../types/User';

export interface LoaderData {
  users: User[];
}

export async function loader(): Promise<LoaderData> {
  try {
    const users = await ApiClient.getUsers();
    return {
      users,
    };
  } catch (error) {
    console.error('Failed to load users:', error);
    // Return empty array on error to prevent loader from failing
    return {
      users: [],
    };
  }
}