import { eq } from "drizzle-orm";
import User from "../dtos/user";

export async function getById(id: number): Promise<User | null> {
	const drizzle = useDrizzle();

	const existingUser = await drizzle
		.select()
		.from(usersTable)
		.where(eq(usersTable.id, id))
		.limit(1);

	if (existingUser.length === 0) {
		return Promise.resolve(null);
	}

	return Promise.resolve(User.fromDb(existingUser[0]));
}

export async function getByEmail(email: string): Promise<User | null> {
	const drizzle = useDrizzle();

	const existingUser = await drizzle
		.select()
		.from(usersTable)
		.where(eq(usersTable.email, email))
		.limit(1);

	if (existingUser.length === 0) {
		return Promise.resolve(null);
	}

	return Promise.resolve(User.fromDb(existingUser[0]));
}
