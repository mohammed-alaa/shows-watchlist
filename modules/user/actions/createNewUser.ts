import User from "../dtos/user";

export default async function (user: User): Promise<User> {
	const drizzle = useDrizzle();

	user = user.setPassword(await hashPassword(user.password));

	const newUser = await drizzle
		.insert(usersTable)
		.values(user)
		.returning()
		.execute();

	return User.fromDb(newUser[0]);
}
