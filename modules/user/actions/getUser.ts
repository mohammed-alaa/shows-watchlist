import { eq } from "drizzle-orm";
import User from "../dtos/user";

export async function getById(id: number) {
	const drizzle = useDrizzle();

	const existingUser = await drizzle
		.select()
		.from(usersTable)
		.where(eq(usersTable.id, id));

	if (existingUser.length === 0) {
		return null;
	}

	return User.fromDb(existingUser[0]);
}

export async function getByEmail(email: string) {
	const drizzle = useDrizzle();

	const existingUser = await drizzle
		.select()
		.from(usersTable)
		.where(eq(usersTable.email, email));

	if (existingUser.length === 0) {
		return null;
	}

	return User.fromDb(existingUser[0]);
}
