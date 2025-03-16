import { validateScehma } from "@utils/schemaValidator";
import { getByEmail } from "@modules/user/actions/getUser";
import loginFormSchema from "@schemas/loginForm";
import createSession from "@modules/session/actions/createSession";
import { AUTH } from "@constants";

export default defineEventHandler(
	async (event): Promise<TLoginResponsePayload> => {
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

		const authToken = await createSession(existingUser.getId()!);

		setCookie(event, AUTH.COOKIE_NAME, authToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			expires: new Date(Date.now() + AUTH.COOKIE_EXPIRES),
		});

		return { user: existingUser.withoutPassword() };
	},
);
