import { User } from "src/entity/User";
import { generateToken } from "src/utils/generateToken";
import { getUserRepository } from "src/utils/getRepository";

export class UserService {
  static userRepo = getUserRepository();
  static async createUser(name: string, email: string, password: string) {

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