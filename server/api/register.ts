import User from "@modules/user/dtos/user";
import { validateScehma } from "@utils/schemaValidator";
import createNewUser from "@modules/user/actions/createNewUser";
import { getByEmail } from "@modules/user/actions/getUser";
import registerFormSchema from "@schemas/registerForm";

export default defineEventHandler(async (event) => {
	const payload = await readBody<TRegisterPayload>(event);

	const result = await validateScehma(registerFormSchema, payload);

	if (result !== null) {
		setResponseStatus(event, 422);

		return {
			errors: result,
		};
	}

	const existingUser = await getByEmail(payload.email);

	if (existingUser !== null) {
		setResponseStatus(event, 400);

		return {
			errors: {
				email: "User with this email already exists",
			},
		};
	}

	const userDto = new User(payload.email, payload.name, payload.password);
	await createNewUser(userDto);
	setResponseStatus(event, 201);
});
