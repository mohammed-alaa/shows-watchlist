import zod from "zod";

export default zod
	.object({
		name: zod.string().nonempty("Name is required").max(50),
		email: zod.string().nonempty("Email is required").email().max(255),
		password: zod.string().min(8).max(255),
		confirmPassword: zod.string().nonempty("Confirm your password"),
	})
	.refine((check) => check.password === check.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
