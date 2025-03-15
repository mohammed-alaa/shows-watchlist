import type { ZodError, ZodSchema } from "zod";

function parseZodErrors(errors: ZodError) {
	const _errors: Record<string, any> = {};

	Object.entries(errors.flatten().fieldErrors).forEach(([key, value]) => {
		_errors[key] = value?.[0];
	});

	return _errors;
}

export async function validateScehma<TData>(
	schema: ZodSchema,
	data: TData,
): Promise<TData | null> {
	try {
		await schema.parseAsync(data);
		return null;
	} catch (error) {
		return parseZodErrors(error as ZodError) as TData;
	}
}
