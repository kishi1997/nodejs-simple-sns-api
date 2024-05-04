import { User } from 'src/entity/User'
import { createError } from '../errorUtils/createError'

export const validateUser = async (userId: number) => {
  const user = await User.findOne({ where: { id: userId } })
  if (user == null) {
    throw createError('User does not exist', 422)
  }
}
