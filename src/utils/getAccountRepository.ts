import { User } from "src/entity/User";
import { AppDataSource } from "../data-source";

export const getAccountRepository = () => AppDataSource.getRepository(User);