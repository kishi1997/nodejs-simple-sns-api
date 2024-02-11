import { createError } from '../errorUtils/createError'

export const validateNull = (
  ...values: { name: string; value: string | number; status: number }[]
) => {
  values.forEach(({ name, value, status }) => {
    if (value == null) {
      throw createError(`${name} should not be null`, status)
    }
  })
}
