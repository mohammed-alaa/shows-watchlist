import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
	return await bcrypt.hash(password, Number(process.env.PASSWORD_ROUNDS));
}

export async function compare(plain: string, hashed: string): Promise<boolean> {
	return await bcrypt.compare(plain, hashed);
}
