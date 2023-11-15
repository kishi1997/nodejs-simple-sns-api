export const validateNull = (...values: { name: string, value: string }[]) => {
    values.forEach(({ name, value }) => {
      if (value.length === 0) {
        throw new Error(`${name} should not be null`);
      }
    });
  };