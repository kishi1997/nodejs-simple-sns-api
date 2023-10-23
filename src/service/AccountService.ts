import { Token } from "src/entity/Token";
import { User } from "src/entity/User";
import { generateToken } from "src/utils/generateToken";
import { getAccountRepository } from "src/utils/getAccountRepository";

export class AccountService {
    static accountRepo = getAccountRepository();

    static async createAccount(name: string, email: string, password: string) {
        try {
            if (!name || !email || !password) return;
            const newAccount = new User();
            newAccount.name = name;
            newAccount.email = email;
            newAccount.password = password;
            // newAccount.password = generateToken();

            // トークンエンティティを作成します
            const token = new Token();
            token.token = generateToken();
            newAccount.token = token;
            return await AccountService.accountRepo.save(newAccount);
        } catch (error) {
            return error;
        }
    }
}