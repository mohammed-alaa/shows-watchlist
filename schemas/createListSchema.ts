import zod from "zod";

export default zod.object({
	name: zod.string().nonempty().max(255),
});
