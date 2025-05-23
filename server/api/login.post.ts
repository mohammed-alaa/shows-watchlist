import { validateScehma } from "@utils/schemaValidator";
import { getByEmail } from "@modules/user/actions/getUser";
import loginFormSchema from "@schemas/loginForm";
import createSession from "@modules/session/actions/createSession";

export default defineEventHandler(
	async (event): Promise<TLoginResponsePayload> => {
		const payload = await readBody<TRegisterPayload>(event);

		try {
			await validateScehma(loginFormSchema, payload);
		} catch (result: any) {
			setResponseStatus(event, 422);

			return {
				errors: result,
			};
		}

		try {
			const existingUser = await getByEmail(payload.email);

			if (
				!(await comparePasswords(
					payload.password,
					existingUser.password,
				))
			) {
				setResponseStatus(event, 400);

				return {
					errors: {
						email: "Invalid credentials!",
					},
				};
			}

			const authToken = await createSession(existingUser.getId()!);
			await setUserSessionData(event, { authToken });

			return { user: existingUser.withoutPassword() };
		} catch (error: any) {
			setResponseStatus(event, 400);

			return {
				errors: {
					email: "Invalid credentials!",
				},
			};
		}
	},
);
