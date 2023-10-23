import { User } from "src/entity/User";
import { AppDataSource } from "../data-source";

export const getUserRepository = () => AppDataSource.getRepository(User);