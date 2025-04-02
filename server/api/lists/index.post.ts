import { validateScehma } from "@utils/schemaValidator";
import createListSchema from "@schemas/createListSchema";
import sessionTokenValidation from "@services/session-token-validation";
import { createList } from "@modules/lists/actions/createList";

export default defineEventHandler(async (event) => {
	try {
		// Validate session, get user
		const user = await sessionTokenValidation(event);
		const payload = await readBody<TCreateListPayload>(event);

		// Validate body
		try {
			await validateScehma(createListSchema, payload);
		} catch (result: any) {
			setResponseStatus(event, 422);

			return {
				errors: result,
			};
		}

		// Create list
		try {
			return await createList(payload.name, user.id!);
		} catch (error: any) {
			setResponseStatus(event, 422);

			return {
				errors: {
					name: "List creation failed!",
				},
			};
		}
	} catch (error: any) {}
});
