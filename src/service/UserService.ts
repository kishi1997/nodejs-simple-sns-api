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
        const newUser = UserService.userRepo.create({ name, email, password, token: { token: generateToken() } });
        return await UserService.userRepo.save(newUser);
    }
}