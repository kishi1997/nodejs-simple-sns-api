import { AppDataSource } from "../data-source";
import { Post } from "src/entity/Post";
import { User } from "src/entity/User";

export const getUserRepository = () => AppDataSource.getRepository(User);
export const getPostRepository = () => AppDataSource.getRepository(Post);