import ApiClient from "@/lib/api";
import type { User } from "@/types/User";

export interface LoaderData {
    users: User[];
    currentUser: User | null;
}

export async function loader() {
    const users = await ApiClient.getUsers();
    // For now, assume the first user is the current user
    // In a real app, this would come from authentication
    const currentUser = users.length > 0 ? users[0] : null;
    return { users, currentUser };
}