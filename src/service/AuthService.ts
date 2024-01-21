import * as argon2 from 'argon2'
import { User } from 'src/entity/User'
import { createError } from 'src/utils/errorUtils/createError'
import { generateToken } from 'src/utils/generateToken'
import { getUserRepository } from 'src/utils/getRepository'
import { validateEmail } from 'src/utils/validateUtils/validateEmail'
import { validatePasswordLength } from 'src/utils/validateUtils/validateEmpty'
import { validateNull } from 'src/utils/validateUtils/validateNull'

export class AuthService {
  static userRepo = getUserRepository()
  static validateUserData(email: string, password: string) {
    validateNull(
      { name: 'Password', value: password, status: 400 },
      { name: 'Email', value: email, status: 400 }
    )
    validatePasswordLength({
      name: 'Password',
      value: password.trim(),
      status: 400,
    })
    validateEmail(email)
  }

  static async signIn(email: string, password: string) {
    this.validateUserData(email, password)
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw createError('User does not exist', 422)
    }
    if (
      user.password &&
      user.id &&
      (await argon2.verify(user.password, password))
    ) {
      const token = generateToken(user.id)
      return { user, token }
    } else {
      throw createError('User does not exist', 400)
    }
  }
}
