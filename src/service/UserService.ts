import { generateToken } from "src/utils/generateToken";
import { getUserRepository } from "src/utils/getRepository";

export class UserService {
    static userRepo = getUserRepository();
    static async createUser(name: string, email: string, password: string) {
        const newUser = UserService.userRepo.create({ name, email, password, token: { token: generateToken() } });
        return await UserService.userRepo.save(newUser);
    }
}