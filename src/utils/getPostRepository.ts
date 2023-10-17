import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";

export const getPostRepository = () => AppDataSource.getRepository(Post);