import { Post } from "../entity/Post";
import { getPostRepository } from "../utils/getPostRepository";

export class PostService {
    static postRepo = getPostRepository();

    static async createPost(content:string) {
        try {
            if (!content) return;
            const newPost = new Post();
            newPost.content = content;
            return await PostService.postRepo.save(newPost);
        } catch (error) {
            return error;
        }
    }
}