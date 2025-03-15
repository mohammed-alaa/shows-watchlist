interface TRegisterPayload {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface TRegisterResponsePayload {
	errors: Partial<TRegisterPayload>;
}

interface TLoginPayload {
	email: string;
	password: string;
}

interface TLoginResponsePayload {
	errors: Partial<TLoginPayload>;
}
