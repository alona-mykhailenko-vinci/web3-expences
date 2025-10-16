import ApiClient from "@/lib/api";
import type { User } from "@/types/User";

export interface LoaderData {
    users: User[];
    currentUser: User | null;
}

export async function loader() {
    try {
        console.log('Layout loader: Starting to fetch users...');
        const users = await ApiClient.getUsers();
        console.log('Layout loader: Fetched users:', users);
        
        // For now, assume the first user is the current user
        // In a real app, this would come from authentication
        const currentUser = users.length > 0 ? users[0] : null;
        console.log('Layout loader: Current user:', currentUser);
        
        const result = { users, currentUser };
        console.log('Layout loader: Returning data:', result);
        return result;
    } catch (error) {
        console.error('Layout loader: Error occurred:', error);
        // Return safe defaults on error
        return { users: [], currentUser: null };
    }
}