import { createError } from '../errorUtils/createError'

export const validateEmpty = (
  ...values: { name: string; value: string; status: number }[]
) => {
  values.forEach(({ name, value, status }) => {
    if (value.length === 0) {
      throw createError(`${name} should not be empty`, status)
    }
  })
}
export const validatePasswordLength = (
  ...values: { name: string; value: string; status: number }[]
) => {
  values.forEach(({ name, value, status }) => {
    if (value.length < 8) {
      throw createError(`${name} should be more than 7 words`, status)
    }
  })
}
