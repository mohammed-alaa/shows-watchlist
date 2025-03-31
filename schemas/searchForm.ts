import zod from "zod";

export default zod.object({
	search: zod.string().nonempty().min(3).trim(),
});
