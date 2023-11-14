import { User } from "src/entity/User";
import { generateToken } from "src/utils/generateToken";
import { getUserRepository } from "src/utils/getRepository";
import { validateEmail } from "src/utils/validateUtils/validateEmail";
import { validateEmpty } from "src/utils/validateUtils/validateEmpty";
import { validateNull } from "src/utils/validateUtils/validateNull";

export class UserService {
  static userRepo = getUserRepository();
  static validateUserData(name: string, email: string, password: string) {
    validateNull(
      { name: 'Name', value: name },
      { name: 'Email', value: email },
      { name: 'Password', value: password }
    );
    validateEmpty(
      { name: 'Name', value: name.trim() },
      { name: 'Password', value: password.trim() }
    );
    validateEmail(email);
  }
  static async createUser(name: string, email: string, password: string) {
    this.validateUserData(name, email, password);
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      throw new Error('Duplicate Email address');
    }
    const newUser = UserService.userRepo.create({ name, email, password });
    await UserService.userRepo.save(newUser);

    if(newUser.id !== undefined) {
      const token = generateToken(newUser.id);
      return { newUser, token };
    } else {
      throw new Error ("User Id is undefined");
    }

  }
}