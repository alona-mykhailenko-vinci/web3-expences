import type { User } from "@/api/user/userModel";
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export class UserRepository {
	async findAllAsync(): Promise<User[]> {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				bankAccount: true,
			}
		});
		
		// Transform Prisma user to match the User model expected by the service
		return users.map(user => ({
			id: user.id,
			name: user.name,
			email: user.email,
			age: 0, // Default age since it's not in our database schema
			createdAt: new Date(),
			updatedAt: new Date(),
		}));
	}

	async findByIdAsync(id: number): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				name: true,
				email: true,
				bankAccount: true,
			}
		});
		
		if (!user) return null;
		
		// Transform Prisma user to match the User model expected by the service
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			age: 0, // Default age since it's not in our database schema
			createdAt: new Date(),
			updatedAt: new Date(),
		};
	}
}
