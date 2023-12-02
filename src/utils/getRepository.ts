import { AppDataSource } from "../data-source";
import { Post } from "src/entity/Post";
import { User } from "src/entity/User";
import { Message } from "src/entity/Message";


export const getUserRepository = () => AppDataSource.getRepository(User);
export const getPostRepository = () => AppDataSource.getRepository(Post);
export const getMessageRepository = () => AppDataSource.getRepository(Message);
