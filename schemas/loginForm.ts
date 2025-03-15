import zod from "zod";

export default zod.object({
	email: zod.string().nonempty("Email is required").email().max(255),
	password: zod.string().min(8).max(255),
});
