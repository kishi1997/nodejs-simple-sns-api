import { Token } from "src/entity/Token";
import { User } from "src/entity/User";
import { generateToken } from "src/utils/generateToken";
import { getUserRepository } from "src/utils/getRepository";

export class UserService {
    static accountRepo = getUserRepository();

    static async createUser(name: string, email: string, password: string) {
        try {
            if (!name || !email || !password) return;
            const newUser = new User();
            newUser.name = name;
            newUser.email = email;
            newUser.password = password;
            const token = new Token();
            token.token = generateToken();
            newUser.token = token;
            return await UserService.accountRepo.save(newUser);
        } catch (error) {
            return error;
        }
    }
}