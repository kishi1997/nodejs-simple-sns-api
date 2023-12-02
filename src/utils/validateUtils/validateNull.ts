import { createError } from "../errorUtils/createError";

export const validateNull = (...values: { name: string, value: string | number }[]) => {
    values.forEach(({ name, value }) => {
      if (value == null) {
        throw createError(`${name} should not be null`, 422);
      }
    });
  };