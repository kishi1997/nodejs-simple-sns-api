import * as argon2 from 'argon2'
import { User } from 'src/entity/User'
import { createError } from 'src/utils/errorUtils/createError'
import { generateToken } from 'src/utils/generateToken'
import { getUserRepository } from 'src/utils/getRepository'
import { validateEmail } from 'src/utils/validateUtils/validateEmail'
import {
  validateEmpty,
  validatePasswordLength,
} from 'src/utils/validateUtils/validateEmpty'
import { validateNull } from 'src/utils/validateUtils/validateNull'

export class UserService {
  static userRepo = getUserRepository()
  static validateUserData(name: string, email: string, password: string) {
    validateNull(
      { name: 'Name', value: name, status: 422 },
      { name: 'Email', value: email, status: 422 },
      { name: 'Password', value: password, status: 422 }
    )
    validateEmpty({ name: 'Name', value: name.trim(), status: 422 })
    validatePasswordLength({
      name: 'Password',
      value: password.trim(),
      status: 422,
    })
    validateEmail(email)
  }
  static async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<{ newUser: User; token: string }> {
    this.validateUserData(name, email, password)
    const existingUser = await User.findOne({ where: { email: email } })
    if (existingUser) {
      throw createError('Duplicate Email address', 422)
    }
    const hashedPassword = await argon2.hash(password)
    const newUser = UserService.userRepo.create({
      name,
      email,
      password: hashedPassword,
    })
    await UserService.userRepo.save(newUser)

    if (newUser.id == null) {
      throw createError('User Id is undefined', 422)
    }
    const token = generateToken(newUser.id)
    return { newUser, token }
  }
  static async updateProfile(
    userId: number,
    name?: string,
    email?: string,
    url?: string
  ): Promise<User> {
    if (email) validateEmail(email)
    const updatedUserData = await this.userRepo.update(
      { id: userId },
      { name: name, email: email, iconImageUrl: url }
    )
    if (updatedUserData.affected === 0) {
      throw createError('Update failed', 404)
    }
    const userData = await this.userRepo.findOneOrFail({
      where: { id: userId },
    })
    return userData
  }
}
