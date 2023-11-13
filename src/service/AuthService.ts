import { User } from "src/entity/User";
import { generateToken } from "src/utils/generateToken";
import { getUserRepository } from "src/utils/getRepository";

export class AuthService {
  static userRepo = getUserRepository();
  static async signIn(email: string, password: string) {
    const user = await User.findOne({where: {email, password}});
    if (!user) {
      throw new Error('user does not exist');
    }
    if(user.id !== undefined) {
      const token = generateToken(user.id);
      return { user, token };
    } else {
      throw new Error ("user Id is undefined");
    }
  }
}