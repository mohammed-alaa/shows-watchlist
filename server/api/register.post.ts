import User from "@modules/user/dtos/user";
import { validateScehma } from "@utils/schemaValidator";
import createNewUser from "@modules/user/actions/createNewUser";
import { getByEmail } from "@modules/user/actions/getUser";
import registerFormSchema from "@schemas/registerForm";

export default defineEventHandler(
	async (event): Promise<TRegisterResponsePayload | undefined> => {
		const payload = await readBody<TRegisterPayload>(event);

		try {
			await validateScehma(registerFormSchema, payload);
		} catch (errors: any) {
			setResponseStatus(event, 422);

			return {
				errors,
			};
		}

		try {
			await getByEmail(payload.email);
			setResponseStatus(event, 400);

			return {
				errors: {
					email: "User with this email already exists",
				},
			};
		} catch (error: any) {
			const userDto = new User(
				payload.email,
				payload.name,
				payload.password,
			);

			await createNewUser(userDto);
			setResponseStatus(event, 201);
		}
	},
);
