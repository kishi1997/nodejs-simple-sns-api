import { Post } from "../entity/Post";
import { getPostRepository, getUserRepository } from "../utils/getRepository";

export class PostService {
    static postRepo = getPostRepository();
    static userRepo = getUserRepository();

    static async createPost(body:string, userId:string) {
        try {
            if (!body ) return;
            const newPost = new Post();
            newPost.body = body;
            newPost.userId = userId;
            return await PostService.postRepo.save(newPost);
        } catch (error) {
            return error;
        }
    }
}