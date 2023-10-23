import { AppDataSource } from "../data-source";
import { Post } from "src/entity/Post";

export const getPostRepository = () => AppDataSource.getRepository(Post);