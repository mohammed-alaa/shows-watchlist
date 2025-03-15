import { validateScehma } from "@utils/schemaValidator";
import { getByEmail } from "@modules/user/actions/getUser";
import loginFormSchema from "@schemas/loginForm";

export default defineEventHandler(
	async (event): Promise<TLoginResponsePayload | undefined> => {
		const payload = await readBody<TRegisterPayload>(event);

		const result = await validateScehma(loginFormSchema, payload);

		if (result !== null) {
			setResponseStatus(event, 422);

			return {
				errors: result,
			};
		}

		const existingUser = await getByEmail(payload.email);

		if (existingUser === null) {
			setResponseStatus(event, 400);

			return {
				errors: {
					email: "Invalid credentials!",
				},
			};
		} else if (
			!(await comparePasswords(payload.password, existingUser.password))
		) {
			setResponseStatus(event, 400);

			return {
				errors: {
					email: "Invalid credentials!",
				},
			};
		}

		setResponseStatus(event, 200);
	},
);
