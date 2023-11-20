import { createError } from "../errorUtils/createError";

export const validateEmpty = (...values: { name: string, value: string }[]) => {
  values.forEach(({ name, value }) => {
    if (value.length === 0) {
    throw createError(`${name} should not be empty`, 422);
    }
  });
};
