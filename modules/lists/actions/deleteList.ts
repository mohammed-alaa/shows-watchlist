import { eq } from "drizzle-orm";

export async function byId(listId: number) {
	const drizzle = useDrizzle();

	return await drizzle.delete(listsTable).where(eq(listsTable.id, listId));
}
