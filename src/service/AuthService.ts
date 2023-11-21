import * as argon2 from 'argon2';
import { User } from "src/entity/User";
import { createError } from 'src/utils/errorUtils/createError';
import { generateToken } from "src/utils/generateToken";
import { getUserRepository } from "src/utils/getRepository";
import { validateEmail } from "src/utils/validateUtils/validateEmail";
import { validateEmpty } from "src/utils/validateUtils/validateEmpty";
import { validateNull } from "src/utils/validateUtils/validateNull";

export class AuthService {
  static userRepo = getUserRepository();
  static validateUserData(email: string, password: string) {
    validateNull(
      { name: 'Password', value: password },
      { name: 'Email', value: email },
    );
    validateEmpty(
      { name: 'Password', value: password.trim() },
    );
    validateEmail(email);
  }

  static async signIn(email: string, password: string) {
    this.validateUserData(email, password);
    const user = await User.findOne({ where: {email} });
    if (user && user.password && user.id && (await argon2.verify(user.password, password))) {
      const token = generateToken(user.id);
      return { user, token };
    } else {
      throw createError('User does not exist', 422);
    }
  }
}